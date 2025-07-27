// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth(); // context se login func
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("parent"); // default

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role }),
    });

    const data = await res.json();
    console.log("Login Response:", data);

    if (res.ok) {
      login(data);

      // ✅ Role ke hisaab se redirect
      if (data.role === "parent") {
        navigate("/parent");
      } else if (data.role === "tutor") {
        navigate("/tutor");
      } else {
        navigate("/");
      }
    } else {
      alert(data.error || "Login failed");
    }
  } catch (err) {
    alert("Server error");
    console.error(err);
  }
};


  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border p-2"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full border p-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <select
          className="w-full border p-2"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="parent">Parent</option>
          <option value="tutor">Tutor</option>
        </select>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
