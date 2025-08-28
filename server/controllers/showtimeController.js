const { default: mongoose } = require("mongoose");
const ShowTime = require("../models/ShowTime");
const Cinema = require("../models/Cinema");

exports.getAllShowtimes = async (req, res) => {
  try {
    const showtimes = await ShowTime.find();
    res.json(showtimes);
  } catch (err) {
    console.error("Error fetching all showtimes:", err);
    res.status(500).json({ msg: "Failed to retrieve showtimes" });
  }
};

exports.getShowtimeById = async (req, res) => {
  try {
    const showtime = await ShowTime.findById(req.params.id)
      .populate("movieId", "title duration")     // optional: populate movie details
      .populate("cinemaId", "name")              // optional: populate cinema name
      .populate("theaterId", "name totalSeats"); // optional: populate theater details

    if (!showtime) return res.status(404).json({ message: "Showtime not found" });

    res.json(showtime);
  } catch (err) {
    console.error("Error fetching showtime by ID:", err);
    res.status(500).json({ message: "Server error while fetching showtime" });
  }
};

exports.getShowtimesByMovieId = async (req, res) => {
  try {
    const { movieId } = req.params;

    const showtimes = await ShowTime.find({ movieId })
      .populate("cinemaId", "name")
      .populate("theaterId", "name")
      .sort({ showTime: 1 });

    const grouped = {};

    showtimes.forEach((show) => {
      const cinemaId = show.cinemaId._id.toString();
      const cinemaName = show.cinemaId.name;

      if (!grouped[cinemaId]) {
        grouped[cinemaId] = {
          cinemaId,
          cinemaName,
          shows: [],
        };
      }

      const theaterId = show.theaterId._id.toString();
      const theaterName = show.theaterId.name;

      // Check if the theater already exists in this cinema's shows array
      let theaterEntry = grouped[cinemaId].shows.find(
        (t) => t.theaterId === theaterId
      );

      if (!theaterEntry) {
        theaterEntry = {
          theaterId,
          theaterName,
          times: [],
          showtimeIds: [],
        };
        grouped[cinemaId].shows.push(theaterEntry);
      }

      theaterEntry.times.push(show.showTime);
      theaterEntry.showtimeIds.push(show._id);
    });

    // Convert object to array
    const result = Object.values(grouped);
    res.json(result);
  } catch (err) {
     console.error("Error fetching showtimes by movie ID:", err);
    res.status(500).json({ message: "Error fetching showtimes" });
  }
};

exports.addShowtime = async (req, res) => {
  try {
    // const showtime = new Showtime(req.body);
    const { movieId, theaterId, cinemaId, showDate, showTime, pricePerTicket } = req.body;

    const showtime = new ShowTime({
      movieId: new mongoose.Types.ObjectId(movieId),
      theaterId: new mongoose.Types.ObjectId(theaterId),
      cinemaId: new mongoose.Types.ObjectId(cinemaId),
      showDate,
      showTime,
      pricePerTicket
    })

    await showtime.save();
    res.status(201).json({ msg: "Showtime added successfully", showtime });
  } catch (err) {
    console.error("Error adding showtime:", err);
    res.status(500).json({ msg: "Failed to add showtime" });
  }
};

exports.updateShowtime = async (req, res) => {
  try {
    const showtime = await Showtime.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!showtime) return res.status(404).json({ msg: "Showtime not found" });
    res.json({ msg: "Showtime updated successfully", showtime });
  } catch (err) {
    console.error("Error updating showtime:", err);
    res.status(500).json({ msg: "Failed to update showtime" });
  }
};

exports.deleteShowtime = async (req, res) => {
  try {
    const showtime = await Showtime.findByIdAndDelete(req.params.id);
    if (!showtime) return res.status(404).json({ msg: "Showtime not found" });
    res.json({ msg: "Showtime deleted successfully" });
  } catch (err) {
    console.error("Error deleting showtime:", err);
    res.status(500).json({ msg: "Failed to delete showtime" });
  }
};
