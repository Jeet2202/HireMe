import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from app.routes.auth import router as auth_router

load_dotenv()

app = FastAPI(
    title="IPD Project API",
    description="Backend API for the IPD Project",
    version="1.0.0",
)

# CORS — allow the frontend dev server and common origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",   # Vite dev server
        "http://localhost:3000",   # CRA / Next.js fallback
        "http://127.0.0.1:5173",
    ],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(auth_router, prefix="/api/auth", tags=["Authentication"])


@app.get("/")
async def health_check():
    """Simple health-check endpoint."""
    return {"status": "ok", "message": "IPD Project API is running."}
