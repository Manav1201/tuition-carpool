import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-center px-4">
      <h1 className="text-4xl font-bold text-blue-700 mb-4">
        🚗 Tuition Carpool
      </h1>
      <p className="text-gray-600 mb-8">
        Helping tutors & parents coordinate tuitions and rides easily.
      </p>

      <div className="space-x-4">
        <Link
          to="/login"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Login as Parent/Tutor
        </Link>
        <Link
          to="/tutor"
          className="border border-blue-600 text-blue-600 px-6 py-2 rounded hover:bg-blue-100"
        >
          Go to Tutor Dashboard
        </Link>
      </div>

      <footer className="mt-16 text-sm text-gray-400">
        © 2025 · Built by Manav Gupta
      </footer>
    </div>
  );
};

export default Home;
