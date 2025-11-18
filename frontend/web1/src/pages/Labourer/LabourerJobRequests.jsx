import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import {
  FiBriefcase,
  FiUser,
  FiMapPin,
  FiClock,
  FiCalendar,
  FiChevronRight,
  FiDollarSign,
  FiUsers,
} from "react-icons/fi";

export default function LabourerJobRequests() {
  const [requests, setRequests] = useState([
    {
      id: 1,
      contractor: "Prime Build Co.",
      contractorPerson: "Rohit Mehta",
      category: "Mason",
      skill: "Intermediate",
      date: "2025-02-20",
      time: "10:00 AM",
      location: "Andheri East, Mumbai",
      distance: "4.2 km",
      payment: "₹950/day",
      workersNeeded: 4,
    },
    {
      id: 2,
      contractor: "Skyline Contractors",
      contractorPerson: "Ajay Sharma",
      category: "Helper",
      skill: "Beginner",
      date: "2025-02-21",
      time: "9:00 AM",
      location: "Goregaon West, Mumbai",
      distance: "3.1 km",
      payment: "₹600/day",
      workersNeeded: 2,
    },
  ]);

  const handleAction = (id, accepted) => {
    setRequests((prev) => prev.filter((req) => req.id !== id));

    accepted
      ? toast.success("Job Accepted Successfully")
      : toast.error("Job Rejected");
  };

  return (
    <div className="min-h-screen bg-[#f5f7fa] pt-28 px-8 pb-12">
      <h1 className="text-3xl font-semibold text-gray-900 mb-8 tracking-tight">
        Job Requests
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {requests.map((req) => (
          <motion.div
            key={req.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-6 border border-gray-100"
          >
            {/* Contractor Header */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <FiBriefcase className="text-blue-600" /> {req.contractor}
                </h2>
                <p className="text-gray-600 text-sm flex items-center gap-1 mt-1">
                  <FiUser className="text-green-600" />
                  Contact Person: <b>{req.contractorPerson}</b>
                </p>
              </div>

              <span className="text-sm text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                {req.category}
              </span>
            </div>

            {/* Job Info — Professional Layout */}
            <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-sm text-gray-700">

              <div className="flex items-center gap-2">
                <FiUsers className="text-purple-500" />
                Skill Level: <b>{req.skill}</b>
              </div>

              <div className="flex items-center gap-2">
                <FiCalendar className="text-orange-500" />
                Date: <b>{req.date}</b>
              </div>

              <div className="flex items-center gap-2">
                <FiClock className="text-red-500" />
                Time: <b>{req.time}</b>
              </div>

              <div className="flex items-center gap-2">
                <FiDollarSign className="text-emerald-600" />
                Payment: <b>{req.payment}</b>
              </div>

              <div className="flex items-center gap-2 col-span-2">
                <FiMapPin className="text-pink-600" />
                Location: <b>{req.location}</b>
                <span className="text-gray-500">({req.distance})</span>
              </div>

              <div className="flex items-center gap-2">
                <FiUsers className="text-blue-600" />
                Workers Needed: <b>{req.workersNeeded}</b>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-6">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAction(req.id, true)}
                className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium shadow-sm"
              >
                Accept Request
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAction(req.id, false)}
                className="w-full py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium shadow-sm"
              >
                Reject
              </motion.button>
            </div>
          </motion.div>
        ))}

        {requests.length === 0 && (
          <p className="text-gray-600 text-lg col-span-2 text-center mt-8">
            No job requests at the moment.
          </p>
        )}
      </div>
    </div>
  );
}
