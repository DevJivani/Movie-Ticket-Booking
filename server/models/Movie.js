const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
  title: String,
  description: String,
  writers: [String],
  directors: [String],
  genre: [String],
  actors: [String],
  trailerUrl: String,
  photos: [String], // List of image URLs
  duration: Number, // in minutes
  releaseDate: Date
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);
