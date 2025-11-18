import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiTool,
  FiUsers,
  FiCalendar,
  FiClock,
  FiChevronRight,
} from "react-icons/fi";

export default function SearchFilters({ initialFilters, onFind }) {
  const [f, setF] = useState(initialFilters);

  const categories = [
    { name: "Mason", color: "from-blue-500 to-indigo-500" },
    { name: "Carpenter", color: "from-green-500 to-emerald-500" },
    { name: "Plumber", color: "from-purple-500 to-pink-500" },
    { name: "Electrician", color: "from-orange-500 to-yellow-500" },
    { name: "Helper", color: "from-gray-500 to-gray-700" },
  ];

  const skillLevels = ["Beginner", "Intermediate", "Expert"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/70 backdrop-blur-xl shadow-xl rounded-3xl p-6 border border-white/60 relative overflow-hidden"
    >
      {/* Soft Gradient Glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-100 via-white to-purple-100 opacity-40"></div>

      <h1 className="text-2xl font-bold text-gray-800 mb-4">Filters</h1>

      {/* CATEGORY */}
      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-2 flex items-center gap-2">
          <FiTool className="text-blue-500" /> Category
        </p>

        <div className="flex flex-wrap gap-3">
          {categories.map((c) => {
            const active = f.category === c.name.toLowerCase();
            return (
              <motion.button
                key={c.name}
                whileTap={{ scale: 0.95 }}
                onClick={() => setF({ ...f, category: c.name.toLowerCase() })}
                className={`
                  px-4 py-2 rounded-xl font-medium shadow-md border transition-all
                  ${
                    active
                      ? `text-white bg-gradient-to-r ${c.color} border-transparent`
                      : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
                  }
                `}
              >
                {c.name}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* SKILL LEVEL */}
      <div className="mb-8">
        <p className="text-sm text-gray-600 mb-2 flex items-center gap-2">
          <FiUsers className="text-purple-500" /> Skill Level
        </p>

        <div className="grid grid-cols-3 bg-gray-100 rounded-xl p-1 shadow-inner">
          {skillLevels.map((s) => {
            const active = f.skillLevel === s.toLowerCase();
            return (
              <button
                key={s}
                onClick={() => setF({ ...f, skillLevel: s.toLowerCase() })}
                className={`py-2 rounded-lg font-medium transition text-sm
                ${
                  active
                    ? "bg-blue-600 text-white shadow"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>

      {/* SLIDERS */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="p-4 bg-white rounded-2xl shadow-sm border">
          <p className="text-sm text-gray-600 mb-1">
            Workers Needed: <span className="font-bold">{f.workersNeeded}</span>
          </p>

          <input
            type="range"
            min={1}
            max={20}
            value={f.workersNeeded}
            onChange={(e) => setF({ ...f, workersNeeded: e.target.value })}
            className="w-full accent-blue-600 cursor-pointer"
          />
        </div>

        <div className="p-4 bg-white rounded-2xl shadow-sm border">
          <p className="text-sm text-gray-600 mb-1">
            Min Payment: <span className="font-bold">₹{f.payment}</span>
          </p>

          <input
            type="range"
            min={300}
            max={2000}
            step={50}
            value={f.payment}
            onChange={(e) => setF({ ...f, payment: e.target.value })}
            className="w-full accent-blue-600 cursor-pointer"
          />
        </div>
      </div>

      {/* DATE + TIME */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="p-4 bg-white/90 rounded-2xl shadow-sm border">
          <p className="text-sm text-gray-600 flex items-center gap-2">
            <FiCalendar className="text-orange-500" /> Date
          </p>
          <input
            type="date"
            className="mt-2 w-full p-2 rounded-lg border focus:ring-2 focus:ring-blue-300"
            value={f.date}
            onChange={(e) => setF({ ...f, date: e.target.value })}
          />
        </div>

        <div className="p-4 bg-white/90 rounded-2xl shadow-sm border">
          <p className="text-sm text-gray-600 flex items-center gap-2">
            <FiClock className="text-red-500" /> Time
          </p>
          <input
            type="time"
            className="mt-2 w-full p-2 rounded-lg border focus:ring-2 focus:ring-blue-300"
            value={f.time}
            onChange={(e) => setF({ ...f, time: e.target.value })}
          />
        </div>
      </div>

      {/* APPLY BUTTON */}
      <motion.button
        whileTap={{ scale: 0.93 }}
        onClick={() => onFind(f)}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-md hover:shadow-lg transition"
      >
        Apply Filters <FiChevronRight className="inline ml-1" />
      </motion.button>
    </motion.div>
  );
}
