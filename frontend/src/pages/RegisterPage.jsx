import React, { useState, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await api.post("/auth/register", {
      name,
      email,
      password,
      role,
    });
    login(res.data.user, res.data.token);
    navigate("/");
  };

  return (
    <form
  onSubmit={handleSubmit}
  className="max-w-md mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg"
>
  <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Register</h2>

  <input
    placeholder="Name"
    value={name}
    onChange={(e) => setName(e.target.value)}
    className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
  />

  <input
    placeholder="Email"
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
  />

  <input
    placeholder="Password"
    type="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
  />

  <select
    value={role}
    onChange={(e) => setRole(e.target.value)}
    className="w-full p-3 mb-6 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
  >
    <option value="user">User</option>
    <option value="organizer">Organizer</option>
  </select>

  <button
    type="submit"
    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg shadow-md transition duration-200"
  >
    Register
  </button>
</form>

  );
}
