import React from "react";
import { motion } from "framer-motion";
import Footer from "../../components/footer";
import { Link } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";


// Recharts
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Pie,
  PieChart,
  Cell,
} from "recharts";

export default function AdminDashboard() {

  // Dummy Data
  const workerGrowth = [
    { month: "Jan", workers: 40 },
    { month: "Feb", workers: 55 },
    { month: "Mar", workers: 80 },
    { month: "Apr", workers: 120 },
    { month: "May", workers: 170 },
  ];

  const jobStats = [
    { month: "Jan", jobs: 22 },
    { month: "Feb", jobs: 35 },
    { month: "Mar", jobs: 40 },
    { month: "Apr", jobs: 50 },
    { month: "May", jobs: 65 },
  ];

  // Job Completion Analytics
  const jobCompletionData = [
    { name: "Completed", value: 180 },
    { name: "Cancelled", value: 45 },
  ];

  // Skill Level Pie Chart
  const skillLevels = [
    { level: "Level 1 (Helper)", value: 120 },
    { level: "Level 2 (Semi-skilled)", value: 220 },
    { level: "Level 3 (Skilled)", value: 310 },
    { level: "Level 4 (Expert)", value: 95 },
  ];

  const COLORS = ["#3b82f6", "#10b981", "#6366f1", "#f59e0b"];

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ================= NAVBAR ================= */}
      <AdminNavbar />


      {/* ================= HEADER ================= */}
      <div className="px-10 mt-6">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-semibold text-gray-900"
        >
          Admin Dashboard
        </motion.h2>
        <p className="text-gray-600">Platform performance and analytics overview.</p>
      </div>

      {/* ================= TOP CARDS ================= */}
      <div className="px-10 grid grid-cols-1 md:grid-cols-5 gap-8 mt-8">

        {/* Workers */}
        <motion.div whileHover={{ scale: 1.03 }} className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-700">Total Workers</h3>
          <p className="text-4xl mt-3 font-bold text-blue-600">1,240</p>
        </motion.div>

        {/* Contractors */}
        <motion.div whileHover={{ scale: 1.03 }} className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-700">Total Contractors</h3>
          <p className="text-4xl mt-3 font-bold text-green-600">280</p>
        </motion.div>

        {/* Bookings */}
        <motion.div whileHover={{ scale: 1.03 }} className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-700">Bookings This Month</h3>
          <p className="text-4xl mt-3 font-bold text-purple-600">89</p>
        </motion.div>

        {/* Platform Rating */}
        <motion.div whileHover={{ scale: 1.03 }} className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-700">Platform Rating</h3>
          <p className="text-4xl mt-3 font-bold text-yellow-500">4.5 ⭐</p>
        </motion.div>

        {/* Pending KYC */}
        <motion.div whileHover={{ scale: 1.03 }} className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-700">Pending KYC</h3>
          <p className="text-4xl mt-3 font-bold text-orange-500">32</p>
        </motion.div>

      </div>

      {/* ================= ANALYTICS SECTION ================= */}
      <div className="px-10 mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* Worker Growth */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Worker Growth</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={workerGrowth}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line dataKey="workers" stroke="#2563eb" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Job Stats */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Job Statistics</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={jobStats}>
              <XAxis dataKey="month" />
              <Tooltip />
              <Bar dataKey="jobs" fill="#10b981" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

      </div>

      {/* ================= JOB COMPLETION + SKILL DISTRIBUTION ================= */}
      <div className="px-10 mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* Job Completion Analytics */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Job Completion Analytics</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={jobCompletionData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                <Cell fill="#10b981" />
                <Cell fill="#ef4444" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          {/* Success Rate */}
          <p className="text-center text-lg font-semibold mt-4 text-gray-700">
            Success Rate:{" "}
            <span className="text-green-600">
              {Math.round((180 / (180 + 45)) * 100)}%
            </span>
          </p>
        </motion.div>

        {/* Skill Level Distribution */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Skill Level Distribution</h3>

          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={skillLevels}
                dataKey="value"
                nameKey="level"
                outerRadius={100}
                label
              >
                {skillLevels.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
