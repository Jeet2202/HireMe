import React, { useState } from "react";
import { motion } from "framer-motion";
import AdminNavbar from "../../components/AdminNavbar";
import Footer from "../../components/footer";

/**
 * AdminWorkerManagement.jsx
 * - Row highlight (subtle pastel)
 * - Badges next to name (Suspicious / Priority)
 * - Block removes from main table -> blocked table
 * - Undo ops available for each special table
 */

export default function AdminWorkerManagement() {
  // initial workers (dummy)
  const [workers, setWorkers] = useState([
    { id: 1, name: "Suresh Kumar", category: "Mason", skill: "Expert", verified: true, rating: 4.7, location: "Mumbai", aadhaar: "XXXX-XXXX-1234", skillScore: 92, pastJobs: 18, feedback: ["Highly skilled mason.", "Very disciplined."], statuses: [] },
    { id: 2, name: "Ramesh Das", category: "Carpenter", skill: "Intermediate", verified: false, rating: 3.9, location: "Pune", aadhaar: "XXXX-XXXX-5678", skillScore: 78, pastJobs: 12, feedback: ["Good worker"], statuses: [] },
    { id: 3, name: "Amit Sharma", category: "Electrician", skill: "Skilled", verified: true, rating: 4.4, location: "Nashik", aadhaar: "XXXX-XXXX-9988", skillScore: 85, pastJobs: 22, feedback: ["Strong technical knowledge"], statuses: [] },
    { id: 4, name: "Vijay Patil", category: "Painter", skill: "Beginner", verified: false, rating: 3.2, location: "Thane", aadhaar: "XXXX-XXXX-3322", skillScore: 60, pastJobs: 5, feedback: ["Needs more experience"], statuses: [] },
    { id: 5, name: "Harish Rawat", category: "Helper", skill: "Semi-Skilled", verified: true, rating: 4.1, location: "Mumbai", aadhaar: "XXXX-XXXX-7623", skillScore: 74, pastJobs: 15, feedback: ["Hardworking"], statuses: [] },
    { id: 6, name: "Karan Verma", category: "Mason", skill: "Skilled", verified: true, rating: 4.3, location: "Pune", aadhaar: "XXXX-XXXX-4477", skillScore: 83, pastJobs: 19, feedback: ["Quality finishing work."], statuses: [] },
    { id: 7, name: "Vinod Singh", category: "Welder", skill: "Expert", verified: true, rating: 4.8, location: "Mumbai", aadhaar: "XXXX-XXXX-1122", skillScore: 94, pastJobs: 25, feedback: ["Excellent precision welding."], statuses: ["priority"] },
    { id: 8, name: "Sahil Khan", category: "Plumber", skill: "Skilled", verified: false, rating: 3.8, location: "Navi Mumbai", aadhaar: "XXXX-XXXX-8855", skillScore: 70, pastJobs: 10, feedback: ["Decent but needs improvement."], statuses: [] },
    { id: 9, name: "Rohit Mehra", category: "Electrician", skill: "Expert", verified: true, rating: 4.9, location: "Pune", aadhaar: "XXXX-XXXX-7788", skillScore: 95, pastJobs: 30, feedback: ["Outstanding work!"], statuses: ["priority"] },
    { id: 10, name: "Javed Shaikh", category: "Painter", skill: "Intermediate", verified: false, rating: 3.5, location: "Thane", aadhaar: "XXXX-XXXX-2211", skillScore: 68, pastJobs: 7, feedback: ["Good but slow."], statuses: [] }
  ]);

  // derived lists are maintained for block / suspicious / priority display
  const [blockedWorkers, setBlockedWorkers] = useState([]);
  const [suspiciousWorkers, setSuspiciousWorkers] = useState(
    workers.filter((w) => w.statuses.includes("suspicious"))
  );
  const [priorityWorkers, setPriorityWorkers] = useState(
    workers.filter((w) => w.statuses.includes("priority"))
  );

  // local state for selected worker modal view
  const [selectedWorker, setSelectedWorker] = useState(null);

  // helper: update suspicious/priority lists from current workers state
  const refreshDerivedLists = (currentWorkers) => {
    setSuspiciousWorkers(currentWorkers.filter((w) => w.statuses.includes("suspicious")));
    setPriorityWorkers(currentWorkers.filter((w) => w.statuses.includes("priority")));
  };

  // MARK suspicious: keep worker in main table, add 'suspicious' to statuses if not present,
  // add to suspiciousWorkers list (derived via refresh)
  const markSuspicious = (workerId) => {
    const updated = workers.map((w) =>
      w.id === workerId && !w.statuses.includes("suspicious") ? { ...w, statuses: [...w.statuses, "suspicious"] } : w
    );
    setWorkers(updated);
    refreshDerivedLists(updated);
    setSelectedWorker(null);
  };

  // UNMARK suspicious
  const unmarkSuspicious = (workerId) => {
    const updated = workers.map((w) =>
      w.id === workerId ? { ...w, statuses: w.statuses.filter((s) => s !== "suspicious") } : w
    );
    setWorkers(updated);
    refreshDerivedLists(updated);
  };

  // MARK priority
  const markPriority = (workerId) => {
    const updated = workers.map((w) =>
      w.id === workerId && !w.statuses.includes("priority") ? { ...w, statuses: [...w.statuses, "priority"] } : w
    );
    setWorkers(updated);
    refreshDerivedLists(updated);
    setSelectedWorker(null);
  };

  // UNMARK priority
  const unmarkPriority = (workerId) => {
    const updated = workers.map((w) =>
      w.id === workerId ? { ...w, statuses: w.statuses.filter((s) => s !== "priority") } : w
    );
    setWorkers(updated);
    refreshDerivedLists(updated);
  };

  // BLOCK worker: remove from workers list and add to blockedWorkers array
  const blockWorker = (workerId) => {
    const toBlock = workers.find((w) => w.id === workerId);
    if (!toBlock) return;
    // remove suspicious/priority statuses when blocked (optional)
    const clean = { ...toBlock, statuses: [] };
    setBlockedWorkers((prev) => [clean, ...prev]);
    const remaining = workers.filter((w) => w.id !== workerId);
    setWorkers(remaining);
    refreshDerivedLists(remaining);
    setSelectedWorker(null);
  };

  // UNBLOCK: move worker back to main table (prepend) and remove from blocked list
  const unblockWorker = (workerId) => {
    const toUnblock = blockedWorkers.find((b) => b.id === workerId);
    if (!toUnblock) return;
    // insert back into workers (at top)
    setWorkers((prev) => [toUnblock, ...prev]);
    setBlockedWorkers((prev) => prev.filter((b) => b.id !== workerId));
    refreshDerivedLists([toUnblock, ...workers]);
  };

  // Utility: compute row class based on statuses
  const getRowClass = (w) => {
    // C1 pastel highlights:
    // suspicious -> bg-yellow-50
    // priority   -> bg-blue-50
    // if both, combine with blue first (priority more prominent), but we'll show both badges
    if (w.statuses.includes("suspicious")) return "bg-yellow-50";
    if (w.statuses.includes("priority")) return "bg-blue-50";
    return "";
  };

  // Utility: show badges next to name
  const renderBadges = (w) => {
    return (
      <div className="flex items-center gap-2">
        <span className="font-medium">{w.name}</span>
        <div className="flex items-center gap-2">
          {w.statuses.includes("suspicious") && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800">Suspicious</span>
          )}
          {w.statuses.includes("priority") && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">Priority</span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />

      {/* Header */}
      <div className="px-10 mt-6">
        <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-4xl font-semibold text-gray-900">
          Worker Management
        </motion.h2>
        <p className="text-gray-600">Review workers, mark suspicious, prioritize, or block.</p>
      </div>

      {/* Main worker table */}
      <div className="px-10 mt-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">Worker List</h3>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-3">Name</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Skill Level</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Rating</th>
                  <th className="p-3">Location</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {workers.length === 0 && (
                  <tr>
                    <td colSpan={7} className="p-6 text-center text-gray-500">
                      No workers in the main list.
                    </td>
                  </tr>
                )}

                {workers.map((w) => (
                  <motion.tr
                    key={w.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`${getRowClass(w)} border-b`}
                  >
                    <td className="p-3 align-middle">
                      {renderBadges(w)}
                    </td>

                    <td className="p-3 align-middle">{w.category}</td>
                    <td className="p-3 align-middle">
                      <span className="text-blue-600 font-semibold">{w.skill}</span>
                    </td>

                    <td className="p-3 align-middle">
                      {w.verified ? (
                        <span className="text-sm px-2 py-1 bg-green-100 text-green-700 rounded-full">Verified</span>
                      ) : (
                        <span className="text-sm px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">Pending</span>
                      )}
                    </td>

                    <td className="p-3 align-middle">{w.rating} ⭐</td>
                    <td className="p-3 align-middle">{w.location}</td>

                    <td className="p-3 align-middle">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedWorker(w)}
                          className="px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition text-sm"
                        >
                          View
                        </button>

                        {/* quick small controls inline */}
                        {!w.statuses.includes("priority") && (
                          <button
                            onClick={() => markPriority(w.id)}
                            className="px-3 py-2 bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 transition text-sm"
                            title="Mark Priority"
                          >
                            ★
                          </button>
                        )}

                        {!w.statuses.includes("suspicious") && (
                          <button
                            onClick={() => markSuspicious(w.id)}
                            className="px-3 py-2 bg-yellow-100 text-yellow-800 rounded-md hover:bg-yellow-200 transition text-sm"
                            title="Mark Suspicious"
                          >
                            !
                          </button>
                        )}

                        <button
                          onClick={() => blockWorker(w.id)}
                          className="px-3 py-2 bg-red-100 text-red-800 rounded-md hover:bg-red-200 transition text-sm"
                          title="Block Worker"
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

      {/* Blocked Workers */}
      <div className="px-10 mt-8">
        <motion.h3 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-2xl font-semibold text-red-700">
          Blocked Workers ({blockedWorkers.length})
        </motion.h3>

        {blockedWorkers.length === 0 ? (
          <div className="mt-4 bg-red-50 text-red-700 p-6 rounded-xl shadow">
            <div className="text-lg font-medium">No blocked workers</div>
            <div className="text-sm text-gray-600 mt-1">Blocked workers will appear here when actioned.</div>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white mt-4 p-4 rounded-2xl shadow">
            <table className="w-full">
              <thead>
                <tr className="bg-red-50 text-left">
                  <th className="p-3">Name</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Rating</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {blockedWorkers.map((b) => (
                  <tr key={b.id} className="border-b bg-red-50">
                    <td className="p-3 font-medium text-red-800">{b.name}</td>
                    <td className="p-3">{b.category}</td>
                    <td className="p-3">{b.rating} ⭐</td>
                    <td className="p-3">
                      <button
                        onClick={() => unblockWorker(b.id)}
                        className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition text-sm"
                      >
                        Unblock
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </div>

      {/* Suspicious Workers */}
      <div className="px-10 mt-8">
        <motion.h3 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-2xl font-semibold text-yellow-700">
          Suspicious Workers ({suspiciousWorkers.length})
        </motion.h3>

        {suspiciousWorkers.length === 0 ? (
          <div className="mt-4 bg-yellow-50 text-yellow-800 p-6 rounded-xl shadow">
            <div className="text-lg font-medium">No suspicious workers</div>
            <div className="text-sm text-gray-600 mt-1">Workers marked suspicious will appear here.</div>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white mt-4 p-4 rounded-2xl shadow">
            <table className="w-full">
              <thead>
                <tr className="bg-yellow-50 text-left">
                  <th className="p-3">Name</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Rating</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {suspiciousWorkers.map((s) => (
                  <tr key={s.id} className="border-b">
                    <td className="p-3">{s.name}</td>
                    <td className="p-3">{s.category}</td>
                    <td className="p-3">{s.rating} ⭐</td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => unmarkSuspicious(s.id)}
                          className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition text-sm"
                        >
                          Remove Suspicious
                        </button>
                        <button
                          onClick={() => blockWorker(s.id)}
                          className="px-3 py-2 bg-red-100 text-red-800 rounded-md hover:bg-red-200 transition text-sm"
                        >
                          Block
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </div>

      {/* Priority Workers */}
      <div className="px-10 mt-8 mb-20">
        <motion.h3 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-2xl font-semibold text-blue-700">
          Priority Workers ({priorityWorkers.length})
        </motion.h3>

        {priorityWorkers.length === 0 ? (
          <div className="mt-4 bg-blue-50 text-blue-800 p-6 rounded-xl shadow">
            <div className="text-lg font-medium">No priority workers</div>
            <div className="text-sm text-gray-600 mt-1">Workers marked priority will appear here.</div>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white mt-4 p-4 rounded-2xl shadow">
            <table className="w-full">
              <thead>
                <tr className="bg-blue-50 text-left">
                  <th className="p-3">Name</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Rating</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {priorityWorkers.map((p) => (
                  <tr key={p.id} className="border-b">
                    <td className="p-3 text-blue-800 font-medium">{p.name}</td>
                    <td className="p-3">{p.category}</td>
                    <td className="p-3">{p.rating} ⭐</td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => unmarkPriority(p.id)}
                          className="px-3 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition text-sm"
                        >
                          Remove Priority
                        </button>

                        <button
                          onClick={() => blockWorker(p.id)}
                          className="px-3 py-2 bg-red-100 text-red-800 rounded-md hover:bg-red-200 transition text-sm"
                        >
                          Block
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </div>

      {/* Worker Detail Modal */}
      {selectedWorker && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-white w-full max-w-2xl rounded-2xl p-6 shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-semibold">{selectedWorker.name}</h3>
                <p className="text-sm text-gray-600">{selectedWorker.category} • {selectedWorker.location}</p>
              </div>
              <div className="flex gap-2">
                {selectedWorker.statuses.includes("priority") && <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-sm">Priority</span>}
                {selectedWorker.statuses.includes("suspicious") && <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm">Suspicious</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p><strong>Aadhaar:</strong> {selectedWorker.aadhaar}</p>
                <p className="mt-2"><strong>Skill Test Score:</strong> {selectedWorker.skillScore}%</p>
                <p className="mt-2"><strong>Past Jobs:</strong> {selectedWorker.pastJobs}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p><strong>Rating:</strong> {selectedWorker.rating} ⭐</p>
                <p className="mt-2"><strong>Verified:</strong> {selectedWorker.verified ? "Yes" : "No"}</p>

                <div className="mt-3">
                  <strong>Contractor Feedback</strong>
                  <ul className="list-disc ml-5 mt-2 text-gray-700">
                    {selectedWorker.feedback.map((f, i) => <li key={i}>{f}</li>)}
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              {!selectedWorker.statuses.includes("priority") && (
                <button onClick={() => markPriority(selectedWorker.id)} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">Mark Priority</button>
              )}
              {!selectedWorker.statuses.includes("suspicious") && (
                <button onClick={() => markSuspicious(selectedWorker.id)} className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition">Mark Suspicious</button>
              )}
              <button onClick={() => blockWorker(selectedWorker.id)} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition">Block Worker</button>

              <button onClick={() => setSelectedWorker(null)} className="ml-auto px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition">Close</button>
            </div>
          </motion.div>
        </motion.div>
      )}

      <Footer />
    </div>
  );
}
