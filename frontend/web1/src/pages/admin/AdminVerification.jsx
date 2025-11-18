import React, { useState } from "react";
import { motion } from "framer-motion";
import AdminNavbar from "../../components/AdminNavbar";
import Footer from "../../components/footer";

export default function AdminVerification() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedXML, setSelectedXML] = useState(null);
  const [message, setMessage] = useState("");

  // 10 Dummy verification requests
  const [pendingVerifications, setPendingVerifications] = useState([
    { id: 1, name: "Rohit Mehta", type: "Contractor", xmlFile: "aadhaar_rohit.xml", submitted: "2025-01-10 14:32" },
    { id: 2, name: "Suresh Kumar", type: "Worker", xmlFile: "aadhaar_suresh.xml", submitted: "2025-01-11 09:20" },
    { id: 3, name: "Amit Sharma", type: "Worker", xmlFile: "aadhaar_amit.xml", submitted: "2025-01-12 16:48" },
    { id: 4, name: "Global Build Co.", type: "Contractor", xmlFile: "aadhaar_globalbuild.xml", submitted: "2025-01-13 11:15" },
    { id: 5, name: "Vinod Singh", type: "Worker", xmlFile: "aadhaar_vinod.xml", submitted: "2025-01-14 10:12" },
    { id: 6, name: "Modern Infra Ltd", type: "Contractor", xmlFile: "aadhaar_moderninfra.xml", submitted: "2025-01-15 14:05" },
    { id: 7, name: "Ramesh Das", type: "Worker", xmlFile: "aadhaar_ramesh.xml", submitted: "2025-01-16 08:50" },
    { id: 8, name: "Karan Verma", type: "Worker", xmlFile: "aadhaar_karan.xml", submitted: "2025-01-17 17:40" },
    { id: 9, name: "Future Build Co.", type: "Contractor", xmlFile: "aadhaar_futurebuild.xml", submitted: "2025-01-18 12:22" },
    { id: 10, name: "Harish Rawat", type: "Worker", xmlFile: "aadhaar_harish.xml", submitted: "2025-01-18 19:30" }
  ]);

  // Handle Approve / Reject
  const handleStatus = (id, type) => {
    setPendingVerifications(prev => prev.filter(user => user.id !== id));

    setMessage(type === "approve" ? "Verification Approved ✔" : "Verification Rejected ❌");

    setTimeout(() => setMessage(""), 2500);
  };

  // Dummy XML Content
  const dummyXML = `
  <AadhaarData>
      <Name>Dummy Aadhaar User</Name>
      <DOB>1991-05-21</DOB>
      <Gender>M</Gender>
      <MaskedAadhaar>XXXX-XXXX-1234</MaskedAadhaar>
      <Address>
          <Street>MG Road</Street>
          <City>Mumbai</City>
          <State>Maharashtra</State>
          <Pincode>400001</Pincode>
      </Address>
  </AadhaarData>
  `;

  return (
    <div className="min-h-screen bg-gray-100">

      <AdminNavbar />

      {/* Success/Reject Message */}
      {message && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`mx-10 mt-6 p-4 rounded-xl text-white text-center font-medium ${
            message.includes("Approved") ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {message}
        </motion.div>
      )}

      {/* HEADER */}
      <div className="px-10 mt-6">
        <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-4xl font-semibold text-gray-900">
          Verification Center
        </motion.h2>
        <p className="text-gray-600">Approve or reject labourer and contractor identity verifications.</p>
      </div>

      {/* TABLE */}
      <div className="px-10 mt-10">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white shadow-lg rounded-2xl p-6">

          <h3 className="text-2xl font-semibold mb-6 text-gray-800">Pending Verifications</h3>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-4">Name</th>
                  <th className="p-4">User Type</th>
                  <th className="p-4">Aadhaar XML</th>
                  <th className="p-4">Submitted At</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {pendingVerifications.map(user => (
                  <motion.tr
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-b hover:bg-gray-100 transition"
                 >

                    <td className="p-4 font-medium text-gray-800">{user.name}</td>
                    <td className="p-4 text-gray-600">{user.type}</td>

                    <td className="p-4">
                      <button onClick={() => setSelectedXML(dummyXML)} className="text-blue-600 hover:underline">
                        {user.xmlFile}
                      </button>
                    </td>

                    <td className="p-4 text-gray-600">{user.submitted}</td>

                    <td className="p-4 flex gap-3">
                      <button onClick={() => setSelectedUser(user)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition">View</button>
                      <button onClick={() => handleStatus(user.id, "approve")} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">Approve</button>
                      <button onClick={() => handleStatus(user.id, "reject")} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">Reject</button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* VIEW DETAILS MODAL */}
      {selectedUser && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
          <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Verification Details</h3>

            <p><strong>Name:</strong> {selectedUser.name}</p>
            <p><strong>User Type:</strong> {selectedUser.type}</p>
            <p><strong>XML File:</strong> {selectedUser.xmlFile}</p>
            <p><strong>Submitted At:</strong> {selectedUser.submitted}</p>

            <button onClick={() => setSelectedUser(null)} className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition">
              Close
            </button>
          </motion.div>
        </motion.div>
      )}

      {/* XML VIEW MODAL */}
      {selectedXML && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
          <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-2xl">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Aadhaar XML Preview</h3>

            <pre className="bg-gray-100 p-4 rounded-xl text-gray-700 text-sm overflow-auto max-h-96">
              {selectedXML}
            </pre>

            <button onClick={() => setSelectedXML(null)} className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition">
              Close
            </button>
          </motion.div>
        </motion.div>
      )}

      <Footer />
    </div>
  );
}
