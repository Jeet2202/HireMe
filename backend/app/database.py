import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

MONGODB_URL = os.getenv("MONGODB_URL") or os.getenv("MONGO_URI")
DATABASE_NAME = os.getenv("DATABASE_NAME", "ipd_database")

client = AsyncIOMotorClient(MONGODB_URL)
database = client[DATABASE_NAME]


def get_users_collection():
    """Return the users collection from the database."""
    return database["users"]


def get_jobs_collection():
    """Return the jobs collection from the database."""
    return database["jobs"]
