import { useEffect } from "react";
import L from "leaflet";

export default function WorkersMap({ workers }) {

  useEffect(() => {
    // Create map
    const map = L.map("map").setView([19.076, 72.8777], 12);

    // Add OpenStreetMap tiles (FREE)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    // Add worker markers
    workers.forEach((w) => {
      L.marker([w.lat, w.lng])
        .addTo(map)
        .bindPopup(`<b>${w.name}</b><br>${w.category}<br>${w.distance_km} km away`);
    });

    return () => map.remove(); // cleanup
  }, [workers]);

  return (
    <div
      id="map"
      className="w-full h-full rounded-xl shadow"
      style={{ height: "100%", width: "100%" }}
    ></div>
  );
}
