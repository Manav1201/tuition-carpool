import { useEffect } from "react";
import io from "socket.io-client";
import { useAuth } from "../context/AuthContext";

const socket = io("http://localhost:5000");

const TutorLocationSender = ({ tutorId }) => {
  const { user } = useAuth(); // just in case

  useEffect(() => {
    if (!tutorId) return;

    // ✅ Watch position continuously
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log("📍 Sending:", latitude, longitude);

        socket.emit("tutorLocation", {
          lat: latitude,
          lng: longitude,
          tutorId: String(tutorId), // 👈 Ensure it's a string
        });
      },
      (err) => {
        console.error("❌ Location error:", err.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
      }
    );

    // 💥 Cleanup
    return () => {
      navigator.geolocation.clearWatch(watchId);
      
    };
  }, [tutorId]);

  return null; // No visible UI
};

export default TutorLocationSender;
