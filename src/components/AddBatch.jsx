import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const AddBatch = () => {
  const { user } = useAuth();

  const [form, setForm] = useState({
    subject: '',
    time: '',
    location: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!user || !user._id) {
    alert("❌ User not loaded yet. Please wait.");
    return;
  }

  const payload = {
    ...form,
    tutorId: user._id,
    tutorName: user.name,
  };

  try {
    const res = await fetch('http://localhost:5000/api/batches', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (res.ok) {
     alert(`✅ Batch added successfully!\n📩 Join Code: ${data.joinCode}`);
      setForm({ subject: '', time: '', location: '' });
    } else {
      alert(data.error || 'Failed to add batch');
    }
  } catch (err) {
    console.error('Error adding batch:', err);
    alert('Server error');
  }
};


  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">➕ Add New Batch</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow p-4 rounded space-y-4">
        <div>
          <label className="block font-medium mb-1">Subject</label>
          <input
            type="text"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="e.g. Math"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Time</label>
          <input
            type="text"
            name="time"
            value={form.time}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="e.g. 5 PM - 6 PM"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="e.g. Sector 14, Gurgaon"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Batch
        </button>
      </form>
    </div>
  );
};

export default AddBatch;
