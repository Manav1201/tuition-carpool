import React from 'react';
import JoinBatch from '../components/JoinBatch'; // adjust path if needed

import { useAuth } from "../context/AuthContext";
import { Link } from 'react-router-dom';

const ParentDashboard = () => {
      const { user } = useAuth();
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">👨‍👩‍👧‍👦 Parent Dashboard</h2>
      <p className="mb-6 text-gray-600">Welcome! {user?.name}!</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/parent/batches" className="bg-white p-4 shadow rounded hover:bg-blue-50">
          <h3 className="text-lg font-semibold">📘 My Batches</h3>
          <p className="text-sm text-gray-500">See batches your child is enrolled in.</p>
        </Link>
        <Link to="/parent/request-ride" className="bg-white p-4 shadow rounded hover:bg-blue-50">
          <h3 className="text-lg font-semibold">🚗 Request Ride</h3>
          <p className="text-sm text-gray-500">Request a ride for upcoming tuition.</p>
        </Link>
        <Link to="/parent/my-rides" className="bg-white p-4 shadow rounded hover:bg-blue-50">
          <h3 className="text-lg font-semibold">🧾 My Rides</h3>
          <p className="text-sm text-gray-500">Track upcoming and past rides.</p>
        </Link>
        <JoinBatch />
      </div>
    </div>
  );
};

export default ParentDashboard;
