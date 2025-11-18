import { Link } from "react-router-dom";

export default function AdminNavbar() {
  return (
    <nav className="flex justify-between items-center px-10 py-4 bg-white shadow-md sticky top-0 z-50">

      {/* Logo */}
      <h1 className="text-3xl font-extrabold text-blue-600">
        HireMe
      </h1>

      {/* Menu Items */}
      <ul className="flex space-x-10 text-lg font-medium">
        <li className="hover:text-blue-600 transition">
          <Link to="/admin/dashboard">Dashboard</Link>
        </li>
        <li className="hover:text-blue-600 transition">
          <Link to="/admin/verification">Verification Centre</Link>
        </li>
        <li className="hover:text-blue-600 transition">
          <Link to="/admin/workers">Workers</Link>
        </li>
        <li className="hover:text-blue-600 transition">
          <Link to="/admin/contractors">Contractors</Link>
        </li>
        <li className="hover:text-blue-600 transition">
          <Link to="/admin/jobs">Jobs</Link>
        </li>
      </ul>

      {/* Logout */}
      <button className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition">
        Logout
      </button>

    </nav>
  );
}
