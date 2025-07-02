import Event from "../models/Event.js";

export const createEvent = async (req, res) => {
  if (req.user.role !== "organizer") {
    return res
      .status(403)
      .json({ message: "Only organizers can create events" });
  }
  try {
    const { title, description, date, capacity } = req.body;
    const event = await Event.create({ title, description, date, capacity });
    res.json(event);
  } catch (err) {
    res.status(400).json({ message: "Could not create event" });
  }
};

export const listEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("registrations", "name");
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: "Error fetching events" });
  }
};

export const registerForEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    if (event.registrations.includes(req.user.id))
      return res.status(400).json({ message: "Already registered" });
    if (event.registrations.length >= event.capacity)
      return res.status(400).json({ message: "Event full" });

    event.registrations.push(req.user.id);
    await event.save();

    req.io.emit("registrationUpdate", {
      eventId: event._id,
      count: event.registrations.length,
    });

    res.json({ message: "Registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error registering" });
  }
};
