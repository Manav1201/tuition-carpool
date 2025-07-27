import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const AvailableBatches = () => {
  const { user } = useAuth();
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    const fetchAllBatches = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/batches`);
        const data = await res.json();

        if (Array.isArray(data)) {
          setBatches(data);
        } else {
          console.error("Invalid batch response:", data);
        }
      } catch (err) {
        console.error("Failed to fetch all batches", err);
      }
    };

    fetchAllBatches();
  }, []);

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
      <h2 className="text-xl font-bold mb-4 text-green-700">📚 Available Batches</h2>
      <ul className="space-y-4">
        {batches.length === 0 ? (
          <p>No batches available.</p>
        ) : (
          batches.map((batch) => (
            <li key={batch._id} className="p-4 bg-white shadow rounded">
              <h3 className="text-lg font-semibold">{batch.subject}</h3>
              <p className="text-sm text-gray-600">
                Tutor: {batch.tutorId?.name || "N/A"}
              </p>
              <p className="text-sm text-gray-600">Time: {batch.time}</p>
              <button
                onClick={() => enrollInBatch(batch._id)}
                className="mt-2 bg-blue-600 text-white px-3 py-1 rounded"
              >
                Enroll
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default AvailableBatches;
