"""
jobs.py — CRUD routes for job postings

Routes:
  POST   /api/jobs               — Create a new job
  GET    /api/jobs               — List all jobs (with optional filters)
  GET    /api/jobs/{job_id}      — Get a single job by ID
  GET    /api/jobs/contractor/me — Get jobs for the logged-in contractor
  PATCH  /api/jobs/{job_id}      — Update a job (status, details)
  DELETE /api/jobs/{job_id}      — Delete a job
"""

from datetime import datetime, timezone
from bson import ObjectId
from fastapi import APIRouter, HTTPException, status, Query
from pydantic import BaseModel, Field
from typing import Optional
from app.database import get_jobs_collection

router = APIRouter()


# ── Pydantic schemas ─────────────────────────────────────────

class JobCreate(BaseModel):
    """Schema for creating a new job posting."""
    title: str
    description: str = ""
    category: str = "Construction"
    required_skills: str  # comma-separated: "masonry, concrete, tiling"
    required_skill_level: str = "intermediate"  # beginner / intermediate / expert
    workers_needed: int = 1
    budget_per_day: float
    urgency: str = "medium"  # low / medium / high
    location: str
    latitude: float = 19.076
    longitude: float = 72.8777
    date_range: str = ""  # e.g. "Oct 12 - Oct 28"
    start_time: str = ""  # e.g. "08:00 AM"
    contractor_id: str  # user ID of the contractor posting this
    contractor_name: str = ""


class JobUpdate(BaseModel):
    """Schema for updating a job."""
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    workers_needed: Optional[int] = None
    budget_per_day: Optional[float] = None
    urgency: Optional[str] = None


# ── Helper to serialize MongoDB docs ─────────────────────────

def serialize_job(doc: dict) -> dict:
    """Convert a MongoDB job document to a JSON-safe dict."""
    return {
        "id": str(doc["_id"]),
        "title": doc.get("title", ""),
        "description": doc.get("description", ""),
        "category": doc.get("category", "Construction"),
        "required_skills": doc.get("required_skills", ""),
        "required_skill_level": doc.get("required_skill_level", "intermediate"),
        "workers_needed": doc.get("workers_needed", 1),
        "budget_per_day": doc.get("budget_per_day", 0),
        "urgency": doc.get("urgency", "medium"),
        "location": doc.get("location", ""),
        "latitude": doc.get("latitude", 0),
        "longitude": doc.get("longitude", 0),
        "date_range": doc.get("date_range", ""),
        "start_time": doc.get("start_time", ""),
        "contractor_id": doc.get("contractor_id", ""),
        "contractor_name": doc.get("contractor_name", ""),
        "status": doc.get("status", "Active"),
        "workers_filled": doc.get("workers_filled", 0),
        "created_at": doc.get("created_at", ""),
    }


# ═══════════════════════════════════════════════════════════════
#  CREATE
# ═══════════════════════════════════════════════════════════════

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_job(job: JobCreate):
    """Create a new job posting and store in MongoDB."""
    collection = get_jobs_collection()

    job_doc = {
        **job.model_dump(),
        "status": "Active",
        "workers_filled": 0,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }

    result = await collection.insert_one(job_doc)

    return {
        "message": "Job posted successfully.",
        "job": {
            "id": str(result.inserted_id),
            **job.model_dump(),
            "status": "Active",
            "workers_filled": 0,
        },
    }


# ═══════════════════════════════════════════════════════════════
#  READ — list all
# ═══════════════════════════════════════════════════════════════

@router.get("/")
async def list_jobs(
    status_filter: Optional[str] = Query(None, alias="status"),
    urgency: Optional[str] = None,
    limit: int = 50,
):
    """List all jobs, optionally filtered by status or urgency."""
    collection = get_jobs_collection()

    query = {}
    if status_filter:
        query["status"] = status_filter
    if urgency:
        query["urgency"] = urgency

    cursor = collection.find(query).sort("created_at", -1).limit(limit)
    jobs = [serialize_job(doc) async for doc in cursor]

    return {"count": len(jobs), "jobs": jobs}


# ═══════════════════════════════════════════════════════════════
#  READ — by contractor
# ═══════════════════════════════════════════════════════════════

@router.get("/contractor/{contractor_id}")
async def get_contractor_jobs(contractor_id: str):
    """Get all jobs posted by a specific contractor."""
    collection = get_jobs_collection()

    cursor = collection.find({"contractor_id": contractor_id}).sort("created_at", -1)
    jobs = [serialize_job(doc) async for doc in cursor]

    return {"count": len(jobs), "jobs": jobs}


# ═══════════════════════════════════════════════════════════════
#  READ — single
# ═══════════════════════════════════════════════════════════════

@router.get("/{job_id}")
async def get_job(job_id: str):
    """Get a single job by its ID."""
    collection = get_jobs_collection()

    try:
        doc = await collection.find_one({"_id": ObjectId(job_id)})
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid job ID format.")

    if not doc:
        raise HTTPException(status_code=404, detail="Job not found.")

    return {"job": serialize_job(doc)}


# ═══════════════════════════════════════════════════════════════
#  UPDATE
# ═══════════════════════════════════════════════════════════════

@router.patch("/{job_id}")
async def update_job(job_id: str, updates: JobUpdate):
    """Update a job's details (status, title, etc.)."""
    collection = get_jobs_collection()

    update_data = {k: v for k, v in updates.model_dump().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="No fields to update.")

    try:
        result = await collection.update_one(
            {"_id": ObjectId(job_id)},
            {"$set": update_data},
        )
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid job ID format.")

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Job not found.")

    return {"message": "Job updated successfully."}


# ═══════════════════════════════════════════════════════════════
#  DELETE
# ═══════════════════════════════════════════════════════════════

@router.delete("/{job_id}")
async def delete_job(job_id: str):
    """Delete a job posting."""
    collection = get_jobs_collection()

    try:
        result = await collection.delete_one({"_id": ObjectId(job_id)})
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid job ID format.")

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Job not found.")

    return {"message": "Job deleted successfully."}
