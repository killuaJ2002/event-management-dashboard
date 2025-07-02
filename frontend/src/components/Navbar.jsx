import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  return (
    <nav className="flex justify-between p-4 bg-blue-500 text-white">
      <div>
        <Link to="/" className="font-bold">
          Events
        </Link>
      </div>
      <div className="flex gap-4">
        {user ? (
          <>
            {user.role === "organizer" && (
              <Link to="/create-event">Create Event</Link>
            )}
            <span>{user.name}</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
