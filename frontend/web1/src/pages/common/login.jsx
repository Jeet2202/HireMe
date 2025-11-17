import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

  // State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Hardcoded Demo Users
  const USERS = {
    labour: {
      email: "labour@test.com",
      password: "labour123",
      redirect: "/labour/dashboard"
    },
    contractor: {
      email: "contractor@test.com",
      password: "contractor123",
      redirect: "/contractor-dashboard"
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      email === USERS.labour.email &&
      password === USERS.labour.password
    ) {
      navigate(USERS.labour.redirect);
      return;
    }

    if (
      email === USERS.contractor.email &&
      password === USERS.contractor.password
    ) {
      navigate(USERS.contractor.redirect);
      return;
    }

    setError("Invalid Email or Password");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

        <form className="space-y-4" onSubmit={handleLogin}>

          {error && (
            <div className="text-red-600 text-center text-sm">{error}</div>
          )}

          <div>
            <label className="font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:border-blue-500"
            />
          </div>

          <div>
            <label className="font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:border-blue-500"
            />
          </div>

          <a href="/forgot-password" className="text-blue-600 text-sm hover:underline">
            Forgot Password?
          </a>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Signup
          </a>
        </p>

      </div>
    </div>
  );
}
