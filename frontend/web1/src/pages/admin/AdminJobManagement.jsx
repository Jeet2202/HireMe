import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from "recharts";
import AdminNavbar from "../../components/AdminNavbar";
import Footer from "../../components/footer";

/**
 * AdminJobManagement.jsx
 * Accordion-style Job Management with filters, alerts and analytics.
 */

const CATEGORY_COLORS = {
  Mason: "bg-yellow-100 text-yellow-800",
  Carpenter: "bg-blue-100 text-blue-800",
  Electrician: "bg-purple-100 text-purple-800",
  Helper: "bg-gray-100 text-gray-800",
  Plumber: "bg-teal-100 text-teal-800",
};

const dummyJobs = [
  {
    id: "JOB-2025-001",
    contractor: "Prime Build Co.",
    contractorPerson: "Rohit Mehta",
    category: "Mason",
    required: 40,
    applied: 10,
    booked: 8,
    wage: 650,
    location: "Andheri East, Mumbai",
    startDate: "2025-11-19",
    endDate: "2025-11-23",
    mode: "Daily Wage",
    status: "Open",
    notes: "Mall finishing and facade work. Requires experienced masons for tile and plaster finishing.",
  },
  {
    id: "JOB-2025-002",
    contractor: "UrbanCore Construction",
    contractorPerson: "Deepak Shah",
    category: "Carpenter",
    required: 15,
    applied: 12,
    booked: 9,
    wage: 700,
    location: "Pune - Wakad",
    startDate: "2025-11-20",
    endDate: "2025-11-22",
    mode: "Hourly",
    status: "Open",
    notes: "Interior framing and door fittings.",
  },
  {
    id: "JOB-2025-003",
    contractor: "Skyline InfraWorks",
    contractorPerson: "Aarav Khanna",
    category: "Electrician",
    required: 10,
    applied: 7,
    booked: 4,
    wage: 900,
    location: "Nashik Industrial Area",
    startDate: "2025-11-19",
    endDate: "2025-11-25",
    mode: "Daily Wage",
    status: "Open",
    notes: "Warehouse electrical setup. Requires certified electricians.",
  },
  {
    id: "JOB-2025-004",
    contractor: "Elite Home Makers",
    contractorPerson: "Kunal Deshmukh",
    category: "Helper",
    required: 20,
    applied: 18,
    booked: 16,
    wage: 400,
    location: "Thane",
    startDate: "2025-11-21",
    endDate: "2025-11-22",
    mode: "Daily Wage",
    status: "Open",
    notes: "Site helpers for painting & cleanup.",
  },
  {
    id: "JOB-2025-005",
    contractor: "Future Build Co.",
    contractorPerson: "Mayank Gupta",
    category: "Mason",
    required: 30,
    applied: 25,
    booked: 20,
    wage: 600,
    location: "Bandra",
    startDate: "2025-11-22",
    endDate: "2025-11-30",
    mode: "Daily Wage",
    status: "Open",
    notes: "Residential complex internal finishing.",
  },
  {
    id: "JOB-2025-006",
    contractor: "Modern Infra Ltd",
    contractorPerson: "Neha Sharma",
    category: "Plumber",
    required: 6,
    applied: 2,
    booked: 1,
    wage: 800,
    location: "Andheri West",
    startDate: "2025-11-19",
    endDate: "2025-11-20",
    mode: "Hourly",
    status: "Open",
    notes: "Sanitary fittings and drainage work.",
  },
  {
    id: "JOB-2025-007",
    contractor: "Global Build Co.",
    contractorPerson: "Sanjay Rao",
    category: "Electrician",
    required: 12,
    applied: 12,
    booked: 10,
    wage: 950,
    location: "Pune - Kharadi",
    startDate: "2025-11-24",
    endDate: "2025-11-27",
    mode: "Daily Wage",
    status: "Open",
    notes: "Data center cabling project. Requires experienced teams.",
  },
  {
    id: "JOB-2025-008",
    contractor: "Apex Contractors",
    contractorPerson: "Ritika Das",
    category: "Mason",
    required: 50,
    applied: 8,
    booked: 3,
    wage: 700,
    location: "Navi Mumbai",
    startDate: "2025-11-20",
    endDate: "2025-11-26",
    mode: "Daily Wage",
    status: "Open",
    notes: "Large warehouse flooring and structural finishing.",
  },
];

