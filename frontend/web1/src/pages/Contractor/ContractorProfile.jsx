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
    photo: "https://img.freepik.com/premium-photo/builder-engineer-civil-engineer-worker-construction-site-engineer-worker-suit-helmet_265223-112361.jpg",
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
        image: "https://tse1.mm.bing.net/th/id/OIP.xJCZEUXOoJcdTYXayX3fywHaHC?rs=1&pid=ImgDetMain&o=7&rm=3",
      },
      {
        title: "Elite Villa Renovation",
        description:
          "Renovation of premium villa in Juhu, including interior and electrical redesign.",
        image: "https://tse2.mm.bing.net/th/id/OIP.As0TgBNbYib4YJziiiga_QHaF7?rs=1&pid=ImgDetMain&o=7&rm=3",
      },
      {
        title: "Warehouse Electrical Setup",
        description:
          "Complete electrical installation for a 50,000 sq ft warehouse.",
        image: "data:image/webp;base64,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",
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
