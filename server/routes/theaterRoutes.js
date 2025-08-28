const express = require("express");
const router = express.Router();
const { getAllTheaters, addTheater, updateTheater, deleteTheater, getTheaterById, getTheatersByCinemaId } = require("../controllers/theaterController");
const protect = require("../middlewares/authMiddleware");

router.get("/", getAllTheaters);
router.get("/:id", getTheaterById)
router.get("/by-cinema/:cinemaId", protect, getTheatersByCinemaId);
router.post("/addTheater", protect, addTheater);
router.put("/:id", protect, updateTheater);
router.delete("/:id", protect, deleteTheater);

module.exports = router;