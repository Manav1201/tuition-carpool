import React, { useState, useEffect } from 'react';
import { useAuth } from "../context/AuthContext";

const RequestRide = () => {
  const { user } = useAuth();

  const [form, setForm] = useState({
    studentName: '',
    batchId: '',
    pickupLocation: '',
    dropLocation: '',
    date: '',
    time: '',
  });

  const [batches, setBatches] = useState([]);

  // 🟢 Fetch all batches
  useEffect(() => {
    fetch("http://localhost:5000/api/batches")
      .then(res => res.json())
      .then(data => setBatches(data))
      .catch(err => console.error("❌ Error loading batches:", err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      parentId: user._id,
      batchId: form.batchId,
      pickupLocation: form.pickupLocation,
      dropLocation: form.dropLocation,
    };

    try {
      const res = await fetch("http://localhost:5000/api/requestrides", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Ride request submitted!");
        console.log("🌟 Backend response:", data);
      } else {
        alert(data.error || "Ride request failed");
      }
    } catch (err) {
      console.error("❌ Ride request error:", err);
      alert("Server error while requesting ride");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">🚗 Request a Ride</h2>

      <form onSubmit={handleSubmit} className="bg-white shadow p-4 rounded space-y-4">
        <div>
          <label className="block mb-1 font-medium">Student Name</label>
          <input
            type="text"
            name="studentName"
            value={form.studentName}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="e.g. Rohan Gupta"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Select Batch</label>
          <select
            name="batchId"
            value={form.batchId}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          >
            <option value="">-- Select Batch --</option>
            {batches.map((batch) => (
              <option key={batch._id} value={batch._id}>
                {batch.subject} ({batch.timing})
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Pickup Location</label>
            <input
              type="text"
              name="pickupLocation"
              value={form.pickupLocation}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Drop Location</label>
            <input
              type="text"
              name="dropLocation"
              value={form.dropLocation}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Time</label>
            <input
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Ride Request
        </button>
      </form>
    </div>
  );
};

export default RequestRide;
