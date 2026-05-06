from enum import Enum
from pydantic import BaseModel, EmailStr
from typing import Optional


class UserRole(str, Enum):
    """Enumeration of available user roles."""
    admin = "admin"
    worker = "worker"
    lender = "lender"
    user = "user"


class UserSignup(BaseModel):
    """Schema for user registration requests."""
    email: EmailStr
    password: str
    name: str
    role: UserRole = UserRole.user


class UserLogin(BaseModel):
    """Schema for user login requests."""
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    """Schema for user data returned to the client (no password)."""
    id: str
    email: str
    name: str
    role: UserRole
