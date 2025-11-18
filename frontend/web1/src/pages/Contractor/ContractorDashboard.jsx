import React from "react";
import { motion } from "framer-motion";
import Footer from "../../components/footer";
import { Link } from "react-router-dom";
import TopNavbar from "../../components/TopNavbar";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function ContractorDashboard() {
  // Rating Graph Data
  const ratingData = [
    { month: "Jan", rating: 4.1 },
    { month: "Feb", rating: 4.3 },
    { month: "Mar", rating: 4.5 },
    { month: "Apr", rating: 4.4 },
    { month: "May", rating: 4.6 },
    { month: "Jun", rating: 4.7 },
  ];

  // Past Payments Data
  const paymentData = [
    { job: "Mall Construction", amount: "₹1,20,000", date: "12 Mar 2024" },
    { job: "Villa Renovation", amount: "₹85,000", date: "27 Feb 2024" },
    { job: "Warehouse Electrical", amount: "₹60,000", date: "10 Feb 2024" },
  ];

  const pieData = [
    { name: "Completed", value: 70 },
    { name: "Ongoing", value: 20 },
    { name: "Cancelled", value: 10 },
  ];

  const donutColors = ["#2563eb", "#f59e0b", "#ef4444"];

  return (
    <div className="min-h-screen bg-[#f4f6f8] py-20">
      {/* Navbar */}
      <TopNavbar />

      {/* Header */}
      <div className="px-10 mt-6">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-semibold text-gray-900"
        >
          Contractor Dashboard
        </motion.h2>
        <p className="text-gray-600 mt-1">
          A complete overview of your company and performance insights.
        </p>
      </div>

      {/* TOP SECTION → Company Info + Founder */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 px-10 mt-8">

        {/* Company Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h3 className="text-2xl font-semibold text-gray-800">
            Company Details
          </h3>

          <div className="mt-4 text-gray-600 space-y-2">
            <p><span className="font-bold">Company Name:</span> Prime Build Co.</p>
            <p><span className="font-bold">Founded:</span> 2016</p>
            <p><span className="font-bold">Employees:</span> 48 worldwide</p>
            <p><span className="font-bold">Specialization:</span> Commercial & Residential Construction</p>
            <p><span className="font-bold">GST No:</span> 27ABCDE1234F1Z5</p>
            <p><span className="font-bold">Office:</span> Mumbai, Maharashtra</p>
            <p><span className="font-bold">Verified Status:</span> <span className="text-green-600 font-bold">Verified ✓</span></p>
          </div>
        </motion.div>

        {/* Founder Card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center"
        >
          <img
            src="https://img.freepik.com/premium-photo/builder-engineer-civil-engineer-worker-construction-site-engineer-worker-suit-helmet_265223-112361.jpg"
            alt="Founder"
            className="w-32 h-32 rounded-full shadow-md border"
          />
          <h3 className="text-xl font-semibold mt-4">Rohit Mehta</h3>
          <p className="text-gray-500">Founder & CEO</p>

          <p className="text-center mt-4 text-gray-600 px-4">
            “Our mission is to bring transparency and reliability to the
            construction labour market.”
          </p>
        </motion.div>

        {/* Donut Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h3 className="text-2xl font-semibold text-gray-800">Project Status Distribution</h3>

          <PieChart width={300} height={240}>
            <Pie
              data={pieData}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={80}
              innerRadius={50}
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={index} fill={donutColors[index]} />
              ))}
            </Pie>
          </PieChart>
        </motion.div>
      </div>

      {/* Middle Section → Stats + Graph */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-10 mt-10">
        
        {/* Rating Graph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-2xl shadow-lg"
        >
          <h3 className="text-2xl font-semibold text-gray-800">Rating Overview</h3>

          <LineChart width={500} height={250} data={ratingData}>
            <Line type="monotone" dataKey="rating" stroke="#2563eb" strokeWidth={3} />
            <CartesianGrid stroke="#e5e7eb" />
            <XAxis dataKey="month" />
            <YAxis domain={[3.5, 5]} />
            <Tooltip />
          </LineChart>
        </motion.div>

        {/* Past Payments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-2xl shadow-lg"
        >
          <h3 className="text-2xl font-semibold text-gray-800">Past Payments</h3>

          <table className="w-full mt-4">
            <thead>
              <tr className="border-b text-gray-600">
                <th className="text-left py-2">Job</th>
                <th className="text-left">Amount</th>
                <th className="text-left">Date</th>
              </tr>
            </thead>

            <tbody>
              {paymentData.map((p, i) => (
                <tr key={i} className="border-b hover:bg-gray-100 transition">
                  <td className="py-2">{p.job}</td>
                  <td>{p.amount}</td>
                  <td>{p.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>

      {/* Insights Section */}
      <div className="px-10 mt-10 pb-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white shadow-lg rounded-2xl p-6"
        >
          <h3 className="text-2xl font-semibold text-gray-800">Insights & Performance</h3>

          <ul className="mt-4 text-gray-700 space-y-2">
            <li>• Average labour acceptance rate: <span className="font-bold text-blue-600">87%</span></li>
            <li>• Average hiring time reduced by <span className="font-bold text-green-600">46%</span> this year</li>
            <li>• Top performing category: <span className="font-bold text-purple-600">Mason</span></li>
            <li>• Repeat contractor satisfaction score: <span className="font-bold text-yellow-600">92%</span></li>
            <li>• Recommended labourers have a <span className="font-bold text-indigo-600">35% better success rate</span></li>
          </ul>
        </motion.div>
      </div>
      {/* footer */}
            <section>
                  <div>
                    <Footer></Footer>
                  </div>
            </section>
    </div>
  );
}
