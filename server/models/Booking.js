const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  showtimeId: { type: mongoose.Schema.Types.ObjectId, ref: 'ShowTime', required: true },
  seats: [{
    row: { type: String, required: true },     // e.g. 'A'
    number: { type: Number, required: true }   // e.g. 5
  }],
  totalPrice: Number,
  bookingDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['confirmed', 'cancelled'], default: 'confirmed' }
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema)