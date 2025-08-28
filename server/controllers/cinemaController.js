const { default: mongoose } = require("mongoose");
const Cinema = require("../models/Cinema");

exports.getAllCinemas = async (req, res) => {
  try {
    const cinemas = await Cinema.find();
    res.json(cinemas);
  } catch (err) {
    console.error("Error fetching all cinemas:", err);
    res.status(500).json({ message: "Failed to fetch cinemas", details: err.message });
  }
};

exports.getCinemaById = async (req, res) => {
  try {
    const id = req.params.id
    const cinema = await Cinema.findById(id);
    if (!cinema) return res.status(404).json({ message: "Cinema not found" });
    res.json(cinema);
  } catch (err) {
    console.error("Error fetching cinema by ID:", err);
    res.status(500).json({ message: "Failed to fetch cinema", details: err.message });
  }
}

exports.addCinema = async (req, res) => {
  try {
    const cinema = new Cinema(req.body);
    await cinema.save();
    res.status(201).json({msg:"Cinema added successfully",cinema});
  } catch (err) {
    console.error("Error adding cinema:", err);
    res.status(500).json({ message: "Failed to add cinema", details: err.message });
  }
};

exports.updateCinema = async (req, res) => {
  try {
    const cinema = await Cinema.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!cinema) return res.status(404).json({ msg: "Cinema not found" });
    res.json(cinema);
  } catch (err) {
    console.error("Error updating cinema:", err);
    res.status(500).json({ message: "Failed to update cinema", details: err.message });
  }
};

exports.deleteCinema = async (req, res) => {
  try {
    const cinema = await Cinema.findByIdAndDelete(req.params.id);
    if (!cinema) return res.status(404).json({ msg: "Cinema not found" });
    res.json({ msg: "Cinema deleted successfully" });
  } catch (err) {
    console.error("Error deleting cinema:", err);
    res.status(500).json({ message: "Failed to delete cinema", details: err.message });
  }
};
