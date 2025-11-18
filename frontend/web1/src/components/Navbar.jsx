import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="w-full fixed top-0 left-0 bg-white shadow-sm py-4 z-50">
      <nav className="w-full flex items-center justify-between px-10">

        {/* LEFT — Logo + Menu */}
        <div className="flex items-center gap-12">

          {/* Brand */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-md">
              <i className="fa-solid fa-hard-hat text-white text-xl"></i>
            </div>
            <span className="text-2xl font-bold tracking-tight text-gray-900">
              HireMe
            </span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex gap-10">
            <a 
              href="#features" 
              className="text-gray-600 hover:text-blue-600 font-medium transition hover:scale-105"
            >
              Features
            </a>

            <a 
              href="#about" 
              className="text-gray-600 hover:text-blue-600 font-medium transition hover:scale-105"
            >
              About
            </a>
          </div>

        </div>

        {/* RIGHT — Login + Sign Up */}
        <div className="flex items-center gap-6">
          <Link 
            to="/login" 
            className="text-gray-600 hover:text-blue-600 font-medium transition"
          >
            Login
          </Link>

          <Link 
            to="/signup" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold shadow-sm transition-all duration-300 hover:scale-[1.05]"
          >
            Sign Up
          </Link>
        </div>

      </nav>
    </header>
  );
}
