import React, { useState } from "react";
import { motion } from "framer-motion";
import Footer from "../../components/footer";
import { Link } from "react-router-dom";

// Recharts Imports
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  YAxis,
} from "recharts";

export default function LabourerDashboard() {
  const [available, setAvailable] = useState(true);

  // Dummy Data for Charts
  const earningsData = [
    { month: "Jan", amount: 1200 },
    { month: "Feb", amount: 900 },
    { month: "Mar", amount: 1700 },
    { month: "Apr", amount: 1100 },
    { month: "May", amount: 2000 },
  ];

  const ratingData = [
    { job: "Job 1", rating: 4 },
    { job: "Job 2", rating: 5 },
    { job: "Job 3", rating: 4.5 },
    { job: "Job 4", rating: 4.2 },
  ];

  return (
    <div className="min-h-screen bg-gray-100">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-10 py-4 bg-white shadow-md">
        <h1 className="text-3xl font-extrabold text-blue-600">HireMe</h1>

        <ul className="flex space-x-10 text-lg font-medium">
          <li className="hover:text-blue-600 cursor-pointer">
            <Link to="/labour/dashboard">Dashboard</Link>
          </li>
          <li className="hover:text-blue-600 cursor-pointer">
            <Link to="/labourer/verification">Verification</Link>
          </li>
          <li className="hover:text-blue-600 cursor-pointer">
            <Link to="/labourer/profile">Profile</Link>
          </li>
        </ul>
      </nav>

      {/* HEADER */}
      <div className="px-10 mt-6">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-semibold text-gray-900"
        >
          Labourer Dashboard
        </motion.h2>
        <p className="text-gray-600">Overview of your job activity and performance</p>
      </div>

      {/* TOP CARDS */}
      <div className="px-10 grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">

        {/* JOB REQUESTS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition"
        >
          <h3 className="text-xl font-semibold text-gray-800">Job Requests</h3>
          <p className="text-3xl mt-3 font-bold text-blue-600">6</p>
          <p className="text-gray-500 text-sm mt-2">Pending job invites</p>
        </motion.div>

        {/* BOOKING STATUS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition"
        >
          <h3 className="text-xl font-semibold text-gray-800">Current Booking</h3>
          <p className="text-3xl mt-3 font-bold text-green-600">2 Active</p>
          <p className="text-gray-500 text-sm mt-2">Ongoing jobs</p>
        </motion.div>

        {/* SKILL LEVEL */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition"
        >
          <h3 className="text-xl font-semibold text-gray-800">Skill Level</h3>
          <p className="text-3xl mt-3 font-bold text-purple-600">Level 4</p>
          <p className="text-gray-500 text-sm mt-2">Based on recent tests</p>
        </motion.div>

      </div>

      {/* MIDDLE SECTION */}
      <div className="px-10 grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10">

        {/* VERIFICATION STATUS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition"
        >
          <h3 className="text-2xl font-semibold text-gray-800">Verification Status</h3>
          <p className="mt-4 text-lg font-medium text-green-600">✔ Verified by UIDAI</p>
          <p className="text-gray-600 mt-2">Your identity and details are verified.</p>
        </motion.div>

        {/* AVAILABILITY */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition"
        >
          <h3 className="text-2xl font-semibold text-gray-800">Availability</h3>

          <div className="mt-4 flex items-center space-x-4">
            <label className="text-lg font-medium">Currently:</label>

            <button
              onClick={() => setAvailable(!available)}
              className={`px-6 py-2 rounded-lg text-white font-semibold transition ${
                available ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
              }`}
            >
              {available ? "Available" : "Not Available"}
            </button>
          </div>
        </motion.div>

        {/* RATING */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition"
        >
          <h3 className="text-xl font-semibold text-gray-800">Average Rating</h3>
          <p className="text-3xl font-bold mt-3 text-yellow-500">4.6 ⭐</p>
          <p className="text-gray-500">Based on contractor feedback</p>
        </motion.div>
      </div>

      {/* GRAPH SECTION */}
      <div className="px-10 mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* Earnings Graph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.01 }}
          className="bg-white shadow-lg p-6 rounded-2xl"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Monthly Earnings</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={earningsData}>
              <XAxis dataKey="month" />
              <Tooltip />
              <Bar dataKey="amount" fill="#3b82f6" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Rating Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.01 }}
          className="bg-white shadow-lg p-6 rounded-2xl"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Rating Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={ratingData}>
              <XAxis dataKey="job" />
              <YAxis domain={[0, 5]} />
              <Tooltip />
              <Line dataKey="rating" stroke="#10b981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
