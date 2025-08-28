const mongoose = require('mongoose')

const cinemaSchema = new mongoose.Schema({
  name: String,
  location: String
}, { timestamps: true });

module.exports = mongoose.model('Cinema', cinemaSchema);
