import React, { useEffect, useState } from "react";
import api from "../services/api";
import { io } from "socket.io-client";
import EventCard from "../components/EventCard";

export default function EventListPage() {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    const res = await api.get("/events");
    setEvents(res.data);
  };

  useEffect(() => {
    fetchEvents();

    // Connect to live Render backend
    const socket = io("https://event-management-dashboard-neix.onrender.com");

    socket.on("registrationUpdate", (data) => {
      setEvents((prev) =>
        prev.map((ev) =>
          ev._id === data.eventId
            ? { ...ev, registrations: [...ev.registrations, {}] }
            : ev
        )
      );
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">All Events</h2>

      {/* Responsive grid layout */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((ev) => (
          <EventCard key={ev._id} event={ev} refresh={fetchEvents} />
        ))}
      </div>
    </div>
  );
}
