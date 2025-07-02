import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";
import { MONGO_URI } from "./config.js";
import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import registrationSocket from "./sockets/registrationSocket.js";
import { Server } from "socket.io";

const app = express();
app.use(cors());
app.use(express.json());

// Create HTTP server & Socket.IO
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// Setup socket handling
registrationSocket(io);

// Middleware to attach io to req
app.use((req, res, next) => {
  req.io = io;
  next();
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

// Connect DB & start server
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
