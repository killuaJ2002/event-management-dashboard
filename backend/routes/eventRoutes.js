import express from "express";
import {
  createEvent,
  listEvents,
  registerForEvent,
} from "../controllers/eventController.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", listEvents);
router.post("/", auth, createEvent); // add organizer check if needed
router.post("/:id/register", auth, registerForEvent);

export default router;
