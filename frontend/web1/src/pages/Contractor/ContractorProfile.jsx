import React from "react";
import Footer from "../../components/footer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function ContractorProfile() {
  const contractor = {
    name: "Rohit Mehta",
    age: 38,
    experience: "12+ Years",
    specialization: "Commercial & Residential Construction",
    photo: "https://i.imgur.com/0y8Ftya.png",
    company: {
      name: "Prime Build Co.",
      since: "2016",
      employees: 48,
      licenseId: "MH-CONTRACT-2020-4598",
      gst: "27ABCDE1234F1Z5",
      address: "CyberTech Park, Andheri East, Mumbai",
    },
    skills: [
      "Masonry",
      "Carpentry",
      "Electrical Work",
      "Site Management",
      "Blueprint Reading",
    ],
    projects: [
      {
        title: "Sunrise Mall Construction",
        description:
          "Full construction of a commercial shopping complex with 30+ outlets.",
        image: "https://i.imgur.com/yVQ0JcU.jpeg",
      },
      {
        title: "Elite Villa Renovation",
        description:
          "Renovation of premium villa in Juhu, including interior and electrical redesign.",
        image: "https://i.imgur.com/J4rKQAs.jpeg",
      },
      {
        title: "Warehouse Electrical Setup",
        description:
          "Complete electrical installation for a 50,000 sq ft warehouse.",
        image: "https://i.imgur.com/lZ1mVRw.jpeg",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#f4f6f8]">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-4 bg-white shadow-md">
        <h1 className="text-3xl font-extrabold text-blue-600">HireMe</h1>

        <ul className="flex space-x-10 text-lg font-medium">
          <li className="hover:text-blue-600 cursor-pointer">
            <Link to="/contractor-dashboard">Dashboard</Link>
          </li>
          <li className="hover:text-blue-600 cursor-pointer">
            <Link to="/contractor/verification">Verification</Link>
          </li>
          <li className="hover:text-blue-600 cursor-pointer">
            <Link to="/contractor/find-labourers">Find Labourers</Link>
          </li>
          <li className="hover:text-blue-600 cursor-pointer">
            <Link to="/contractor/profile">Profile</Link>
          </li>
        </ul>
      </nav>

      {/* Header */}
      <div className="px-10 mt-6">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-semibold text-gray-900"
        >
          Contractor Profile
        </motion.h2>
        <p className="text-gray-600 mt-1">
          View your profile, company details, and work history.
        </p>
      </div>

      {/* GRID */}
      <div className="px-10 mt-8 grid grid-cols-1 xl:grid-cols-3 gap-10">

        {/* LEFT CARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-2xl shadow-lg p-6 transition hover:-translate-y-1 hover:shadow-xl"
        >
          <div className="flex flex-col items-center">
            <img
              src={contractor.photo}
              alt="contractor"
              className="w-36 h-36 rounded-full border shadow-md"
            />
            <h2 className="text-2xl font-bold mt-4">{contractor.name}</h2>
            <p className="text-gray-500">{contractor.specialization}</p>
          </div>

          <div className="mt-6 space-y-2 text-gray-700">
            <p>
              <strong>Age:</strong> {contractor.age}
            </p>
            <p>
              <strong>Experience:</strong> {contractor.experience}
            </p>
            <p>
              <strong>Primary Skills:</strong>
            </p>

            <ul className="mt-2 flex flex-wrap gap-2">
              {contractor.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* MIDDLE — COMPANY INFO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-2xl shadow-lg p-6 transition hover:-translate-y-1 hover:shadow-xl"
        >
          <h3 className="text-2xl font-semibold text-gray-800">
            Company Details
          </h3>

          <div className="mt-4 space-y-2 text-gray-700">
            <p>
              <strong>Name:</strong> {contractor.company.name}
            </p>
            <p>
              <strong>Operating Since:</strong> {contractor.company.since}
            </p>
            <p>
              <strong>Employees:</strong> {contractor.company.employees}
            </p>
            <p>
              <strong>License ID:</strong> {contractor.company.licenseId}
            </p>
            <p>
              <strong>GST:</strong> {contractor.company.gst}
            </p>
            <p>
              <strong>Office Address:</strong> {contractor.company.address}
            </p>
          </div>

          <div className="mt-6">
            <h4 className="text-xl font-semibold text-gray-800 mb-2">
              Identity Proof
            </h4>
            <p className="text-gray-600">• Aadhaar Verified</p>
            <p className="text-gray-600">• PAN Verified</p>
            <p className="text-gray-600">• Company Certificate Verified</p>
          </div>
        </motion.div>

        {/* RIGHT — CONTACT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-2xl shadow-lg p-6 transition hover:-translate-y-1 hover:shadow-xl"
        >
          <h3 className="text-2xl font-semibold text-gray-800">
            Contact Information
          </h3>

          <div className="mt-4 text-gray-700 space-y-2">
            <p>
              <strong>Phone:</strong> +91 98234 56789
            </p>
            <p>
              <strong>Email:</strong> rohit.mehta@primebuild.in
            </p>
            <p>
              <strong>Office Hours:</strong> Mon – Sat, 9 AM – 7 PM
            </p>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800">
              Performance Overview
            </h3>
            <ul className="mt-3 text-gray-700 space-y-1">
              <li>✔ 120+ Completed Projects</li>
              <li>✔ 4.6 Star Contractor Rating</li>
              <li>✔ 95% Client Satisfaction</li>
              <li>✔ Expertise: Masonry & Electrical Works</li>
            </ul>
          </div>
        </motion.div>
      </div>

      {/* PROJECTS SECTION */}
      <div className="px-10 mt-12">
        <h2 className="text-3xl font-bold text-gray-900">Past Projects</h2>
        <p className="text-gray-600">
          A showcase of recent work completed successfully.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-6">
          {contractor.projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ scale: 1.03 }}
              className="bg-white p-4 rounded-2xl shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover rounded-lg"
              />

              <h3 className="text-xl font-semibold mt-4">{project.title}</h3>
              <p className="text-gray-600 mt-2">{project.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
