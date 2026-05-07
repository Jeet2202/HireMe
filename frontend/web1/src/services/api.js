// Base URL from env — set VITE_API_URL in your .env
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

/**
 * POST /api/auth/signup
 * @param {{ name: string, email: string, password: string, role: string }} data
 */
export async function signupUser(data) {
  const res = await fetch(`${API_BASE}/api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.detail || "Signup failed");
  return json; // { message, user: { id, email, name, role } }
}

/**
 * POST /api/auth/login
 * @param {{ email: string, password: string }} data
 */
export async function loginUser(data) {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.detail || "Login failed");
  return json; // { message, user: { id, email, name, role } }
}

/**
 * Returns the dashboard route for a given role string.
 * @param {string} role
 */
export function getDashboardRoute(role) {
  switch (role) {
    case "admin":      return "/admin/dashboard";
    case "contractor": return "/contractor-dashboard";
    case "worker":
    case "labourer":
    default:           return "/labour/dashboard";
  }
}


// ═══════════════════════════════════════════════════════════
//  JOBS API
// ═══════════════════════════════════════════════════════════

/**
 * POST /api/jobs — Create a new job posting
 * @param {Object} data — job details
 */
export async function createJob(data) {
  const res = await fetch(`${API_BASE}/api/jobs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.detail || "Failed to create job");
  return json;
}

/**
 * GET /api/jobs/contractor/{contractorId} — List contractor's jobs
 */
export async function getContractorJobs(contractorId) {
  const res = await fetch(`${API_BASE}/api/jobs/contractor/${contractorId}`);
  const json = await res.json();
  if (!res.ok) throw new Error(json.detail || "Failed to fetch jobs");
  return json;
}

/**
 * GET /api/jobs — List all jobs (for labourers to browse)
 */
export async function getAllJobs(filters = {}) {
  const qs = new URLSearchParams(filters).toString();
  const res = await fetch(`${API_BASE}/api/jobs${qs ? `?${qs}` : ""}`);
  const json = await res.json();
  if (!res.ok) throw new Error(json.detail || "Failed to fetch jobs");
  return json;
}

/**
 * PATCH /api/jobs/{jobId} — Update a job (status, details)
 */
export async function updateJob(jobId, updates) {
  const res = await fetch(`${API_BASE}/api/jobs/${jobId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.detail || "Failed to update job");
  return json;
}

/**
 * DELETE /api/jobs/{jobId} — Delete a job
 */
export async function deleteJob(jobId) {
  const res = await fetch(`${API_BASE}/api/jobs/${jobId}`, {
    method: "DELETE",
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.detail || "Failed to delete job");
  return json;
}
