const express = require("express");
const router = express.Router();
const { createBooking, getUserBookings, getBookedSeats } = require("../controllers/bookingController");
const protect = require("../middlewares/authMiddleware");

router.post("/", protect, createBooking);
router.get("/booked-seats/:showtimeId/date/:selectedDate", protect, getBookedSeats);
router.get("/:userId", getUserBookings);

module.exports = router;