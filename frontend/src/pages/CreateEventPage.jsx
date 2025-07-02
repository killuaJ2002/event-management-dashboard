import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function CreateEventPage() {
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [capacity, setCapacity] = useState(10);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/events", { title, description, date, capacity });
    toast.success("Event created successfully!");
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      <h2 className="text-xl mb-2">Create Event</h2>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDesc(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <input
        type="datetime-local"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <input
        type="number"
        placeholder="Capacity"
        value={capacity}
        onChange={(e) => setCapacity(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <button className="bg-blue-500 text-white px-4 py-2">Create</button>
    </form>
  );
}
