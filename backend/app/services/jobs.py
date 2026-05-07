"""
Job service for the Voice-Assisted Job Navigator.

Handles job retrieval, filtering, acceptance, and rejection
against the MongoDB 'jobs' collection.
"""

from typing import Optional
from app.database import database

jobs_collection = database["jobs"]


def format_job(job: dict) -> str:
    """
    Format a job document into a short, speakable summary.

    Returns a 1-2 sentence response like:
    "Masonry job. 800 rupees. 2 km away. 9 AM start."
    """
    job_type = job.get("type", "Unknown")
    salary = job.get("salary", "N/A")
    time = job.get("time", "N/A")
    location = job.get("location", "nearby")
    skill = job.get("skill", "")

    parts = [f"{job_type} job."]

    if salary != "N/A":
        parts.append(f"{salary} rupees.")

    if location != "nearby":
        parts.append(f"{location}.")

    if time != "N/A":
        parts.append(f"{time} start.")

    if skill:
        parts.append(f"Requires {skill}.")

    return " ".join(parts)


async def get_job_count() -> int:
    """Get total number of available (non-accepted) jobs."""
    return await jobs_collection.count_documents({"status": {"$ne": "accepted"}})


async def get_best_job() -> Optional[dict]:
    """
    Get the best available job — sorted by highest salary.

    Returns:
        Job document dict or None if no jobs available.
    """
    job = await jobs_collection.find_one(
        {"status": {"$ne": "accepted"}},
        sort=[("salary", -1)],
    )
    return job


async def get_next_job(current_index: int) -> tuple[Optional[dict], int]:
    """
    Get the next job by index (pagination).

    Args:
        current_index: Current position in the job list.

    Returns:
        Tuple of (job_doc or None, new_index).
    """
    total = await get_job_count()

    if total == 0:
        return None, 0

    # Wrap around if at end
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
    """
    Mark a job as accepted.

    Args:
        job_id: MongoDB ObjectId of the job.

    Returns:
        True if update succeeded, False otherwise.
    """
    from bson import ObjectId

    result = await jobs_collection.update_one(
        {"_id": ObjectId(str(job_id))},
        {"$set": {"status": "accepted"}},
    )
    return result.modified_count > 0


async def reject_job(job_id) -> bool:
    """
    Mark a job as rejected (skipped).

    Args:
        job_id: MongoDB ObjectId of the job.

    Returns:
        True if update succeeded, False otherwise.
    """
    from bson import ObjectId

    result = await jobs_collection.update_one(
        {"_id": ObjectId(str(job_id))},
        {"$set": {"status": "rejected"}},
    )
    return result.modified_count > 0


async def get_summary() -> str:
    """Get a short summary of all available jobs."""
    total = await get_job_count()

    if total == 0:
        return "No jobs available right now. Check back later."

    # Get top 3 job types for summary
    pipeline = [
        {"$match": {"status": {"$ne": "accepted"}}},
        {"$group": {"_id": "$type", "count": {"$sum": 1}, "max_salary": {"$max": "$salary"}}},
        {"$sort": {"max_salary": -1}},
        {"$limit": 3},
    ]

    cursor = jobs_collection.aggregate(pipeline)
    groups = await cursor.to_list(length=3)

    if not groups:
        return f"{total} jobs available. Say 'best job' to hear the top one."

    type_summaries = []
    for g in groups:
        type_summaries.append(f"{g['count']} {g['_id']}")

    types_str = ", ".join(type_summaries)
    return f"{total} jobs available. Including {types_str}. Say 'best job' to start."