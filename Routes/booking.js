import express from "express";
import { getUserAllBookings, checkAvaliblity, createBooking } from "../Controllers/bookingController.js";
import { authenticate } from "../auth/verifyToken.js";

const router = express.Router()

router.get("/", authenticate, getUserAllBookings)
router.post("/check", authenticate, checkAvaliblity)
router.post("/new", authenticate, createBooking)

export default router