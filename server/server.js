const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const movieRoutes = require("./routes/movieRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const showtimeRoutes = require("./routes/showtimeRoutes");
const cinemaRoutes = require("./routes/cinemaRoutes");
const theaterRoutes = require("./routes/theaterRoutes");
const uploadRoute = require("./routes/uploadRoute")
const path = require("path")

dotenv.config();
const app = express();

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = [
      process.env.VITE_FRONTEND_URL,
      'http://localhost:5173',
      'http://127.0.0.1:5173',
      'http://localhost:3000',
      'http://127.0.0.1:3000'
    ].filter(Boolean);

    // Allow non-browser requests or same-origin
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 204,
}));
app.use(cookieParser());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "../../client/public/images")));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/showtimes", showtimeRoutes);
app.use("/api/cinemas", cinemaRoutes);
app.use("/api/theaters", theaterRoutes);
app.use('/api/upload', uploadRoute);

// DB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => app.listen(process.env.PORT, () => {
console.log("MongoDB Connected Successfully")
console.log("Server running on port 5000")
}))
.catch((err) => console.error(err));