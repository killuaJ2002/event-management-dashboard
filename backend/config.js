import dotenv from "dotenv";
dotenv.config();

export const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/event-dashboard";
export const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";
