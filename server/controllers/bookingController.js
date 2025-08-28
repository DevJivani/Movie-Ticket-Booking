const { mongoose } = require("mongoose");
const Booking = require("../models/Booking");
const ShowTime = require("../models/ShowTime")

exports.createBooking = async (req, res) => {
  const userId = req.user?.id;
  const { showtimeId, seats, date, totalPrice } = req.body;

  if (!showtimeId || !seats?.length || !date || !totalPrice) {
    return res.status(400).json({ msg: "All booking fields are required." });
  }

  try {
    const booking = new Booking({ userId, showtimeId, seats, bookingDate: date, totalPrice });
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    console.error("Booking error:", err);
    res.status(500).json({ msg: "Failed to create booking. Please try again later." });
  }
};

exports.getBookedSeats = async (req, res) => {
  try {
    const { showtimeId, selectedDate } = req.params;
    if (!showtimeId) return res.status(400).json({ msg: "Showtime ID is required." });

    // Convert selectedDate (e.g. "2025-06-02") into a Date range for that full day
    const startOfDay = new Date(`${selectedDate}T00:00:00.000Z`);
    const endOfDay = new Date(`${selectedDate}T23:59:59.999Z`);
    const bookings = await Booking.find({
      showtimeId,
      bookingDate: { $gte: startOfDay, $lte: endOfDay },
    });

    // const bookings = await Booking.find({ showtimeId });
    const bookedSeats = bookings.flatMap(b => b.seats);

    res.json(bookedSeats);
  } catch (err) {
    console.error("Get booked seats error:", err);
    res.status(500).json({ msg: "Failed to fetch booked seats." });
  }
};

exports.getUserBookings = async (req, res) => {

  try {
    const bookings = await Booking.find({ userId: req.params.userId })
      .populate({
        path: "showtimeId",
        populate: [
          { path: "movieId", select: "title" },
          { path: "theaterId", populate: { path: "cinemaId", select: "name location" } }
        ]
      });

    const formattedBookings = bookings.map((booking) => ({
      bookingId: booking._id,
      userId: booking.userId,
      status: booking.status,
      bookingDate: booking.bookingDate.toISOString().split("T")[0],
      totalPrice: booking.totalPrice,

      movie: {
        movieId: booking.showtimeId.movieId._id,
        title: booking.showtimeId.movieId.title,
      },

      showtime: {
        showtimeId: booking.showtimeId._id,
        showDate: booking.showtimeId.showDate.toISOString().split("T")[0],
        showTime: booking.showtimeId.showTime,
        pricePerTicket: booking.showtimeId.pricePerTicket
      },

      theater: {
        theaterId: booking.showtimeId.theaterId._id,
        name: booking.showtimeId.theaterId.name
      },

      cinema: {
        cinemaId: booking.showtimeId.theaterId.cinemaId._id,
        name: booking.showtimeId.theaterId.cinemaId.name,
        location: booking.showtimeId.theaterId.cinemaId.location
      },

      seats: booking.seats.map(seat => ({
        row: seat.row,
        number: seat.number
      }))
    }));


    res.json(formattedBookings);
  } catch (err) {
    console.error("Error fetching user bookings:", err);
    res.status(500).json({ msg: "Server error fetching bookings" });
  }
};