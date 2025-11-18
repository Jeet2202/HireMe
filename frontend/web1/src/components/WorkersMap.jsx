import React from "react";
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from "react-leaflet";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-shadow.png",
});

export default function WorkersMap({ center, workers, selectedWorkers, onToggleSelect }) {
  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={13}
      className="w-full h-full"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Center marker */}
      <CircleMarker center={[center.lat, center.lng]} radius={8} color="#2563eb">
        <Popup>Search center</Popup>
      </CircleMarker>

      {workers.map((w) => (
        <Marker key={w.id} position={[w.lat, w.lng]}>
          <Popup>
            <div className="space-y-1">
              <div className="font-bold">{w.name}</div>
              <div>{w.category} · {w.skill_level}</div>
              <div>Exp: {w.experience_years} yrs</div>
              <div>Rating: {w.rating} ★</div>

              <button
                onClick={() => onToggleSelect(w.id)}
                className={`px-3 py-1 rounded-lg text-white mt-2 transition ${
                  selectedWorkers.includes(w.id)
                    ? "bg-emerald-700"
                    : "bg-gray-900 hover:bg-gray-800"
                }`}
              >
                {selectedWorkers.includes(w.id) ? "Selected" : "Select"}
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
