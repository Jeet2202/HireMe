from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from bson import ObjectId
from app.database import database

router = APIRouter()

# ─── Collections ───────────────────────────────────────
jobs_collection = database["job_requests"]
dashboard_collection = database["labourer_dashboard"]


# ─── Pydantic Models ──────────────────────────────────

class JobRequestCreate(BaseModel):
    title: str
    contractor: str
    wage: str
    date: str
    time: str
    location: str
    distance: str
    status: str = "Pending"
    icon_bg: str = "bg-surface-container-high"
    icon_color: str = "text-on-surface"
    category: str = "general"


class JobRequestUpdate(BaseModel):
    status: Optional[str] = None
    title: Optional[str] = None
    contractor: Optional[str] = None
    wage: Optional[str] = None
    date: Optional[str] = None
    time: Optional[str] = None
    location: Optional[str] = None
    distance: Optional[str] = None


class DashboardStats(BaseModel):
    job_request_count: int = 0
    new_requests: int = 0
    current_booking: str = ""
    skill_level: str = ""
    skill_title: str = ""
    is_verified: bool = False
    average_rating: float = 0.0
    total_completions: int = 0
    next_shift_time: str = ""
    next_shift_location: str = ""
    next_shift_foreman: str = ""


# ─── Helper to serialize Mongo docs ────────────────────

def serialize_job(doc) -> dict:
    return {
        "id": str(doc["_id"]),
        "title": doc.get("title", ""),
        "contractor": doc.get("contractor", ""),
        "wage": doc.get("wage", ""),
        "date": doc.get("date", ""),
        "time": doc.get("time", ""),
        "location": doc.get("location", ""),
        "distance": doc.get("distance", ""),
        "status": doc.get("status", "Pending"),
        "icon_bg": doc.get("icon_bg", "bg-surface-container-high"),
        "icon_color": doc.get("icon_color", "text-on-surface"),
        "category": doc.get("category", "general"),
        "created_at": doc.get("created_at", ""),
    }


def serialize_stats(doc) -> dict:
    return {
        "job_request_count": doc.get("job_request_count", 0),
        "new_requests": doc.get("new_requests", 0),
        "current_booking": doc.get("current_booking", ""),
        "skill_level": doc.get("skill_level", ""),
        "skill_title": doc.get("skill_title", ""),
        "is_verified": doc.get("is_verified", False),
        "average_rating": doc.get("average_rating", 0.0),
        "total_completions": doc.get("total_completions", 0),
        "next_shift_time": doc.get("next_shift_time", ""),
        "next_shift_location": doc.get("next_shift_location", ""),
        "next_shift_foreman": doc.get("next_shift_foreman", ""),
    }


# ─── Job Request Endpoints ────────────────────────────

@router.get("/jobs")
async def get_job_requests():
    """Fetch all job requests from the database."""
    jobs = []
    cursor = jobs_collection.find().sort("created_at", -1)
    async for doc in cursor:
        jobs.append(serialize_job(doc))
    return {"jobs": jobs, "count": len(jobs)}


@router.post("/jobs", status_code=status.HTTP_201_CREATED)
async def create_job_request(job: JobRequestCreate):
    """Create a new job request."""
    doc = job.model_dump()
    doc["created_at"] = datetime.utcnow().isoformat()
    result = await jobs_collection.insert_one(doc)
    doc["_id"] = result.inserted_id
    return {"message": "Job request created.", "job": serialize_job(doc)}


