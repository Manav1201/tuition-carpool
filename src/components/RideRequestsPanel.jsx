import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext'; // ✅ Add this line

const RideRequestsPanel = () => {
  const [rides, setRides] = useState([]);
  const { user } = useAuth(); // ✅ Tutor info

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/requestrides/tutor/${user._id}`);
        const data = await res.json();
        console.log("🎯 Tutor Rides:", data); // ✅ DEBUG
        setRides(data);
      } catch (err) {
        console.error("❌ Failed to fetch ride requests:", err);
      }
    };

    if (user?._id) {
      fetchRides();
    }
  }, [user]);

  const updateStatus = async (rideId, status) => {
    try {
      const res = await fetch(`http://localhost:5000/api/requestrides/${rideId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      const updated = await res.json();

      // Update UI
      setRides((prev) =>
        prev.map((ride) => (ride._id === rideId ? { ...ride, status: updated.status } : ride))
      );
    } catch (err) {
      console.error("❌ Error updating status:", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">🧑‍🏫 Ride Requests Panel</h2>

      {rides.length === 0 ? (
        <p className="text-red-500">No ride requests found for your batches.</p>
      ) : (
        <table className="w-full bg-white shadow rounded">
          <thead className="bg-blue-100">
            <tr>
              <th className="px-4 py-2">Parent</th>
              <th className="px-4 py-2">Batch</th>
              <th className="px-4 py-2">Pickup</th>
              <th className="px-4 py-2">Drop</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rides.map((ride) => (
              <tr key={ride._id} className="border-t">
                <td className="px-4 py-2">{ride.parentId?.name || 'Parent'}</td>
                <td className="px-4 py-2">{ride.batchId?.subject || ride.batchId}</td>
                <td className="px-4 py-2">{ride.pickupLocation}</td>
                <td className="px-4 py-2">{ride.dropLocation}</td>
                <td className={`px-4 py-2 ${ride.status === 'approved' ? 'text-green-600' : ride.status === 'rejected' ? 'text-red-600' : 'text-yellow-600'}`}>
                  {ride.status}
                </td>
                <td className="px-4 py-2 space-x-2">
                  {ride.status === 'pending' ? (
                    <>
                      <button onClick={() => updateStatus(ride._id, 'approved')} className="px-3 py-1 bg-green-500 text-white rounded">Approve</button>
                      <button onClick={() => updateStatus(ride._id, 'rejected')} className="px-3 py-1 bg-red-500 text-white rounded">Reject</button>
                    </>
                  ) : (
                    <span className="text-gray-500">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RideRequestsPanel;
