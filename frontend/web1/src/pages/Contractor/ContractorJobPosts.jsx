import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import Footer from "../../components/footer";
import TopNavbar from "../../components/TopNavbar";

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
  FiPlayCircle,
  FiStopCircle,
  FiBox,
} from "react-icons/fi";


export default function ContractorJobPosts() {
  const [activeTab, setActiveTab] = useState("active");
  const [search, setSearch] = useState("");

  // ---------------------- Dummy Data ----------------------
  const initialData = {
    active: [
      {
        id: 101,
        title: "Mall Renovation - Mason Work",
        workersApplied: 3,
        workersNeeded: 5,
        category: "Mason",
        skill: "Intermediate",
        date: "2025-03-01",
        time: "10:00 AM",
        location: "Andheri East, Mumbai",
        payment: "₹900/day",
      },
      {
        id: 102,
        title: "Villa Painting Work",
        workersApplied: 1,
        workersNeeded: 4,
        category: "Painter",
        skill: "Beginner",
        date: "2025-03-05",
        time: "09:00 AM",
        location: "Powai, Mumbai",
        payment: "₹700/day",
      },
    ],

    pending: [
      {
        id: 201,
        title: "Warehouse Electrical Repair",
        workerName: "Raju",
        category: "Electrician",
        skill: "Expert",
        date: "2025-03-02",
        time: "08:00 AM",
        location: "Bhandup, Mumbai",
        payment: "₹1200/day",
      },
      {
        id: 202,
        title: "Modular Kitchen Setup",
        workerName: "Imran",
        category: "Carpenter",
        skill: "Intermediate",
        date: "2025-03-06",
        time: "09:30 AM",
        location: "Goregaon West",
        payment: "₹1100/day",
      },
    ],

    inprogress: [
      {
        id: 301,
        title: "Apartment Plumbing Fix",
        category: "Plumber",
        skill: "Intermediate",
        date: "2025-02-28",
        time: "11:00 AM",
        location: "Dadar, Mumbai",
        workersAssigned: 2,
        payment: "₹950/day",
      },
    ],

    completed: [
      {
        id: 401,
        title: "Office Carpentry Work",
        category: "Carpenter",
        skill: "Expert",
        date: "2025-02-10",
        time: "08:00 AM",
        location: "Kurla, Mumbai",
        workersAssigned: 1,
        payment: "₹1200/day",
      },
    ],

    cancelled: [],
  };

  const [jobs, setJobs] = useState(initialData);

  // ---------------------- Pipeline Actions ----------------------
  const approveWorker = (id) => {
    const item = jobs.pending.find((j) => j.id === id);
    if (!item) return;

    setJobs((prev) => ({
      ...prev,
      pending: prev.pending.filter((j) => j.id !== id),
      inprogress: [item, ...prev.inprogress],
    }));

    toast.success("Worker approved & job moved to In Progress");
  };

  const rejectWorker = (id) => {
    const item = jobs.pending.find((j) => j.id === id);
    if (!item) return;

    setJobs((prev) => ({
      ...prev,
      pending: prev.pending.filter((j) => j.id !== id),
      cancelled: [item, ...prev.cancelled],
    }));

    toast.error("Worker application rejected");
  };

  const completeJob = (id) => {
    const item = jobs.inprogress.find((j) => j.id === id);

    setJobs((prev) => ({
      ...prev,
      inprogress: prev.inprogress.filter((j) => j.id !== id),
      completed: [item, ...prev.completed],
    }));

    toast.success("Job marked as Completed");
  };

  const cancelJob = (id) => {
    const item = jobs.inprogress.find((j) => j.id === id);

    setJobs((prev) => ({
      ...prev,
      inprogress: prev.inprogress.filter((j) => j.id !== id),
      cancelled: [item, ...prev.cancelled],
    }));

    toast.error("Job Cancelled");
  };

  // ---------------------- Tabs ----------------------
  const tabs = [
    { key: "active", label: "Active" },
    { key: "pending", label: "Pending Applications" },
    { key: "inprogress", label: "In Progress" },
    { key: "completed", label: "Completed" },
    { key: "cancelled", label: "Cancelled" },
  ];

  // ---------------------- Search Filter ----------------------
  const currentList = useMemo(() => {
    const base = jobs[activeTab] || [];

    if (!search.trim()) return base;

    const q = search.toLowerCase();

    return base.filter(
      (j) =>
        (j.title && j.title.toLowerCase().includes(q)) ||
        (j.category && j.category.toLowerCase().includes(q)) ||
        (j.location && j.location.toLowerCase().includes(q)) ||
        (String(j.id).includes(q))
    );
  }, [jobs, activeTab, search]);

  return (
    <>
      <TopNavbar/>

      {/* HERO */}
      <div className="w-full bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 text-white px-10 pt-20 pb-12 rounded-b-3xl shadow-lg">
        <h1 className="text-3xl md:text-4xl font-extrabold">Your Job Posts</h1>
        <p className="text-blue-100 mt-1">
          Manage job posts, review worker applications, and track progress.
        </p>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 px-8 -mt-10 relative">
        {tabs.map((t, i) => (
          <motion.div
            key={t.key}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="p-5 bg-white/80 backdrop-blur-md rounded-2xl shadow-md border"
          >
            <p className="text-sm text-gray-600">{t.label}</p>
            <p className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 text-transparent bg-clip-text">
              {jobs[t.key].length}
            </p>
          </motion.div>
        ))}
      </div>

      {/* MAIN SECTION */}
      <div className="px-8 mt-8 pb-32">
        {/* TABS + SEARCH */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="flex gap-2 bg-white p-2 rounded-xl shadow-sm">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`px-4 py-2 rounded-lg font-medium ${
                  activeTab === t.key
                    ? "bg-blue-600 text-white"
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search job title, category, location..."
              className="w-full pl-12 pr-4 py-2.5 bg-white border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-200"
            />
          </div>
        </div>

        {/* LIST */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {currentList.length === 0 ? (
            <div className="col-span-full bg-white p-12 rounded-xl shadow border text-center">
              <FiBox className="text-5xl mx-auto text-gray-300" />
              <p className="font-semibold mt-3 text-gray-700">
                No items in this section
              </p>
            </div>
          ) : (
            currentList.map((job) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.01 }}
                className="bg-white rounded-xl border shadow-md p-6"
              >
                <div className="flex justify-between">
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <FiBriefcase className="text-blue-600" />
                    {job.title}
                  </h3>
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 border">
                    {job.category}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4 text-gray-700 text-sm">
                  <p className="flex items-center gap-2">
                    <FiUsers className="text-purple-500" />
                    {job.skill}
                  </p>

                  <p className="flex items-center gap-2">
                    <FiDollarSign className="text-emerald-600" />
                    {job.payment}
                  </p>

                  <p className="flex items-center gap-2">
                    <FiCalendar className="text-orange-500" />
                    {job.date}
                  </p>

                  <p className="flex items-center gap-2">
                    <FiClock className="text-red-500" />
                    {job.time}
                  </p>

                  <p className="flex items-center col-span-2 gap-2">
                    <FiMapPin className="text-pink-600" />
                    {job.location}
                  </p>
                </div>

                {/* Buttons */}
                <div className="mt-6 flex gap-3">
                  {activeTab === "pending" && (
                    <>
                      <button
                        onClick={() => approveWorker(job.id)}
                        className="w-full py-2.5 bg-emerald-600 text-white rounded-lg"
                      >
                        Approve Worker
                      </button>
                      <button
                        onClick={() => rejectWorker(job.id)}
                        className="w-full py-2.5 bg-red-50 text-red-600 border border-red-300 rounded-lg"
                      >
                        Reject
                      </button>
                    </>
                  )}

                  {activeTab === "inprogress" && (
                    <>
                      <button
                        onClick={() => completeJob(job.id)}
                        className="w-full py-2.5 bg-indigo-600 text-white rounded-lg"
                      >
                        Complete Job
                      </button>

                      <button
                        onClick={() => cancelJob(job.id)}
                        className="w-full py-2.5 bg-white border text-gray-700 rounded-lg"
                      >
                        Cancel Job
                      </button>
                    </>
                  )}

                  {activeTab === "active" && (
                    <p className="text-blue-600 font-semibold">
                      {job.workersApplied} applied / {job.workersNeeded} needed
                    </p>
                  )}

                  {activeTab === "completed" && (
                    <p className="text-emerald-600 font-semibold flex items-center gap-2">
                      <FiCheckCircle /> Completed
                    </p>
                  )}

                  {activeTab === "cancelled" && (
                    <p className="text-red-600 font-semibold flex items-center gap-2">
                      <FiXCircle /> Cancelled
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
