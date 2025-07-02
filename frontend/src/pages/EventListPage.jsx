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
    const socket = io("http://localhost:8000");
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
    <div className="p-4">
      <h2 className="text-xl mb-4">All Events</h2>
      {events.map((ev) => (
        <EventCard key={ev._id} event={ev} refresh={fetchEvents} />
      ))}
    </div>
  );
}
