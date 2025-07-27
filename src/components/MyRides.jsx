import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const MyRides = () => {
  const { user } = useAuth();
  const [rides, setRides] = useState([]);

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/requestrides/parent/${user._id}`);
        const data = await res.json();
        setRides(data);
      } catch (err) {
        console.error("❌ Failed to fetch ride requests:", err);
      }
    };

    if (user?._id) fetchRides();
  }, [user]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">🚗 My Ride Requests</h2>

      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded">
          <thead className="bg-blue-100 text-blue-800">
            <tr>
              <th className="px-4 py-2 text-left">Student</th>
              <th className="px-4 py-2 text-left">Batch</th>
              <th className="px-4 py-2 text-left">Pickup</th>
              <th className="px-4 py-2 text-left">Drop</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Time</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {rides.map((ride) => (
              <tr key={ride._id} className="border-t">
                <td className="px-4 py-2">You</td>
                <td className="px-4 py-2">{ride.batchId?.subject || ride.batchId}</td>
                <td className="px-4 py-2">{ride.pickupLocation}</td>
                <td className="px-4 py-2">{ride.dropLocation}</td>
                <td className="px-4 py-2">{new Date(ride.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-2">{new Date(ride.createdAt).toLocaleTimeString()}</td>
                <td className={`px-4 py-2 font-semibold ${ride.status === 'approved' ? 'text-green-600' : 'text-yellow-600'}`}>
                  {ride.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyRides;
