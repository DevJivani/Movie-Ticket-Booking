const express = require("express");
const router = express.Router();
const { getAllMovies, addMovie, updateMovie, deleteMovie, getMovieById, upload, uploadPhoto } = require("../controllers/movieController");
const protect = require("../middlewares/authMiddleware");

router.get("/", getAllMovies);
router.get("/:movieId", getMovieById)
router.post("/addMovie", addMovie);
router.put("/:id", protect, updateMovie);
router.delete("/:id", protect, deleteMovie);

module.exports = router;