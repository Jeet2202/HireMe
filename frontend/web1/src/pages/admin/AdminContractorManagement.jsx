import React, { useState } from "react";
import { motion } from "framer-motion";
import AdminNavbar from "../../components/AdminNavbar";
import Footer from "../../components/footer";

export default function AdminContractorManagement() {
  // =============================
  // Dummy Contractor Data
  // =============================
  const [contractors, setContractors] = useState([
    {
      id: 1,
      company: "Prime Build Co.",
      person: "Rohit Mehta",
      verified: true,
      jobsPosted: 42,
      rating: 4.6,
      location: "Mumbai",
      license: "MH-CONTRACT-2020-4598",
      groundCheck: true,
      statuses: [],
      details: "Large commercial contractor with 40+ employees. Specialized in malls & corporate complexes."
    },
    {
      id: 2,
      company: "UrbanCore Construction",
      person: "Deepak Shah",
      verified: false,
      jobsPosted: 28,
      rating: 4.1,
      location: "Pune",
      license: "MH-URBN-2019-4938",
      groundCheck: false,
      statuses: [],
      details: "Mid-size contractor focusing on residential towers and villa projects."
    },
    {
      id: 3,
      company: "Skyline InfraWorks",
      person: "Aarav Khanna",
      verified: true,
      jobsPosted: 56,
      rating: 4.8,
      location: "Nashik",
      license: "MH-SKY-2021-7343",
      groundCheck: true,
      statuses: ["priority"],
      details: "High-grade infra company handling hospitals, schools, and highway repairs."
    },
    {
      id: 4,
      company: "Elite Home Makers",
      person: "Kunal Deshmukh",
      verified: false,
      jobsPosted: 18,
      rating: 3.8,
      location: "Thane",
      license: "MH-ELITE-2018-1183",
      groundCheck: false,
      statuses: [],
      details: "Premium home interior & renovation contractor."
    }
  ]);

  // Derived Lists
  const [blockedContractors, setBlockedContractors] = useState([]);
  const [suspiciousContractors, setSuspiciousContractors] = useState(
    contractors.filter((c) => c.statuses.includes("suspicious"))
  );
  const [priorityContractors, setPriorityContractors] = useState(
    contractors.filter((c) => c.statuses.includes("priority"))
  );

  const [selectedContractor, setSelectedContractor] = useState(null);

  // Refresh derived tables
  const refreshLists = (updated) => {
    setSuspiciousContractors(updated.filter((c) => c.statuses.includes("suspicious")));
    setPriorityContractors(updated.filter((c) => c.statuses.includes("priority")));
  };

  // Status actions
  const markSuspicious = (id) => {
    const updated = contractors.map((c) =>
      c.id === id && !c.statuses.includes("suspicious")
        ? { ...c, statuses: [...c.statuses, "suspicious"] }
        : c
    );
    setContractors(updated);
    refreshLists(updated);
    setSelectedContractor(null);
  };

  const unmarkSuspicious = (id) => {
    const updated = contractors.map((c) =>
      c.id === id
        ? { ...c, statuses: c.statuses.filter((s) => s !== "suspicious") }
        : c
    );
    setContractors(updated);
    refreshLists(updated);
  };

  const markPriority = (id) => {
    const updated = contractors.map((c) =>
      c.id === id && !c.statuses.includes("priority")
        ? { ...c, statuses: [...c.statuses, "priority"] }
        : c
    );
    setContractors(updated);
    refreshLists(updated);
    setSelectedContractor(null);
  };

  const unmarkPriority = (id) => {
    const updated = contractors.map((c) =>
      c.id === id
        ? { ...c, statuses: c.statuses.filter((s) => s !== "priority") }
        : c
    );
    setContractors(updated);
    refreshLists(updated);
  };

  // Block & Unblock
  const blockContractor = (id) => {
    const target = contractors.find((c) => c.id === id);
    const clean = { ...target, statuses: [] };

    setBlockedContractors((prev) => [clean, ...prev]);
    const remaining = contractors.filter((c) => c.id !== id);

    setContractors(remaining);
    refreshLists(remaining);
    setSelectedContractor(null);
  };

  const unblockContractor = (id) => {
    const target = blockedContractors.find((b) => b.id === id);
    setContractors([target, ...contractors]);
    setBlockedContractors(blockedContractors.filter((b) => b.id !== id));
    refreshLists([target, ...contractors]);
  };

  // Row Highlight Colors
  const rowStyle = (c) => {
    if (c.statuses.includes("suspicious")) return "bg-yellow-50";
    if (c.statuses.includes("priority")) return "bg-blue-50";
    return "";
  };

  // Badges next to contractor name
  const renderBadges = (c) => (
    <div className="flex items-center gap-2">
      <span className="font-medium">{c.person}</span>

      {c.statuses.includes("suspicious") && (
        <span className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full">
          Suspicious
        </span>
      )}

      {c.statuses.includes("priority") && (
        <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
          Priority
        </span>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />

      {/* Page header */}
      <div className="px-10 mt-6">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-4xl font-semibold text-gray-900"
        >
          Contractor Management
        </motion.h2>
        <p className="text-gray-600 mt-1">
          Manage contractors, review KYC, ground checks, and moderation actions.
        </p>
      </div>

      {/* ---------------- MAIN TABLE ---------------- */}
      <div className="px-10 mt-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white p-6 rounded-2xl shadow-lg"
        >
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">Contractor List</h3>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-3">Company</th>
                  <th className="p-3">Contact Person</th>
                  <th className="p-3">Verified</th>
                  <th className="p-3">Jobs Posted</th>
                  <th className="p-3">Rating</th>
                  <th className="p-3">Location</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {contractors.map((c) => (
                  <motion.tr
                    key={c.id}
                    className={`${rowStyle(c)} border-b`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <td className="p-3">{c.company}</td>

                    <td className="p-3">{renderBadges(c)}</td>

                    <td className="p-3">
                      {c.verified ? (
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                          Yes
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                          Pending
                        </span>
                      )}
                    </td>

                    <td className="p-3">{c.jobsPosted}</td>
                    <td className="p-3">{c.rating} ⭐</td>
                    <td className="p-3">{c.location}</td>

                    <td className="p-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedContractor(c)}
                          className="px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm"
                        >
                          View
                        </button>

                        {!c.statuses.includes("priority") && (
                          <button
                            onClick={() => markPriority(c.id)}
                            className="px-3 py-2 bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 text-sm"
                          >
                            ★
                          </button>
                        )}

                        {!c.statuses.includes("suspicious") && (
                          <button
                            onClick={() => markSuspicious(c.id)}
                            className="px-3 py-2 bg-yellow-100 text-yellow-800 rounded-md hover:bg-yellow-200 text-sm"
                          >
                            !
                          </button>
                        )}

                        <button
                          onClick={() => blockContractor(c.id)}
                          className="px-3 py-2 bg-red-100 text-red-800 rounded-md hover:bg-red-200 text-sm"
                        >
                          ⛔
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* ---------------- BLOCKED CONTRACTORS ---------------- */}
      <div className="px-10 mt-8">
        <h3 className="text-2xl font-semibold text-red-700">
          Blocked Contractors ({blockedContractors.length})
        </h3>

        {blockedContractors.length === 0 ? (
          <div className="mt-4 bg-red-50 text-red-700 p-6 rounded-xl shadow">
            No blocked contractors
          </div>
        ) : (
          <div className="bg-white mt-4 p-4 rounded-2xl shadow">
            <table className="w-full">
              <thead>
                <tr className="bg-red-50 text-left">
                  <th className="p-3">Company</th>
                  <th className="p-3">Person</th>
                  <th className="p-3">Rating</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {blockedContractors.map((b) => (
                  <tr key={b.id} className="border-b bg-red-50">
                    <td className="p-3 text-red-800 font-semibold">{b.company}</td>
                    <td className="p-3">{b.person}</td>
                    <td className="p-3">{b.rating} ⭐</td>
                    <td className="p-3">
                      <button
                        onClick={() => unblockContractor(b.id)}
                        className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
                      >
                        Unblock
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ---------------- SUSPICIOUS CONTRACTORS ---------------- */}
      <div className="px-10 mt-8">
        <h3 className="text-2xl font-semibold text-yellow-700">
          Suspicious Contractors ({suspiciousContractors.length})
        </h3>

        {suspiciousContractors.length === 0 ? (
          <div className="mt-4 bg-yellow-50 text-yellow-800 p-6 rounded-xl shadow">
            No suspicious contractors
          </div>
        ) : (
          <div className="bg-white mt-4 p-4 rounded-2xl shadow">
            <table className="w-full">
              <thead>
                <tr className="bg-yellow-50 text-left">
                  <th className="p-3">Company</th>
                  <th className="p-3">Person</th>
                  <th className="p-3">Rating</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {suspiciousContractors.map((s) => (
                  <tr key={s.id} className="border-b">
                    <td className="p-3">{s.company}</td>
                    <td className="p-3">{s.person}</td>
                    <td className="p-3">{s.rating} ⭐</td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => unmarkSuspicious(s.id)}
                          className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
                        >
                          Remove Suspicious
                        </button>
                        <button
                          onClick={() => blockContractor(s.id)}
                          className="px-3 py-2 bg-red-100 text-red-800 rounded-md hover:bg-red-200 text-sm"
                        >
                          Block
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ---------------- PRIORITY CONTRACTORS ---------------- */}
      <div className="px-10 mt-8 mb-20">
        <h3 className="text-2xl font-semibold text-blue-700">
          Priority Contractors ({priorityContractors.length})
        </h3>

        {priorityContractors.length === 0 ? (
          <div className="mt-4 bg-blue-50 text-blue-800 p-6 rounded-xl shadow">
            No priority contractors
          </div>
        ) : (
          <div className="bg-white mt-4 p-4 rounded-2xl shadow">
            <table className="w-full">
              <thead>
                <tr className="bg-blue-50 text-left">
                  <th className="p-3">Company</th>
                  <th className="p-3">Person</th>
                  <th className="p-3">Rating</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {priorityContractors.map((p) => (
                  <tr key={p.id} className="border-b">
                    <td className="p-3 text-blue-900 font-semibold">{p.company}</td>
                    <td className="p-3">{p.person}</td>
                    <td className="p-3">{p.rating} ⭐</td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => unmarkPriority(p.id)}
                          className="px-3 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 text-sm"
                        >
                          Remove Priority
                        </button>
                        <button
                          onClick={() => blockContractor(p.id)}
                          className="px-3 py-2 bg-red-100 text-red-800 rounded-md hover:bg-red-200 text-sm"
                        >
                          Block
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ---------------- MODAL VIEW ---------------- */}
      {selectedContractor && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl"
          >
            <h3 className="text-3xl font-semibold">{selectedContractor.company}</h3>
            <p className="text-gray-600">{selectedContractor.person}</p>

            <div className="mt-4 bg-gray-50 p-4 rounded-xl">
              <p><strong>License:</strong> {selectedContractor.license}</p>
              <p><strong>Jobs Posted:</strong> {selectedContractor.jobsPosted}</p>
              <p><strong>Ground Check:</strong> {selectedContractor.groundCheck ? "Completed" : "Pending"}</p>
              <p className="mt-2"><strong>Details:</strong> {selectedContractor.details}</p>
            </div>

            <div className="flex gap-3 mt-6">
              {!selectedContractor.statuses.includes("priority") && (
                <button
                  onClick={() => markPriority(selectedContractor.id)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Mark Priority
                </button>
              )}

              {!selectedContractor.statuses.includes("suspicious") && (
                <button
                  onClick={() => markSuspicious(selectedContractor.id)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                >
                  Mark Suspicious
                </button>
              )}

              <button
                onClick={() => blockContractor(selectedContractor.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Block Contractor
              </button>

              <button
                onClick={() => setSelectedContractor(null)}
                className="ml-auto px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      <Footer />
    </div>
  );
}
