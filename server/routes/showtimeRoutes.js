const express = require("express");
const router = express.Router();
const { getAllShowtimes, addShowtime, updateShowtime, deleteShowtime, getShowtimesByMovieId, getShowtimeById } = require("../controllers/showtimeController");
const protect = require("../middlewares/authMiddleware");

router.get("/", getAllShowtimes);
router.get("/:id", getShowtimeById)
router.get("/movie/:movieId", getShowtimesByMovieId)
router.post("/addShow", addShowtime);
router.put("/:id", protect, updateShowtime);
router.delete("/:id", protect, deleteShowtime);

module.exports = router;