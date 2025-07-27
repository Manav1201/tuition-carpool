import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import LiveMap from '../components/LiveMap';

const MyBatches = () => {
  const { user } = useAuth();
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    const fetchBatches = async () => {
      if (!user?._id) return;

      try {
        const res = await fetch(`http://localhost:5000/api/batches/parent/${user._id}`);
        const data = await res.json();
        setBatches(data);
      } catch (err) {
        console.error('Error fetching batches:', err);
      }
    };

    fetchBatches();
  }, [user]);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-purple-700 mb-4">📋 My Batches</h2>
      {batches.length === 0 ? (
        <p className="text-gray-500">No batches joined yet.</p>
      ) : (
        <div className="space-y-4">
          {batches.map((batch) => (
            <div key={batch._id} className="border p-4 rounded shadow">
              <h3 className="text-lg font-semibold">{batch.subject}</h3>
              <p>🕒 {batch.time}</p>
              <p>👨‍🏫 Tutor: {batch.tutorId?.name}</p>
              <p>📍 {batch.location}</p>
              <p className="text-sm text-gray-600">📩 Join Code: <span className="font-mono">{batch.joinCode}</span></p>

              {batch.tutorId?._id && (
                <div className="mt-4">
                  <LiveMap tutorId={batch.tutorId._id} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBatches;
