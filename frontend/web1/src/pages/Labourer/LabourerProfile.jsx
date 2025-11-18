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
    photo: "data:image/webp;base64,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",
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
        image: "https://th.bing.com/th/id/OIP.9mVCS9y4xCOxEbjqrKF6BQHaD4?w=294&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
        tags: ["Team Lead", "Finishing Work", "Precision Masonry"],
      },
      {
        role: "Mason Helper - RMC Developers",
        duration: "2019 - 2021",
        desc: "Assisted senior masons, supported slab work, prepared materials, and worked on multi-floor projects.",
        image: "https://th.bing.com/th/id/OIP.4kfQxGarlzvdvM4F_6Fx4gHaEK?w=331&h=186&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
        tags: ["Slab Work", "Material Prep"],
      },
      {
        role: "Construction Labour - Local Contracts",
        duration: "2017 - 2019",
        desc: "Worked on small-scale construction projects doing basic masonry, site preparation and repairs.",
        image: "https://tse1.mm.bing.net/th/id/OIP.EknU9CJDOFKusbZcoXO9tAHaEJ?rs=1&pid=ImgDetMain&o=7&rm=3",
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
