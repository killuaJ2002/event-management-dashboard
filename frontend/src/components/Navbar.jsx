import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const isLogin = location.pathname === "/login";
  const isRegister = location.pathname === "/register";

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-indigo-500 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide text-white hover:scale-105 transform transition duration-200"
        >
          Event Manager
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              {user.role === "organizer" && (
                <Link
                  to="/create-event"
                  className="text-white hover:text-indigo-100 transition font-medium"
                >
                  + Create Event
                </Link>
              )}

              <span className="bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
                👤 {user.name}
              </span>

              <button
                onClick={logout}
                className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-lg shadow hover:bg-blue-100 transition duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  isLogin
                    ? "bg-white text-blue-600 shadow"
                    : "text-white hover:bg-white hover:text-blue-600"
                }`}
              >
                Login
              </Link>

              <Link
                to="/register"
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  isRegister
                    ? "bg-white text-blue-600 shadow"
                    : "text-white hover:bg-white hover:text-blue-600"
                }`}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
