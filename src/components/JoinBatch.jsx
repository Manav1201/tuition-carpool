import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const JoinBatch = () => {
  const { user } = useAuth();
  const [joinCode, setJoinCode] = useState('');
  const [message, setMessage] = useState('');

  const handleJoin = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      // Step 1: Find batch by join code
      const res1 = await fetch(`http://localhost:5000/api/batches/code/${joinCode}`);
      const batch = await res1.json();

      if (!res1.ok) {
        setMessage('❌ Invalid join code');
        return;
      }

      // Step 2: Enroll parent
      const res2 = await fetch(`http://localhost:5000/api/batches/${batch._id}/enroll`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ parentId: user._id }),
      });

      const result = await res2.json();

      if (res2.ok) {
        setMessage('✅ Successfully enrolled in batch!');
      } else {
        setMessage(result.error || '❌ Failed to enroll');
      }
    } catch (err) {
      console.error('Error:', err);
      setMessage('❌ Server error');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-green-700 mb-4">🧑‍🎓 Join a Batch</h2>
      <form onSubmit={handleJoin} className="space-y-4">
        <input
          type="text"
          placeholder="Enter Join Code"
          value={joinCode}
          onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Join Batch
        </button>
      </form>
      {message && <p className="mt-4 text-center font-medium">{message}</p>}
    </div>
  );
};

export default JoinBatch;
