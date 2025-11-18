import { useState, useMemo } from "react";
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
  const [search, setSearch] = useState("");

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
      {
        id: 3,
        contractor: "Urban Estates",
        contractorPerson: "Satish Kumar",
        category: "Carpenter",
        skill: "Expert",
        date: "2025-03-02",
        time: "09:00 AM",
        location: "Kurla, Mumbai",
        distance: "5.1 km",
        payment: "₹1100/day",
        workersNeeded: 3,
      },
      {
        id: 4,
        contractor: "Greenfield Builders",
        contractorPerson: "Nikhil Rao",
        category: "Plumber",
        skill: "Intermediate",
        date: "2025-03-05",
        time: "11:00 AM",
        location: "Dadar, Mumbai",
        distance: "2.4 km",
        payment: "₹900/day",
        workersNeeded: 2,
      },
      {
        id: 5,
        contractor: "Skyline Contractors",
        contractorPerson: "Priya Singh",
        category: "Painter",
        skill: "Beginner",
        date: "2025-03-06",
        time: "08:00 AM",
        location: "Powai, Mumbai",
        distance: "6.2 km",
        payment: "₹700/day",
        workersNeeded: 5,
      },
      {
        id: 6,
        contractor: "Metro Infra",
        contractorPerson: "S. Verma",
        category: "Carpenter",
        skill: "Intermediate",
        date: "2025-03-07",
        time: "07:30 AM",
        location: "Kurla, Mumbai",
        distance: "3.5 km",
        payment: "₹1150/day",
        workersNeeded: 2,
      },
      {
        id: 7,
        contractor: "BuildRight",
        contractorPerson: "Anita Desai",
        category: "Mason",
        skill: "Expert",
        date: "2025-03-08",
        time: "10:30 AM",
        location: "Andheri East, Mumbai",
        distance: "4.8 km",
        payment: "₹1300/day",
        workersNeeded: 6,
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
      {
        id: 23,
        contractor: "Prime Build Co.",
        contractorPerson: "Rohit Mehta",
        category: "Helper",
        skill: "Beginner",
        date: "2025-02-25",
        time: "07:00 AM",
        location: "Andheri West",
        distance: "4.0 km",
        payment: "₹650/day",
        workersNeeded: 3,
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
      {
        id: 34,
        contractor: "Nova Construct",
        contractorPerson: "Meera Joshi",
        category: "Helper",
        skill: "Beginner",
        date: "2025-02-05",
        time: "09:00 AM",
        location: "Andheri West",
        distance: "4.1 km",
        payment: "₹600/day",
        workersNeeded: 2,
      },
    ],

    rejected: [
      {
        id: 44,
        contractor: "QuickFix Services",
        contractorPerson: "Raman Patel",
        category: "Electrician",
        skill: "Intermediate",
        date: "2025-02-14",
        time: "11:00 AM",
        location: "Goregaon East",
        distance: "6.5 km",
        payment: "₹900/day",
        workersNeeded: 1,
      },
    ],
  };

  const [requests, setRequests] = useState(initialData);

  // ACTIONS
  const acceptRequest = (id) => {
    const item = requests.pending.find((p) => p.id === id);
    if (!item) return;
    setRequests((prev) => ({
      ...prev,
      pending: prev.pending.filter((p) => p.id !== id),
      accepted: [item, ...prev.accepted],
    }));
    toast.success("Request accepted");
  };

  const rejectRequest = (id) => {
    const item = requests.pending.find((p) => p.id === id);
    if (!item) return;
    setRequests((prev) => ({
      ...prev,
      pending: prev.pending.filter((p) => p.id !== id),
      rejected: [item, ...prev.rejected],
    }));
    toast.error("Request rejected");
  };

  const completeRequest = (id) => {
    const item = requests.accepted.find((p) => p.id === id);
    if (!item) return;
    setRequests((prev) => ({
      ...prev,
      accepted: prev.accepted.filter((p) => p.id !== id),
      completed: [item, ...prev.completed],
    }));
    toast.success("Marked completed");
  };

  const tabs = [
    { key: "pending", label: "Pending" },
    { key: "accepted", label: "Accepted" },
    { key: "completed", label: "Completed" },
    { key: "rejected", label: "Rejected" },
  ];

  // derived list (based on active tab & search)
  const currentList = useMemo(() => {
    const base = requests[activeTab] || [];
    if (!search || search.trim() === "") return base;
    const q = search.trim().toLowerCase();
    return base.filter((r) => {
      return (
        (r.contractor && r.contractor.toLowerCase().includes(q)) ||
        (r.contractorPerson && r.contractorPerson.toLowerCase().includes(q)) ||
        (r.category && r.category.toLowerCase().includes(q)) ||
        (r.location && r.location.toLowerCase().includes(q)) ||
        (String(r.id).includes(q))
      );
    });
  }, [requests, activeTab, search]);

  return (
    <>
      <BottomNavbar />

      {/* HERO */}
      <div className="relative">
        <div className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600
                        text-white px-10 pt-20 pb-12 rounded-b-3xl shadow-xl">
          <motion.h1
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold"
          >
            Job Request Queue
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="text-blue-100 text-lg mt-1 max-w-3xl"
          >
            View and manage incoming job requests — accept, reject or mark completed.
            Use the search to quickly find a contractor, category or location.
          </motion.p>
        </div>

        {/* KPI CARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 px-6 md:px-10 -mt-10 relative z-20">
          {tabs.map((t, i) => (
            <motion.div
              key={t.key}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, type: "spring", stiffness: 110 }}
              className="p-5 rounded-2xl shadow-lg border bg-gradient-to-br from-white/80 to-white/50 backdrop-blur-md
                         hover:scale-[1.02] transition-transform cursor-pointer"
            >
              <p className="text-gray-600 text-sm">{t.label}</p>
              <p className="text-3xl font-extrabold mt-1" style={{ background: "linear-gradient(90deg,#2563eb,#7c3aed)", WebkitBackgroundClip: "text", color: "transparent" }}>
                {requests[t.key].length}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="w-full px-6 md:px-10 mt-6 pb-36">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex gap-2 bg-white p-2 rounded-xl shadow-sm">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`px-4 py-2 rounded-lg font-medium transition whitespace-nowrap ${
                  activeTab === t.key ? "bg-blue-600 text-white shadow" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

        <div className="relative w-full md:w-1/3">
            <FiSearch className="absolute left-4 top-3 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search contractor, category, location or id..."
              className="w-full pl-12 pr-4 py-2.5 bg-white border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-200"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {currentList.length === 0 ? (
            <div className="col-span-full text-center bg-white p-12 rounded-xl border shadow-sm">
              <FiBox className="text-5xl mx-auto text-gray-300" />
              <h3 className="mt-4 text-gray-700 font-semibold">
                No {activeTab} requests found
              </h3>
              <p className="text-sm text-gray-500 mt-2">
                Try clearing the search or switching tabs.
              </p>
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
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                      <FiBriefcase className="text-blue-600" />
                      {req.contractor}
                    </h2>
                    <p className="text-gray-600 text-sm mt-1 flex items-center gap-2">
                      <FiUser className="text-green-600" />
                      {req.contractorPerson}
                    </p>
                  </div>

                  <span className="px-3 py-1 text-sm rounded-full bg-blue-50 text-blue-600 border">
                    {req.category}
                  </span>
                </div>

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

                  <p className="col-span-2 flex gap-2 items-center">
                    <FiMapPin className="text-pink-600" />
                    {req.location} <span className="text-gray-500">({req.distance})</span>
                  </p>
                </div>

                <div className="mt-6 flex gap-3">
                  {activeTab === "pending" && (
                    <>
                      <button
                        onClick={() => acceptRequest(req.id)}
                        className="w-full py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                      >
                        Accept
                      </button>

                      <button
                        onClick={() => rejectRequest(req.id)}
                        className="w-full py-2.5 bg-white border border-red-400 text-red-600 rounded-lg hover:bg-red-50"
                      >
                        Reject
                      </button>
                    </>
                  )}

                  {activeTab === "accepted" && (
                    <>
                      <button
                        onClick={() => completeRequest(req.id)}
                        className="w-full py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                      >
                        Mark Completed
                      </button>

                      <button
                        onClick={() => {
                          // move back to pending
                          setRequests((prev) => ({
                            ...prev,
                            accepted: prev.accepted.filter((p) => p.id !== req.id),
                            pending: [req, ...prev.pending],
                          }));
                          toast("Moved back to pending");
                        }}
                        className="w-full py-2.5 bg-white border text-gray-700 rounded-lg hover:bg-gray-50"
                      >
                        Undo
                      </button>
                    </>
                  )}

                  {activeTab === "completed" && (
                    <p className="text-purple-600 font-semibold">Completed</p>
                  )}

                  {activeTab === "rejected" && (
                    <p className="text-red-600 font-semibold">Rejected</p>
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
