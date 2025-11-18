import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function TopNavbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-white/80 backdrop-blur-md shadow-md fixed top-0 left-0 z-50 px-8 py-4 flex justify-between items-center"
    >

      {/* Logo + Icon */}
      <Link to="/" className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-md">
          <i className="fa-solid fa-hard-hat text-white text-xl"></i>
        </div>
        <h1 className="text-3xl font-extrabold text-blue-600">HireMe</h1>
      </Link>

      {/* Navigation */}
      <ul className="flex space-x-10 text-lg font-medium">
        <li className="hover:text-blue-600 transition cursor-pointer">
          <Link to="/labour/dashboard">Dashboard</Link>
        </li>
        <li className="hover:text-blue-600 transition cursor-pointer">
          <Link to="/labourer/verification">Verification</Link>
        </li>
        <li className="hover:text-blue-600 transition cursor-pointer">
          <Link to="/labourer/job-requests">Job Requests</Link>
        </li>
        <li className="hover:text-blue-600 transition cursor-pointer">
          <Link to="/labourer/profile">Profile</Link>
        </li>
      </ul>

    </motion.nav>
  );
}
