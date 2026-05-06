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
