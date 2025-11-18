import React, { useState, useEffect } from "react";
import SearchFilters from "../../components/SearchFilters";
import WorkersMap from "../../components/WorkersMap";
import WorkerCard from "../../components/WorkerCard";
import recommendationApi from "../../api/recommendationApi";

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

  const [loading, setLoading] = useState(false);
  const [workers, setWorkers] = useState([]);
  const [selectedWorkers, setSelectedWorkers] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 19.076, lng: 72.8777 });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (p) =>
          setMapCenter({ lat: p.coords.latitude, lng: p.coords.longitude }),
        () => {}
      );
    }
  }, []);

  const handleFind = async (newFilters) => {
    setFilters((f) => ({ ...f, ...newFilters }));
    setLoading(true);

    try {
      const payload = {
        category: newFilters.category,
        skill_level: newFilters.skillLevel,
        location: newFilters.location || mapCenter,
        date: newFilters.date,
        time: newFilters.time,
        workers_needed: newFilters.workersNeeded,
        payment: newFilters.payment,
      };
      const res = await recommendationApi.findWorkers(payload);
      setWorkers(res);
      if (newFilters.location) setMapCenter(newFilters.location);
    } catch {
      setWorkers([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleSelectWorker = (id) => {
    setSelectedWorkers((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Find & Hire Labourers</h1>

      <SearchFilters
        initialFilters={filters}
        onFind={handleFind}
        setMapCenter={setMapCenter}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 mt-6">
        <div className="rounded-xl overflow-hidden shadow-lg bg-white h-[650px]">
          <WorkersMap
            center={mapCenter}
            workers={workers}
            selectedWorkers={selectedWorkers}
            onToggleSelect={toggleSelectWorker}
          />
        </div>

        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-700">
              {loading ? "Searching…" : `${workers.length} workers found`}
            </span>
            <button
              disabled={selectedWorkers.length === 0}
              className={`px-4 py-2 rounded-lg text-white transition
              ${
                selectedWorkers.length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-emerald-600 hover:bg-emerald-700"
              }`}
            >
              Hire Selected ({selectedWorkers.length})
            </button>
          </div>

          <div className="space-y-3 overflow-y-auto h-[600px] pr-2">
            {workers.map((w) => (
              <WorkerCard
                key={w.id}
                worker={w}
                isSelected={selectedWorkers.includes(w.id)}
                onToggle={() => toggleSelectWorker(w.id)}
              />
            ))}

            {!loading && workers.length === 0 && (
              <div className="text-center text-gray-500 py-10">
                No workers found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
