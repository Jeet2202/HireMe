import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">

          {/* Left */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <i className="fas fa-hard-hat text-white text-lg"></i>
              </div>
              <span className="text-xl font-bold text-gray-900">HireMe</span>
            </Link>

            <div className="hidden md:flex space-x-6">
              <a href="#features" className="text-gray-600 hover:text-blue-600 nav-link font-medium">Features</a>
              <a href="#about" className="text-gray-600 hover:text-blue-600 nav-link font-medium">About</a>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center space-x-4">
            <Link to="/login" className="text-gray-600 hover:text-blue-600 font-medium transition">
              Login
            </Link>
            <Link to="/signup" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition">
              Sign Up
            </Link>
          </div>

        </div>
      </nav>
    </header>
  );
}
