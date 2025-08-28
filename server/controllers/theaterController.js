const { default: mongoose } = require("mongoose");
const Theater = require("../models/Theater");

exports.getAllTheaters = async (req, res) => {
  try {
    const theaters = await Theater.find();
    res.json(theaters);
  } catch (err) {
    console.error("Error fetching all theaters:", err);
    res.status(500).json({ message: "Failed to fetch theaters", details: err.message });
  }
};

exports.getTheaterById = async (req, res) => {
  try {
    const theater = await Theater.findById(req.params.id);
    if (!theater) return res.status(404).json({ message: "Theater not found" });
    res.json(theater);
  } catch (err) {
    console.error("Error fetching theater by ID:", err);
    res.status(500).json({ message: "Failed to fetch theater", details: err.message });
  }
}

exports.getTheatersByCinemaId = async (req, res) => {
  try {
    const { cinemaId } = req.params; 
    const theaters = await Theater.find({ cinemaId });
    res.status(200).json(theaters);
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to get theaters." });
  }
};

exports.addTheater = async (req, res) => {
  try {
    const { cinemaId, name, totalSeats } = req.body;
    const theater = new Theater({
      cinemaId : new mongoose.Types.ObjectId(cinemaId),
      name,
      totalSeats
    })
    await theater.save();
    res.status(201).json(theater);
  } catch (err) {
    console.error("Error adding theater:", err);
    res.status(500).json({ message: "Failed to add theater", details: err.message });
  }
};

exports.updateTheater = async (req, res) => {
  try {
    const theater = await Theater.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!theater) return res.status(404).json({ msg: "Theater not found" });
    res.json(theater);
  } catch (err) {
    console.error("Error updating theater:", err);
    res.status(500).json({ message: "Failed to update theater", details: err.message });
  }
};

exports.deleteTheater = async (req, res) => {
  try {
    const theater = await Theater.findByIdAndDelete(req.params.id);
    if (!theater) return res.status(404).json({ msg: "Theater not found" });
    res.json({ msg: "Theater deleted successfully" });
  } catch (err) {
    console.error("Error deleting theater:", err);
    res.status(500).json({ message: "Failed to delete theater", details: err.message });
  }
};
