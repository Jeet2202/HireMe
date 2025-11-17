# 🏗️ AI-Driven Labour Coordination Platform

An intelligent labour management & contractor coordination system that verifies labourers using **UIDAI e-KYC**, evaluates their skills, and recommends the best workers to contractors based on **skill match**, **distance**, and **feedback-driven performance**.

---

## 🚀 Vision
To build a unified digital platform that connects **verified labourers** with **trusted contractors**, eliminates fraud, and ensures reliable worker availability using AI-driven matchmaking.

---

## 👤 System Users

### 1️⃣ Labourers
Labourers can:
- Register & log in
- Complete **UIDAI e-KYC verification** (XML + digital signature)
- Pass screening & take a **skill test**
- Accept or reject job requests
- View job bookings
- Improve skill level based on contractor feedback

---

### 2️⃣ Contractors
Contractors can:
- Complete UIDAI e-KYC
- Post job requirements
- Request labourers in bulk
- Find workers based on:
  - Skill match  
  - Distance (Dijkstra-based shortest path)
  - Worker ratings & skill level  
  - Priority (MoU contractors get higher priority)
- Provide mandatory job feedback

---

### 3️⃣ Admin Panel
Admins can:
- Verify labourers & contractors (KYC approval)
- Review profile screening & skill tests
- Manage job posts
- Approve or mark MoU contractors
- View system logs & platform analytics
- Handle feedback and complaints

---

## 🔑 Core Features
### ✔ UIDAI-Based Secure Verification
- e-KYC XML upload
- Digital signature validation using UIDAI certificates
- Auto-extract Aadhaar data for identity confirmation

### ✔ AI-Driven Worker Recommendation Engine
Recommendation based on:
- Skill level
- Distance matrix (Dijkstra’s algorithm)
- Contractor priority (MoU > Normal)
- Past job feedback
- Worker availability

### ✔ Skill Testing & Labourer Profiling
- Automated quiz/MCQ test
- Dynamic skill level assignment
- Continuous improvement from feedback

### ✔ Bulk Labour Requests for Large Sites
Contractors can request 5–100 labourers, depending on job size.

### ✔ Mandatory Feedback System
- Rating + comments required after every job
- Impacts worker score and recommendation priority

### ✔ Fully Role-Based Web Platform
- Admin Dashboard
- Contractor Dashboard
- Labourer Dashboard
- Each with separate routing & permissions

---

## 🧱 Tech Stack

### 🖥️ Frontend
- React + Vite  
- React Router  
- TailwindCSS / MUI  
- Axios

### ⚙ Backend
- Node.js / Express  
- UIDAI e-KYC XML signature verification  
- JWT authentication  
- Dijkstra distance logic  
- Recommendation engine

### 🗄 Database
- MongoDB / PostgreSQL

---