function formatDateForInput(d) {
  const dt = new Date(d);
  const y = dt.getFullYear();
  const m = String(dt.getMonth() + 1).padStart(2, "0");
  const day = String(dt.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default function AdminJobManagement() {
  const [jobs] = useState(dummyJobs);
  const [expandedId, setExpandedId] = useState(null);

  // filter state: 'all' | 'today' | 'tomorrow' | 'week' | custom date
  const [filter, setFilter] = useState("all");
  const [customDate, setCustomDate] = useState("");

  // computed filtered jobs
  const filteredJobs = useMemo(() => {
    const now = new Date();
    const todayStr = formatDateForInput(now);
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    const tomorrowStr = formatDateForInput(tomorrow);

    if (filter === "all") return jobs;
    if (filter === "today") return jobs.filter((j) => j.startDate === todayStr || j.endDate === todayStr);
    if (filter === "tomorrow") return jobs.filter((j) => j.startDate === tomorrowStr || j.endDate === tomorrowStr);
    if (filter === "week") {
      const start = new Date();
      const end = new Date();
      end.setDate(start.getDate() + 7);
      return jobs.filter((j) => {
        const s = new Date(j.startDate);
        return s >= start && s <= end;
      });
    }
    if (filter === "custom" && customDate) {
      return jobs.filter((j) => j.startDate === customDate || j.endDate === customDate);
    }
    return jobs;
  }, [jobs, filter, customDate]);

  // alerts: jobs where applied < 50% required
  const alerts = useMemo(() => {
    return jobs.filter((j) => j.applied / j.required < 0.5);
  }, [jobs]);

  // category demand (for chart)
  const categoryDemand = useMemo(() => {
    const map = {};
    jobs.forEach((j) => {
      map[j.category] = (map[j.category] || 0) + 1;
    });
    return Object.keys(map).map((k) => ({ category: k, count: map[k] }));
  }, [jobs]);

  // compute allocation % and color
  function allocationInfo(job) {
    const pct = Math.round((job.booked / job.required) * 100);
    let tone = "bg-green-400";
    if (pct < 40) tone = "bg-red-400";
    else if (pct < 70) tone = "bg-orange-400";
    return { pct: isFinite(pct) ? pct : 0, tone };
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />

      {/* Header */}
      <div className="px-10 pt-6">
        <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-4xl font-semibold text-gray-900">
          Job Management
        </motion.h2>
        <p className="text-gray-600 mt-1">Review job posts, allocation status and worker availability insights.</p>
      </div>

      {/* Filters */}
      <div className="px-10 mt-6 flex flex-col md:flex-row md:items-center gap-4 justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => { setFilter("all"); setCustomDate(""); }}
            className={`px-4 py-2 rounded-lg ${filter === "all" ? "bg-blue-600 text-white" : "bg-white text-gray-700"} shadow-sm`}
          >
            All
          </button>

          <button
            onClick={() => { setFilter("today"); setCustomDate(""); }}
            className={`px-4 py-2 rounded-lg ${filter === "today" ? "bg-blue-600 text-white" : "bg-white text-gray-700"} shadow-sm`}
          >
            Today
          </button>

          <button
            onClick={() => { setFilter("tomorrow"); setCustomDate(""); }}
            className={`px-4 py-2 rounded-lg ${filter === "tomorrow" ? "bg-blue-600 text-white" : "bg-white text-gray-700"} shadow-sm`}
          >
            Tomorrow
          </button>

          <button
            onClick={() => { setFilter("week"); setCustomDate(""); }}
            className={`px-4 py-2 rounded-lg ${filter === "week" ? "bg-blue-600 text-white" : "bg-white text-gray-700"} shadow-sm`}
          >
            This Week
          </button>

          <div className="flex items-center bg-white rounded-lg px-3 py-2 shadow-sm">
            <label className="text-sm text-gray-600 mr-2">Date</label>
            <input
              type="date"
              value={customDate}
              onChange={(e) => { setCustomDate(e.target.value); setFilter("custom"); }}
              className="text-sm"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-sm text-gray-600">Total Jobs:</div>
          <div className="px-3 py-1 bg-white rounded-md shadow-sm font-semibold">{jobs.length}</div>

          <div className="text-sm text-gray-600">Filtered:</div>
          <div className="px-3 py-1 bg-white rounded-md shadow-sm font-semibold">{filteredJobs.length}</div>
        </div>
      </div>

      {/* Job Accordion List */}
      <div className="px-10 mt-6 space-y-4">
        {filteredJobs.map((job) => {
          const { pct, tone } = allocationInfo(job);
          const isShortage = job.applied / job.required < 0.5;
          const isLowApplied = job.applied < job.required;
          const expanded = expandedId === job.id;

          return (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-md overflow-hidden"
            >
              {/* Header */}
              <div
                onClick={() => setExpandedId(expanded ? null : job.id)}
                className="px-5 py-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-4">
                  <div className={`px-3 py-1 rounded-full text-sm font-semibold ${CATEGORY_COLORS[job.category] || "bg-gray-100 text-gray-800"}`}>
                    {job.category}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <div className="text-lg font-semibold">{job.contractor}</div>
                      <div className="text-sm text-gray-500">• {job.contractorPerson}</div>
                    </div>

                    <div className="text-sm text-gray-600 mt-1 flex items-center gap-4">
                      <div>Required: <span className="font-semibold">{job.required}</span></div>
                      <div>Applied: <span className={`${job.applied / job.required < 0.5 ? "text-red-600 font-semibold" : "text-gray-700"}`}>{job.applied}</span></div>
                      <div>Booked: <span className="font-semibold">{job.booked}</span></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div>
                    <div className={`px-3 py-1 rounded-full text-sm font-semibold ${isShortage ? "bg-orange-100 text-orange-700" : "bg-green-100 text-green-700"}`}>
                      {isShortage ? "Low Applications" : "Open"}
                    </div>
                  </div>

                  <div className="text-sm text-gray-500 mr-2">{job.startDate}</div>

                  <div className={`transform transition-transform ${expanded ? "rotate-180" : ""}`}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#374151">
                      <path d="M6 9l6 6 6-6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Expanded content */}
              {expanded && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="px-6 pb-6 pt-2 border-t"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left: Job Details */}
                    <div className="col-span-2">
                      <h4 className="text-lg font-semibold text-gray-800">{job.category} — {job.id}</h4>

                      <p className="text-gray-600 mt-2">{job.notes}</p>

                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="text-sm text-gray-500">Location</div>
                          <div className="font-medium">{job.location}</div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="text-sm text-gray-500">Wage</div>
                          <div className="font-medium">₹{job.wage} / {job.mode}</div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="text-sm text-gray-500">Duration</div>
                          <div className="font-medium">{job.startDate} → {job.endDate}</div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="text-sm text-gray-500">Contractor Contact</div>
                          <div className="font-medium">{job.contractorPerson} • {job.contractor}</div>
                        </div>
                      </div>

                      {/* Allocation progress */}
                      <div className="mt-5">
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-600">Worker Allocation: {job.booked} / {job.required}</div>
                          <div className="text-sm font-semibold text-gray-700">{pct}%</div>
                        </div>

                        <div className="w-full bg-gray-100 h-3 rounded-full mt-2 overflow-hidden">
                          <div className={`${tone} h-3`} style={{ width: `${pct}%` }} />
                        </div>
                      </div>

                      {/* Shortage insight */}
                      {isShortage && (
                        <div className="mt-4 bg-orange-50 border border-orange-100 p-4 rounded-lg">
                          <div className="flex items-start gap-3">
                            <div className="text-orange-600 text-2xl">⚠</div>
                            <div>
                              <div className="font-semibold text-orange-800">Worker Shortage Detected</div>
                              <div className="text-sm text-orange-700 mt-1">Only {job.applied} out of {job.required} workers applied. Consider increasing the wage, widening search radius, or prioritizing MoU contractors.</div>
                              <div className="mt-3 flex gap-2">
                                <button className="px-3 py-2 bg-orange-600 text-white rounded-md text-sm hover:bg-orange-700">Suggest +₹50</button>
                                <button className="px-3 py-2 bg-white border border-orange-200 text-orange-700 rounded-md text-sm">Notify Nearby Workers</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right: Actions & quick stats */}
                    <div className="col-span-1">
                      <div className="bg-white shadow-sm rounded-lg p-4">
                        <div className="text-sm text-gray-500">Applied</div>
                        <div className="text-2xl font-semibold">{job.applied}</div>
                        <div className="text-sm text-gray-500 mt-3">Booked</div>
                        <div className="text-2xl font-semibold">{job.booked}</div>
                        <div className="text-sm text-gray-500 mt-3">Required</div>
                        <div className="text-lg font-semibold">{job.required}</div>

                        <div className="mt-4">
                          <button className="w-full px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition mb-2">View Contractor Profile</button>
                          <button className="w-full px-3 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition">Close</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Alerts + Analytics */}
      <div className="px-10 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alerts column */}
        <div className="col-span-1">
          <h4 className="text-xl font-semibold mb-3">Worker Allocation Alerts</h4>

          <div className="space-y-3">
            {alerts.length === 0 && (
              <div className="bg-green-50 p-4 rounded-lg text-green-800">No allocation issues. All good.</div>
            )}

            {alerts.map((a) => {
              const severity = a.applied / a.required < 0.25 ? "High" : "Medium";
              return (
                <motion.div key={a.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-sm text-gray-500">{a.category} • {a.contractor}</div>
                      <div className="font-semibold">{a.id}</div>
                      <div className="text-sm text-gray-600 mt-1">Required: {a.required} · Applied: {a.applied} · Booked: {a.booked}</div>
                    </div>

                    <div className="text-sm">
                      <div className={`px-2 py-1 rounded-full ${severity === "High" ? "bg-red-100 text-red-700" : "bg-orange-100 text-orange-700"}`}>{severity}</div>
                    </div>
                  </div>

                  <div className="mt-3 text-sm text-gray-700">
                    {a.applied / a.required < 0.5 ? "Shortage — consider increasing wage or notifying workers." : "Monitor this job."}
                  </div>

                  <div className="mt-3 flex gap-2">
                    <button className="px-3 py-2 bg-orange-600 text-white rounded-md text-sm">View Job</button>
                    <button className="px-3 py-2 bg-white border border-gray-200 rounded-md text-sm">Contact Contractor</button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Category demand chart */}
        <div className="col-span-2 bg-white p-4 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between">
            <h4 className="text-xl font-semibold">High Demand Categories</h4>
            <div className="text-sm text-gray-600">Jobs by category</div>
          </div>

          <div className="mt-4 h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryDemand}>
                <XAxis dataKey="category" />
                <Tooltip />
                <Bar dataKey="count" fill="#2563eb" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            {categoryDemand.map((c) => (
              <div key={c.category} className="bg-gray-50 p-3 rounded-md flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600">{c.category}</div>
                  <div className="font-semibold">{c.count} jobs</div>
                </div>
                <div className={`w-6 h-6 rounded-full ${CATEGORY_COLORS[c.category]?.split(" ")[0] || "bg-gray-200"}`} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="h-16" />

      <Footer />
    </div>
  );
}
