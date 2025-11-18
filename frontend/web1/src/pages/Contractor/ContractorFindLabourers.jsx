import React, { useState, useEffect } from "react";
import TopNavbar from "../../components/TopNavbar";
import SearchFilters from "../../components/SearchFilters";
import WorkersMap from "../../components/WorkersMap";
import WorkerCard from "../../components/WorkerCard";
import toast from "react-hot-toast";

export default function ContractorFindLabourers() {
  const [filters, setFilters] = useState({
    category: "mason",
    skillLevel: "intermediate",
    location: null,
    date: "",
    time: "",
    workersNeeded: 1,
    payment: 500,
  });

  const [workers, setWorkers] = useState([]);
  const [selectedWorkers, setSelectedWorkers] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 19.076, lng: 72.8777 });

  // Current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((p) => {
        setMapCenter({ lat: p.coords.latitude, lng: p.coords.longitude });
      });
    }
  }, []);

  // Dummy workers
  const generateDummyWorkers = () => {
    return Array.from({ length: 12 }).map((_, i) => ({
      id: i + 1,
      name: ["Raju", "Mohan", "Suresh", "Amit", "Rahul", "Imran", "Deepak"][i % 7],
      category: filters.category,
      skill_level: ["beginner", "intermediate", "expert"][i % 3],
      experience_years: Math.floor(Math.random() * 10) + 1,
      rating: (3 + Math.random() * 2).toFixed(1),
      distance_km: (Math.random() * 5).toFixed(2),
      lat: mapCenter.lat + (Math.random() - 0.5) * 0.02,
      lng: mapCenter.lng + (Math.random() - 0.5) * 0.02,
    }));
  };

  const handleFind = (newFilters) => {
    setFilters(newFilters);
    setWorkers(generateDummyWorkers());
  };

  const handleHire = () => {
    toast.success("Hire request sent to selected workers!");
    setSelectedWorkers([]);
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <TopNavbar />

      <div className="pt-28 px-8 pb-12 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* RIGHT SIDE (Filters + Map) */}
        <div className="space-y-6 order-2 lg:order-1">
          <SearchFilters initialFilters={filters} onFind={handleFind} />

          <div className="shadow-lg rounded-2xl bg-white overflow-hidden h-[300px]">
            <WorkersMap workers={workers} />
          </div>
        </div>

        {/* LEFT SIDE (Results) */}
        <div className="lg:col-span-2 order-1 lg:order-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {workers.length} Labourers Found
            </h2>

            <button
              onClick={handleHire}
              disabled={selectedWorkers.length === 0}
              className={`px-5 py-2 rounded-lg shadow transition text-white ${
                selectedWorkers.length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-emerald-600 hover:bg-emerald-700"
              }`}
            >
              Hire Selected ({selectedWorkers.length})
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {workers.map((w) => (
              <WorkerCard
                key={w.id}
                worker={w}
                isSelected={selectedWorkers.includes(w.id)}
                onToggle={() =>
                  setSelectedWorkers((prev) =>
                    prev.includes(w.id)
                      ? prev.filter((x) => x !== w.id)
                      : [...prev, w.id]
                  )
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
