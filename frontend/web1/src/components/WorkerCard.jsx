import { motion } from "framer-motion";
import { FiMapPin, FiStar, FiTool, FiBriefcase } from "react-icons/fi";

export default function WorkerCard({ worker, isSelected, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03, boxShadow: "0 8px 30px rgba(0,0,0,0.12)" }}
      transition={{ duration: 0.25 }}
      className={`relative rounded-3xl p-5 cursor-pointer overflow-hidden
      backdrop-blur-lg border-[1.5px] shadow-xl transition-all
      ${
        isSelected
          ? "border-emerald-500 bg-white/80"
          : "border-gray-200 bg-white/60"
      }
    `}
      onClick={onToggle}
    >
      {/* Gradient Glow Effect */}
      <div
        className={`absolute inset-0 -z-10 blur-2xl opacity-30 transition
        ${
          isSelected
            ? "bg-emerald-300/40"
            : "bg-blue-300/20"
        }`}
      ></div>

      {/* Card Header */}
      <div className="flex items-center gap-4">
        <div className="relative w-14 h-14 rounded-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-500 opacity-90"></div>
          <div className="absolute inset-0 flex items-center justify-center text-white text-xl font-semibold">
            {worker.name[0]}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-gray-900">{worker.name}</h3>
          <p className="text-gray-500 flex items-center gap-1 text-sm">
            <FiTool className="text-blue-500" /> {worker.category}
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mt-4 grid grid-cols-2 gap-3 text-gray-700 text-sm">
        <div className="flex items-center gap-2">
          <FiBriefcase className="text-green-600" />
          <span>
            {worker.experience_years} yrs exp
          </span>
        </div>

        <div className="flex items-center gap-2">
          <FiStar className="text-yellow-500" />
          <span>{worker.rating} rating</span>
        </div>

        <div className="flex items-center gap-2">
          <FiMapPin className="text-red-500" />
          <span>{worker.distance_km} km away</span>
        </div>

        <div>
          <span
            className={`px-3 py-1 text-xs font-bold rounded-full shadow-sm
            ${
              worker.skill_level === "expert"
                ? "bg-purple-100 text-purple-700"
                : worker.skill_level === "intermediate"
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {worker.skill_level.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Select Button */}
      <motion.button
        whileTap={{ scale: 0.93 }}
        className={`w-full mt-5 py-2.5 rounded-xl font-semibold tracking-wide transition
        ${
          isSelected
            ? "bg-emerald-600 hover:bg-emerald-700 text-white"
            : "bg-gray-900 hover:bg-gray-800 text-white"
        }`}
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
      >
        {isSelected ? "Selected ✓" : "Select Worker"}
      </motion.button>
    </motion.div>
  );
}
