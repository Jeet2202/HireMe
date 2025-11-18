import React, { useState } from "react";
import { motion } from "framer-motion";

const categories = ["mason", "carpenter", "plumber", "electrician", "painter", "helper"];
const skillLevels = ["beginner", "intermediate", "expert"];

export default function SearchFilters({ initialFilters, onFind, setMapCenter }) {
  const [form, setForm] = useState(initialFilters);

  const handleChange = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const setCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((p) => {
      const lat = p.coords.latitude;
      const lng = p.coords.longitude;
      handleChange("location", { lat, lng });
      setMapCenter({ lat, lng });
    });
  };

  return (
    <motion.form
      onSubmit={(e) => {
        e.preventDefault();
        onFind(form);
      }}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="bg-white shadow-lg rounded-xl p-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4"
    >
      {/* Category */}
      <div className="flex flex-col">
        <label className="text-sm text-gray-600">Category</label>
        <select
          className="border rounded-lg p-2"
          value={form.category}
          onChange={(e) => handleChange("category", e.target.value)}
        >
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Skill */}
      <div className="flex flex-col">
        <label className="text-sm text-gray-600">Skill Level</label>
        <select
          className="border rounded-lg p-2"
          value={form.skillLevel}
          onChange={(e) => handleChange("skillLevel", e.target.value)}
        >
          {skillLevels.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Location */}
      <div className="flex flex-col">
        <label className="text-sm text-gray-600">Location</label>
        <button
          type="button"
          className="px-3 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          onClick={setCurrentLocation}
        >
          Use My Location
        </button>
      </div>

      {/* Date */}
      <div className="flex flex-col">
        <label className="text-sm text-gray-600">Date</label>
        <input
          type="date"
          className="border rounded-lg p-2"
          value={form.date}
          onChange={(e) => handleChange("date", e.target.value)}
        />
      </div>

      {/* Time */}
      <div className="flex flex-col">
        <label className="text-sm text-gray-600">Time</label>
        <input
          type="time"
          className="border rounded-lg p-2"
          value={form.time}
          onChange={(e) => handleChange("time", e.target.value)}
        />
      </div>

      {/* Workers count */}
      <div className="flex flex-col">
        <label className="text-sm text-gray-600">No. of Workers</label>
        <input
          type="number"
          min={1}
          className="border rounded-lg p-2"
          value={form.workersNeeded}
          onChange={(e) =>
            handleChange("workersNeeded", Number(e.target.value))
          }
        />
      </div>

      {/* Payment */}
      <div className="flex flex-col">
        <label className="text-sm text-gray-600">Payment (₹)</label>
        <input
          type="number"
          min={100}
          className="border rounded-lg p-2"
          value={form.payment}
          onChange={(e) => handleChange("payment", Number(e.target.value))}
        />
      </div>

      <button
        type="submit"
        className="col-span-full bg-gray-900 hover:bg-gray-800 text-white py-2 rounded-lg transition"
      >
        Find Workers
      </button>
    </motion.form>
  );
}
