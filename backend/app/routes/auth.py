from fastapi import APIRouter, HTTPException, status
from app.database import get_users_collection
from app.models import UserSignup, UserLogin, UserResponse
from app.utils import hash_password, verify_password

router = APIRouter()


@router.post("/signup", response_model=dict, status_code=status.HTTP_201_CREATED)
async def signup(user: UserSignup):
    """Register a new user."""
    collection = get_users_collection()

    # Check if a user with this email already exists
    existing_user = await collection.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A user with this email already exists.",
        )

    # Build the user document
    user_doc = {
        "email": user.email,
        "password": hash_password(user.password),
        "name": user.name,
        "role": user.role.value,
    }

    result = await collection.insert_one(user_doc)

    return {
        "message": "User registered successfully.",
        "user": UserResponse(
            id=str(result.inserted_id),
            email=user_doc["email"],
            name=user_doc["name"],
            role=user_doc["role"],
        ).model_dump(),
    }


@router.post("/login", response_model=dict)
async def login(credentials: UserLogin):
    """Authenticate an existing user."""
    collection = get_users_collection()

    # Look up the user by email
    user_doc = await collection.find_one({"email": credentials.email})
    if not user_doc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password.",
        )

    # Verify the password
    if not verify_password(credentials.password, user_doc["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password.",
        )

    return {
        "message": "Login successful.",
        "user": UserResponse(
            id=str(user_doc["_id"]),
            email=user_doc["email"],
            name=user_doc["name"],
            role=user_doc["role"],
        ).model_dump(),
    }
