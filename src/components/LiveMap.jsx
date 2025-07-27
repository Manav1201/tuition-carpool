import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import io from "socket.io-client";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// Zoom to marker when location changes 
const MapZoom = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(position, 15);
  }, [position]);
  return null;
};

const LiveMap = ({ tutorId }) => {
  const [tutorLocation, setTutorLocation] = useState({
    lat: 30.7333,
    lng: 76.7794,
  });

  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.on("tutorLocationUpdate", (data) => {
      console.log("📥 Received:", data);
      if (String(data.tutorId) === String(tutorId)) {
        console.log("✅ MATCHED → Updating map");
        setTutorLocation({ lat: data.lat, lng: data.lng });
      }
    });

    return () => socket.disconnect();
  }, [tutorId]);

  return (
    <div>
      <h3 className="text-lg font-semibold text-blue-700 mb-2">📍 Live Tutor Location</h3>
      <MapContainer center={tutorLocation} zoom={15} style={{ height: "400px", width: "100%" }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={tutorLocation}>
          <Popup>Tutor is here 🚗</Popup>
        </Marker>
        <MapZoom position={tutorLocation} />
      </MapContainer>
    </div>
  );
};

export default LiveMap;
