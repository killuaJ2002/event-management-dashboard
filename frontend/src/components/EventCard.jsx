import React, { useContext } from "react";
import api from "../services/api";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";

export default function EventCard({ event, refresh }) {
  const { user } = useContext(AuthContext);

  const handleRegister = async () => {
    try {
      await api.post(`/events/${event._id}/register`);
      toast.success("Registered successfully!");
      refresh();
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Error registering");
    }
  };

  // Format date nicely
  const formattedDate = new Date(event.date).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className="border p-2 mb-2 rounded shadow">
      <h3 className="font-bold">{event.title}</h3>
      <p>{event.description}</p>
      <p className="text-sm text-gray-600">Date: {formattedDate}</p>
      <p>Registrations: {event.registrations.length}</p>
      {user && (
        <button
          onClick={handleRegister}
          className="mt-2 px-2 py-1 bg-green-500 text-white rounded"
        >
          Register
        </button>
      )}
    </div>
  );
}