@router.patch("/jobs/{job_id}")
async def update_job_request(job_id: str, update: JobRequestUpdate):
    """Update a job request (e.g. change status)."""
    update_data = {k: v for k, v in update.model_dump().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="No fields to update.")

    result = await jobs_collection.update_one(
        {"_id": ObjectId(job_id)},
        {"$set": update_data}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Job request not found.")

    updated = await jobs_collection.find_one({"_id": ObjectId(job_id)})
    return {"message": "Job updated.", "job": serialize_job(updated)}


@router.delete("/jobs/{job_id}")
async def delete_job_request(job_id: str):
    """Delete a job request."""
    result = await jobs_collection.delete_one({"_id": ObjectId(job_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Job request not found.")
    return {"message": "Job request deleted."}


# ─── Dashboard Stats Endpoints ────────────────────────

@router.get("/dashboard")
async def get_dashboard_stats():
    """Get labourer dashboard stats. Returns the most recent stats doc."""
    doc = await dashboard_collection.find_one(sort=[("_id", -1)])
    if not doc:
        return {"stats": None}
    return {"stats": serialize_stats(doc)}


@router.post("/dashboard", status_code=status.HTTP_201_CREATED)
async def upsert_dashboard_stats(stats: DashboardStats):
    """Create or update the dashboard stats."""
    doc = stats.model_dump()
    doc["updated_at"] = datetime.utcnow().isoformat()

    existing = await dashboard_collection.find_one(sort=[("_id", -1)])
    if existing:
        await dashboard_collection.update_one(
            {"_id": existing["_id"]},
            {"$set": doc}
        )
        return {"message": "Dashboard stats updated."}
    else:
        await dashboard_collection.insert_one(doc)
        return {"message": "Dashboard stats created."}


# ─── Workers / Labourers Collection ───────────────────

workers_collection = database["workers"]


class WorkerCreate(BaseModel):
    name: str
    role: str
    rating: float = 0.0
    location: str = ""
    region: str = ""
    avatar: str = ""
    skills: List[str] = []
    skill_level: str = "Apprentice"   # Apprentice | Journeyman | Master / Expert
    experience_years: int = 0
    jobs_completed: int = 0
    hourly_rate: str = ""
    bio: str = ""
    is_verified: bool = False
    available: bool = True
    lat: float = 0.0
    lng: float = 0.0
    past_projects: List[dict] = []     # [{name, year, role}]


class WorkerUpdate(BaseModel):
    name: Optional[str] = None
    role: Optional[str] = None
    rating: Optional[float] = None
    location: Optional[str] = None
    region: Optional[str] = None
    skills: Optional[List[str]] = None
    skill_level: Optional[str] = None
    experience_years: Optional[int] = None
    jobs_completed: Optional[int] = None
    hourly_rate: Optional[str] = None
    bio: Optional[str] = None
    is_verified: Optional[bool] = None
    available: Optional[bool] = None


def serialize_worker(doc) -> dict:
    return {
        "id": str(doc["_id"]),
        "name": doc.get("name", ""),
        "role": doc.get("role", ""),
        "rating": doc.get("rating", 0.0),
        "location": doc.get("location", ""),
        "region": doc.get("region", ""),
        "avatar": doc.get("avatar", ""),
        "skills": doc.get("skills", []),
        "skill_level": doc.get("skill_level", "Apprentice"),
        "experience_years": doc.get("experience_years", 0),
        "jobs_completed": doc.get("jobs_completed", 0),
        "hourly_rate": doc.get("hourly_rate", ""),
        "bio": doc.get("bio", ""),
        "is_verified": doc.get("is_verified", False),
        "available": doc.get("available", True),
        "lat": doc.get("lat", 0.0),
        "lng": doc.get("lng", 0.0),
        "past_projects": doc.get("past_projects", []),
        "created_at": doc.get("created_at", ""),
    }


@router.get("/workers")
async def get_workers(
    q: Optional[str] = None,
    skill: Optional[str] = None,
    region: Optional[str] = None,
    skill_level: Optional[str] = None,
    available: Optional[bool] = None,
):
    """Search & filter workers. All params are optional."""
    query = {}

    if q:
        query["$or"] = [
            {"name": {"$regex": q, "$options": "i"}},
            {"role": {"$regex": q, "$options": "i"}},
            {"skills": {"$regex": q, "$options": "i"}},
        ]
    if skill:
        query["skills"] = {"$regex": skill, "$options": "i"}
    if region:
        query["region"] = {"$regex": region, "$options": "i"}
    if skill_level:
        query["skill_level"] = skill_level
    if available is not None:
        query["available"] = available

    workers = []
    cursor = workers_collection.find(query).sort("rating", -1)
    async for doc in cursor:
        workers.append(serialize_worker(doc))
    return {"workers": workers, "count": len(workers)}


@router.get("/workers/{worker_id}")
async def get_worker(worker_id: str):
    """Get a single worker profile."""
    doc = await workers_collection.find_one({"_id": ObjectId(worker_id)})
    if not doc:
        raise HTTPException(status_code=404, detail="Worker not found.")
    return {"worker": serialize_worker(doc)}


@router.post("/workers", status_code=status.HTTP_201_CREATED)
async def create_worker(worker: WorkerCreate):
    """Register a new worker profile."""
    doc = worker.model_dump()
    doc["created_at"] = datetime.utcnow().isoformat()
    result = await workers_collection.insert_one(doc)
    doc["_id"] = result.inserted_id
    return {"message": "Worker created.", "worker": serialize_worker(doc)}


@router.patch("/workers/{worker_id}")
async def update_worker(worker_id: str, update: WorkerUpdate):
    """Update a worker profile."""
    update_data = {k: v for k, v in update.model_dump().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="No fields to update.")

    result = await workers_collection.update_one(
        {"_id": ObjectId(worker_id)},
        {"$set": update_data}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Worker not found.")

    updated = await workers_collection.find_one({"_id": ObjectId(worker_id)})
    return {"message": "Worker updated.", "worker": serialize_worker(updated)}


@router.delete("/workers/{worker_id}")
async def delete_worker(worker_id: str):
    """Delete a worker profile."""
    result = await workers_collection.delete_one({"_id": ObjectId(worker_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Worker not found.")
    return {"message": "Worker deleted."}

