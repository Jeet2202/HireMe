"""
Job service for the Voice-Assisted Job Navigator.

All text output is bilingual — controlled by a `lang` parameter.
"""

from typing import Optional
from app.database import database

jobs_collection = database["jobs"]


def format_job(job: dict, lang: str = "hi") -> str:
    """
    Format a job document into a short, speakable summary.

    Args:
        job: MongoDB job document.
        lang: 'hi' for Hindi, 'en' for English.
    """
    job_type = job.get("type", "Unknown")
    salary   = job.get("salary", None)
    time     = job.get("time", None)
    location = job.get("location", None)
    skill    = job.get("skill", None)

    if lang == "hi":
        parts = [f"{job_type} ka kaam hai."]
        if salary:
            parts.append(f"{salary} rupaye milenge.")
        if location:
            parts.append(f"{location} door hai.")
        if time:
            parts.append(f"{time} baje shuru hoga.")
        if skill:
            parts.append(f"Iske liye {skill} chahiye.")
    else:
        parts = [f"{job_type} job."]
        if salary:
            parts.append(f"{salary} rupees.")
        if location:
            parts.append(f"{location}.")
        if time:
            parts.append(f"{time} start.")
        if skill:
            parts.append(f"Requires {skill}.")

    return " ".join(parts)


async def get_job_count() -> int:
    """Get total number of available (non-accepted) jobs."""
    return await jobs_collection.count_documents({"status": {"$ne": "accepted"}})


async def get_best_job() -> Optional[dict]:
    """Get the best available job — sorted by highest salary."""
    job = await jobs_collection.find_one(
        {"status": {"$ne": "accepted"}},
        sort=[("salary", -1)],
    )
    return job


async def get_next_job(current_index: int) -> tuple[Optional[dict], int]:
    """Get the next job by index (pagination)."""
    total = await get_job_count()
    if total == 0:
        return None, 0

    next_index = (current_index + 1) % total
    cursor = jobs_collection.find(
        {"status": {"$ne": "accepted"}}
    ).sort("salary", -1).skip(next_index).limit(1)

    job = await cursor.to_list(length=1)
    if not job:
        return None, 0
    return job[0], next_index


async def get_job_at_index(index: int) -> Optional[dict]:
    """Get a specific job by its index in the sorted list."""
    cursor = jobs_collection.find(
        {"status": {"$ne": "accepted"}}
    ).sort("salary", -1).skip(index).limit(1)
    job = await cursor.to_list(length=1)
    return job[0] if job else None


async def accept_job(job_id) -> bool:
    """Mark a job as accepted."""
    from bson import ObjectId
    result = await jobs_collection.update_one(
        {"_id": ObjectId(str(job_id))},
        {"$set": {"status": "accepted"}},
    )
    return result.modified_count > 0


async def reject_job(job_id) -> bool:
    """Mark a job as rejected (skipped)."""
    from bson import ObjectId
    result = await jobs_collection.update_one(
        {"_id": ObjectId(str(job_id))},
        {"$set": {"status": "rejected"}},
    )
    return result.modified_count > 0


async def get_summary(lang: str = "hi") -> str:
    """Get a short summary of all available jobs."""
    total = await get_job_count()

    if total == 0:
        return ("Abhi koi kaam uplabdh nahi hai." if lang == "hi"
                else "No jobs available right now.")

    pipeline = [
        {"$match": {"status": {"$ne": "accepted"}}},
        {"$group": {"_id": "$type", "count": {"$sum": 1}, "max_salary": {"$max": "$salary"}}},
        {"$sort": {"max_salary": -1}},
        {"$limit": 3},
    ]
    cursor = jobs_collection.aggregate(pipeline)
    groups = await cursor.to_list(length=3)

    if not groups:
        if lang == "hi":
            return f"Aapke liye {total} kaam hain. 'Best job' bolein shuru karne ke liye."
        return f"{total} jobs available. Say 'best job' to start."

    type_summaries = [f"{g['count']} {g['_id']}" for g in groups]
    types_str = ", ".join(type_summaries)

    if lang == "hi":
        return f"Aapke liye {total} kaam hain. Jisme {types_str} shamil hain. 'Best job' bolein shuru karne ke liye."
    return f"{total} jobs available. Including {types_str}. Say 'best job' to start."