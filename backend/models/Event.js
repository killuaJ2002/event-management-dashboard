import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  capacity: Number,
  registrations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Account" }],
});

export default mongoose.model("Event", eventSchema);
