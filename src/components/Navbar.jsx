import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // 👈 auth context import

function Navbar() {
  const { user, logout } = useAuth(); // 🔐 get user & logout function

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">🚗 TuitionCarpool</Link>

        <div className="flex items-center gap-4">
          <Link to="/">Home</Link>
<Link to="/register">Register</Link>

          {user?.role === "parent" && (
            <>
              <Link to="/parent/batches">enroll-Batches</Link>
                <Link to="/parent/available-batches">Available Batch</Link>
              <Link to="/parent/request-ride">Request Ride</Link>
              <Link to="/parent/my-rides">My Rides</Link>
            </>
          )}

          {user?.role === "tutor" && (
            <>
             <Link to="/tutor/ride-requests" className="...">Ride Requests</Link>

              <Link to="/tutor/my-batches">My Batches</Link>
              <Link to="/tutor/students">My Students</Link>
            </>
          )}

          {!user && (
            <>
              <Link to="/parent">Parent Dashboard</Link>
              <Link to="/tutor">Tutor Dashboard</Link>
              <Link
                to="/login"
                className="bg-white text-blue-600 px-3 py-1 rounded"
              >
                Login
              </Link>
            </>
          )}

          {user && (
            <>
              <span className="text-sm italic">Hi, {user.name}</span>
              <button
                onClick={logout}
                className="bg-red-500 px-3 py-1 rounded text-white"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
