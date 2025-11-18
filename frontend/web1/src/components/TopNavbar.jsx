import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function TopNavbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-white/80 backdrop-blur-md shadow-md fixed top-0 left-0 z-50 px-8 py-4 flex justify-between items-center"
    >
      <h1 className="text-3xl font-extrabold text-blue-600">HireMe</h1>
     
             <ul className="flex space-x-10 text-lg font-medium">
             <li className="hover:text-blue-600 cursor-pointer">
             <Link to="/contractor-dashboard">Dashboard</Link>
             </li>
             <li className="hover:text-blue-600 cursor-pointer">
             <Link to="/contractor/verification">Verification</Link>
             </li>
             <li className="hover:text-blue-600 cursor-pointer">
             <Link to="/contractor/find-labourers">Find Labourers</Link>
             </li>
             <li className="hover:text-blue-600 cursor-pointer">
             <Link to="/contractor/job-posts">Job Post</Link>
             </li>
             <li className="hover:text-blue-600 cursor-pointer">
             <Link to="/contractor/profile">Profile</Link>
             </li>
             
             </ul>
     
    </motion.nav>
  );
}
