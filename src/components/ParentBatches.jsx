import { useEffect, useState } from "react";
import LiveMap from "./LiveMap";
import { useAuth } from "../context/AuthContext";

const ParentBatches = () => {
  const { user } = useAuth();
  const [batches, setBatches] = useState([]);
  const [tutorLocation, setTutorLocation] = useState({ lat: 30.7333, lng: 76.7794 });
  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/batches/parent/${user._id}`);
        const data = await res.json();
         console.log("👀 Batches for parent:", data); 
        setBatches(data);
      } catch (err) {
        console.error("Failed to fetch batches", err);
      }
    };

    if (user?._id) fetchBatches();
  }, [user]);
const enrollInBatch = async (batchId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/batches/${batchId}/enroll`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ parentId: user._id }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Enrolled successfully!");
      } else {
        alert(data.error || "Enrollment failed");
      }
    } catch (err) {
      console.error("Enrollment error:", err);
      alert("Server error");
    }
  };
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4 text-blue-600">📘 My Batches</h2>
      <ul className="space-y-4">
  {batches.length === 0 ? (
    <p className="text-gray-500">No batches found.</p>
  ) : (
    batches.map((batch) => (
      <li key={batch._id} className="p-4 bg-white shadow rounded">
        <h3 className="text-lg font-semibold">{batch.subject}</h3>
        <p className="text-sm text-gray-600">Tutor: {batch.tutorId?.name || "N/A"}</p>
        <p className="text-sm text-gray-600">Time: {batch.time}</p>

        <button
  onClick={() => enrollInBatch(batch._id)}
  className="mt-2 bg-green-600 text-white px-3 py-1 rounded"
>
  Enroll
</button>
      </li>
    ))
  )}
</ul>

 <LiveMap position={tutorLocation} />

    </div>
  );
};

export default ParentBatches;
