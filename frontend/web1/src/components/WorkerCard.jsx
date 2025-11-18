import React from "react";
import { motion } from "framer-motion";

export default function WorkerCard({ worker, isSelected, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`p-4 rounded-xl shadow-md bg-white flex justify-between items-center border 
      ${isSelected ? "border-emerald-500" : "border-transparent"}`}
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
          {worker.name[0]}
        </div>

        <div>
          <h3 className="font-semibold">
            {worker.name} <span className="text-gray-500">· {worker.category}</span>
          </h3>
          <p className="text-sm text-gray-600">
            Skill: {worker.skill_level} · Exp: {worker.experience_years} yrs
          </p>
          <p className="text-sm text-gray-600">
            Rating: {worker.rating} ★
          </p>
        </div>
      </div>

      <div className="text-right">
        <p className="font-bold text-gray-700">{worker.distance_km} km</p>
        <button
          onClick={onToggle}
          className={`px-3 py-1 rounded-lg text-white mt-2 transition ${
            isSelected ? "bg-emerald-700" : "bg-gray-900 hover:bg-gray-800"
          }`}
        >
          {isSelected ? "Selected" : "Select"}
        </button>
      </div>
    </motion.div>
  );
}
