const mongoose = require('mongoose')

const showtimeSchema = new mongoose.Schema({
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  theaterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Theater', required: true },
  cinemaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cinema', required: true },
  showDate: Date,
  showTime: String, // e.g. '18:30'
  // availableSeats: Number, // Recalculate on booking
  pricePerTicket: Number
}, { timestamps: true });

module.exports = mongoose.model("ShowTime", showtimeSchema)