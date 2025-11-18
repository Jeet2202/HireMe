import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import BottomNavbar from "../../components/BottomNavbar";
import Footer from "../../components/footer";

import {
  FiBriefcase,
  FiUser,
  FiMapPin,
  FiClock,
  FiCalendar,
  FiSearch,
  FiDollarSign,
  FiUsers,
  FiCheckCircle,
  FiXCircle,
  FiBox,
} from "react-icons/fi";

export default function LabourerJobRequests() {
  const [activeTab, setActiveTab] = useState("pending");

  const initialData = {
    pending: [
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
        contractor: "Nova Construct",
        contractorPerson: "Meera Joshi",
        category: "Helper",
        skill: "Beginner",
        date: "2025-02-21",
        time: "08:30 AM",
        location: "Andheri West, Mumbai",
        distance: "3.9 km",
        payment: "₹600/day",
        workersNeeded: 2,
      },
    ],

    accepted: [
      {
        id: 22,
        contractor: "Skyline Contractors",
        contractorPerson: "Ajay Sharma",
        category: "Painter",
        skill: "Expert",
        date: "2025-02-18",
        time: "09:30 AM",
        location: "Bandra West, Mumbai",
        distance: "5.8 km",
        payment: "₹1200/day",
        workersNeeded: 1,
      },
    ],

    completed: [
      {
        id: 33,
        contractor: "Metro Infra",
        contractorPerson: "S. Verma",
        category: "Carpenter",
        skill: "Intermediate",
        date: "2025-02-11",
        time: "08:00 AM",
        location: "Kurla, Mumbai",
        distance: "3.5 km",
        payment: "₹1100/day",
        workersNeeded: 2,
      },
    ],

    rejected: [],
  };

  const [requests, setRequests] = useState(initialData);

  const acceptRequest = (id) => {
    const item = requests.pending.find((p) => p.id === id);
    setRequests((prev) => ({
      ...prev,
      pending: prev.pending.filter((p) => p.id !== id),
      accepted: [...prev.accepted, item],
    }));
    toast.success("Request accepted");
  };

  const rejectRequest = (id) => {
    const item = requests.pending.find((p) => p.id === id);
    setRequests((prev) => ({
      ...prev,
      pending: prev.pending.filter((p) => p.id !== id),
      rejected: [...prev.rejected, item],
    }));
    toast.error("Request rejected");
  };

  const completeRequest = (id) => {
    const item = requests.accepted.find((p) => p.id === id);
    setRequests((prev) => ({
      ...prev,
      accepted: prev.accepted.filter((p) => p.id !== id),
      completed: [...prev.completed, item],
    }));
    toast.success("Marked completed");
  };

  const tabs = [
    { key: "pending", label: "Pending" },
    { key: "accepted", label: "Accepted" },
    { key: "completed", label: "Completed" },
    { key: "rejected", label: "Rejected" },
  ];

  const currentList = requests[activeTab];

  return (
    <>
      <BottomNavbar />

      {/* ---------------------- HERO / HEADER ---------------------- */}
      <div className="relative">
        <div className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 
                        text-white px-10 pt-24 pb-16 rounded-b-3xl shadow-xl">

          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold"
          >
            Job Request Queue
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-blue-100 text-lg mt-1"
          >
            View and manage all job requests easily
          </motion.p>
        </div>

        {/* ---------------------- KPI CARDS ---------------------- */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 px-6 md:px-10 -mt-10 relative z-20">

          {tabs.map((t, i) => (
            <motion.div
              key={t.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.10 }}
              className="p-5 rounded-2xl shadow-lg border bg-gradient-to-br
                         from-white/70 to-white/20 backdrop-blur-lg
                         hover:from-blue-50 hover:to-purple-50 
                         transition-all duration-300 cursor-pointer"
            >
              <p className="text-gray-700 text-sm">{t.label}</p>
              <p className="text-3xl font-extrabold mt-1 bg-gradient-to-r from-blue-700 to-purple-700
                            bg-clip-text text-transparent">
                {requests[t.key].length}
              </p>
            </motion.div>
          ))}

        </div>
      </div>

      {/* ---------------------- MAIN CONTENT ---------------------- */}
      <div className="w-full px-6 md:px-10 mt-6 pb-32">

        {/* Tabs + Search */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="flex gap-3 bg-white p-2 rounded-xl shadow-sm">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  activeTab === t.key
                    ? "bg-blue-600 text-white shadow"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-1/3">
            <FiSearch className="absolute left-4 top-3 text-gray-400" />
            <input
              placeholder="Search contractor or category..."
              className="w-full pl-12 pr-4 py-2.5 bg-white border rounded-xl shadow-sm 
                         focus:ring-2 focus:ring-blue-200"
            />
          </div>
        </div>

        {/* ---------------------- REQUEST LIST ---------------------- */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          {currentList.length === 0 ? (
            <div className="col-span-full text-center bg-white p-12 rounded-xl border shadow-sm">
              <FiBox className="text-5xl mx-auto text-gray-300" />
              <h3 className="mt-4 text-gray-700 font-semibold">
                No {activeTab} requests
              </h3>
            </div>
          ) : (
            currentList.map((req) => (
              <motion.div
                key={req.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.01 }}
                className="bg-white rounded-xl shadow-md p-6 border transition"
              >
                {/* HEADER */}
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                      <FiBriefcase className="text-blue-600" />
                      {req.contractor}
                    </h2>
                    <p className="text-gray-600 text-sm mt-1 flex items-center gap-1">
                      <FiUser className="text-green-600" />
                      {req.contractorPerson}
                    </p>
                  </div>

                  <span className="px-3 py-1 text-sm rounded-full bg-blue-50 text-blue-600 border">
                    {req.category}
                  </span>
                </div>

                {/* DETAILS */}
                <div className="grid grid-cols-2 gap-4 mt-4 text-gray-700 text-sm">

                  <p className="flex gap-2 items-center">
                    <FiUsers className="text-purple-500" />
                    {req.skill}
                  </p>

                  <p className="flex gap-2 items-center">
                    <FiDollarSign className="text-emerald-600" />
                    {req.payment}
                  </p>

                  <p className="flex gap-2 items-center">
                    <FiCalendar className="text-orange-500" />
                    {req.date}
                  </p>

                  <p className="flex gap-2 items-center">
                    <FiClock className="text-red-500" />
                    {req.time}
                  </p>

                  <p className="flex gap-2 items-center col-span-2">
                    <FiMapPin className="text-pink-600" />
                    {req.location}
                    <span className="text-gray-500 ml-1">({req.distance})</span>
                  </p>
                </div>

                {/* ACTION BUTTONS */}
                <div className="mt-6">
                  {activeTab === "pending" && (
                    <div className="flex gap-3">
                      <button
                        onClick={() => acceptRequest(req.id)}
                        className="w-full py-2.5 bg-emerald-600 text-white rounded-lg 
                                   hover:bg-emerald-700"
                      >
                        Accept
                      </button>

                      <button
                        onClick={() => rejectRequest(req.id)}
                        className="w-full py-2.5 bg-white border border-red-400 
                                   text-red-600 rounded-lg hover:bg-red-50"
                      >
                        Reject
                      </button>
                    </div>
                  )}

                  {activeTab === "accepted" && (
                    <button
                      onClick={() => completeRequest(req.id)}
                      className="w-full py-2.5 bg-indigo-600 text-white rounded-lg 
                                 hover:bg-indigo-700"
                    >
                      Mark Completed
                    </button>
                  )}

                  {activeTab === "completed" && (
                    <p className="text-purple-600 font-semibold flex justify-end mt-2">
                      <FiCheckCircle className="mr-1" /> Completed
                    </p>
                  )}

                  {activeTab === "rejected" && (
                    <p className="text-red-600 font-semibold flex justify-end mt-2">
                      <FiXCircle className="mr-1" /> Rejected
                    </p>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
