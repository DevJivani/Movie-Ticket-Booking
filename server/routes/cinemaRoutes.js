const express = require("express");
const router = express.Router();
const { getAllCinemas, addCinema, updateCinema, deleteCinema, getCinemaById } = require("../controllers/cinemaController");
const protect = require("../middlewares/authMiddleware");

router.get("/", getAllCinemas);
router.get("/:id", getCinemaById)
router.post("/addCinema", protect, addCinema);
router.put("/:id", protect, updateCinema);
router.delete("/:id", protect, deleteCinema);

module.exports = router;