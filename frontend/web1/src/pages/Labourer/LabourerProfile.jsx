import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BottomNavbar from "../../components/BottomNavbar";
import Footer from "../../components/footer";

export default function LabourerProfile() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // ===== Dummy Labour Data =====
  const labour = {
    name: "Amit Sharma",
    age: 28,
    gender: "Male",
    photo: "https://i.imgur.com/eMa2QfD.jpeg",
    category: "Mason / Construction Worker",
    experience: "6+ Years",
    about:
      "A skilled masonry and construction worker with strong finishing work expertise. Known for reliability, precision, and delivering high-quality work on time.",
    location: "Pune, Maharashtra",
    address: "House No. 42, Shanti Nagar, Market Road, Pune - 411001",
    phone: "+91 98765 43210",
    languages: ["Hindi", "Marathi", "Basic English"],
    tools: ["Trowel", "Hammer", "Concrete Mixer", "Spirit Level", "Safety Gear"],
    skills: ["Brick Laying", "Plastering", "Shuttering", "Slab Work", "Safety Trained"],
    rating: 4.7,
    completedJobs: 85,
    punctuality: "96%",
    strengths: ["Team Player", "Time Management", "Quality Finishing", "Hardworking"],
    
    experienceTimeline: [
      {
        role: "Senior Mason - ABC Constructions",
        duration: "2021 - Present",
        desc: "Handled masonry, tile laying, structural finishing work, and supervised a team of 10+ workers.",
        image: "https://i.imgur.com/VPKt2LJ.jpeg",
        tags: ["Team Lead", "Finishing Work", "Precision Masonry"],
      },
      {
        role: "Mason Helper - RMC Developers",
        duration: "2019 - 2021",
        desc: "Assisted senior masons, supported slab work, prepared materials, and worked on multi-floor projects.",
        image: "https://i.imgur.com/jXLVaNT.jpeg",
        tags: ["Slab Work", "Material Prep"],
      },
      {
        role: "Construction Labour - Local Contracts",
        duration: "2017 - 2019",
        desc: "Worked on small-scale construction projects doing basic masonry, site preparation and repairs.",
        image: "https://i.imgur.com/J4rKQAs.jpeg",
        tags: ["Site Support", "General Labour"],
      },
    ]
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-28">



      {/* NAVBAR */}
      <BottomNavbar></BottomNavbar>
      
      {/* HEADER CARD */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white max-w-5xl mx-auto rounded-2xl shadow-xl p-8 flex flex-col md:flex-row gap-8"
      >
        <img
          src={labour.photo}
          alt="profile"
          className="w-44 h-44 rounded-full shadow-lg border object-cover"
        />

        <div>
          <h1 className="text-4xl font-bold">{labour.name}</h1>
          <p className="text-gray-600 text-lg">{labour.category}</p>

          <div className="flex gap-3 mt-3">
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">✔ UIDAI Verified</span>
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">⭐ {labour.rating} Rating</span>
          </div>

          <p className="text-gray-700 mt-4 leading-relaxed max-w-xl">{labour.about}</p>
        </div>
      </motion.div>

      {/* GRID — Two Cards */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">

        {/* PERSONAL DETAILS */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition"
        >
          <h2 className="text-2xl font-semibold mb-4">Personal Details</h2>

          <div className="space-y-1 text-gray-700">
            <p><strong>Age:</strong> {labour.age}</p>
            <p><strong>Gender:</strong> {labour.gender}</p>
            <p><strong>Experience:</strong> {labour.experience}</p>
            <p><strong>Languages:</strong> {labour.languages.join(", ")}</p>
          </div>

          <h3 className="text-xl font-semibold mt-5">Contact</h3>
          <p className="text-gray-700">{labour.phone}</p>

          <h3 className="text-xl font-semibold mt-5">Location</h3>
          <p className="text-gray-700">{labour.location}</p>
          <p className="text-gray-500 text-sm">{labour.address}</p>

          <h3 className="text-xl font-semibold mt-5">Performance</h3>
          <p><strong>Completed Jobs:</strong> {labour.completedJobs}</p>
          <p><strong>Punctuality:</strong> {labour.punctuality}</p>

          <h3 className="text-xl font-semibold mt-5">Strengths</h3>
          <ul className="list-disc pl-6 text-gray-700 mt-2">
            {labour.strengths.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </motion.div>

        {/* SKILLS & TOOLS */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition"
        >
          <h2 className="text-2xl font-semibold mb-4">Skills & Tools</h2>

          <h3 className="text-lg font-semibold">Skills</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {labour.skills.map((skill, idx) => (
              <span key={idx} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>

          <h3 className="text-lg font-semibold mt-6">Tools Used</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {labour.tools.map((tool, idx) => (
              <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                {tool}
              </span>
            ))}
          </div>

          <h3 className="text-lg font-semibold mt-6">Specializations</h3>
          <ul className="list-disc pl-6 text-gray-700 mt-2">
            <li>Wall Plastering</li>
            <li>Tile Laying</li>
            <li>Foundation Work</li>
            <li>Safety Compliant</li>
          </ul>
        </motion.div>
      </div>

      {/* FULL-WIDTH EXPERIENCE SECTION */}
      <div className="max-w-5xl mx-auto mt-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-2xl shadow-lg"
        >
          <h2 className="text-2xl font-semibold mb-5">Past Experience</h2>

          {labour.experienceTimeline.map((exp, index) => (
            <div key={index} className="mb-4">
              
              {/* Accordion Button */}
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex justify-between items-center bg-gray-100 px-5 py-4 rounded-xl text-left hover:bg-gray-200 transition-shadow"
              >
                <div>
                  <div className="text-lg font-semibold text-gray-800">{exp.role}</div>
                  <div className="text-sm text-gray-500">{exp.duration}</div>
                </div>
                <span className="text-2xl font-bold">{openIndex === index ? "−" : "+"}</span>
              </button>

              {/* Accordion Content */}
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.32 }}
                    className="bg-gray-50 p-4 rounded-xl mt-2 shadow-inner"
                  >
                    <div className="flex flex-col md:flex-row gap-5">

                      {/* Left: Image */}
                      <img
                        src={exp.image}
                        alt={exp.role}
                        className="w-full md:w-56 h-40 object-cover rounded-lg shadow-md"
                      />

                      {/* Right: Text */}
                      <div>
                        <p className="text-gray-700 leading-relaxed">{exp.desc}</p>

                        {exp.tags && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {exp.tags.map((tag, i) => (
                              <span key={i} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>
      </div>
      {/* Footer */}
      <Footer></Footer>

    </div>
  );
}
