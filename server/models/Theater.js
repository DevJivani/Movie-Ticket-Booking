const mongoose = require('mongoose')

const theaterSchema = new mongoose.Schema({
  cinemaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cinema', required: true },
  name: String,
  totalSeats: Number,
  seatLayout: {
    rows: { type: Array, default: ["A","B", "C", "D", "E", "F", "G", "RA", "RB", "RC"] },       
    seatsPerRow: { type: Number, default: 18 },
  } 
}, { timestamps: true });

module.exports = mongoose.model("Theater", theaterSchema)