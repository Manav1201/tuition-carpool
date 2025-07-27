import React, { useState } from 'react';
import AddBatch from './AddBatch';
import TutorLocationSender from '../components/TutorLocationSender';
import { useAuth } from '../context/AuthContext';

const TutorDashboard = () => {
  const [showAddBatch, setShowAddBatch] = useState(false);
  const { user } = useAuth();

  const summary = {
    totalBatches: 3,
    totalStudents: 14,
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-2">👨‍🏫 Tutor Dashboard</h2>
      <p className="mb-4 text-gray-600">Welcome back! Here's a quick overview.</p>

      {/* 🔴 Real-time location sender (hidden to user, but active) */}
      <TutorLocationSender tutorId={user?._id} />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 shadow rounded">
          <h3 className="text-lg font-semibold">📘 Total Batches</h3>
          <p className="text-2xl text-blue-600">{summary.totalBatches}</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h3 className="text-lg font-semibold">👥 Total Students</h3>
          <p className="text-2xl text-blue-600">{summary.totalStudents}</p>
        </div>
      </div>

      {/* Toggle Add Batch */}
      <div className="mb-6">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => setShowAddBatch(!showAddBatch)}
        >
          {showAddBatch ? '✖️ Close Add Batch' : '➕ Add New Batch'}
        </button>
      </div>

      {/* Add Batch Form */}
      {showAddBatch && (
        <div className="mt-4 border-t pt-4">
          <AddBatch />
        </div>
      )}
    </div>
  );
};

export default TutorDashboard;
