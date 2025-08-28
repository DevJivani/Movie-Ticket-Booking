import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import MovieDetails from "./pages/MovieDetails"
import MovieShowtimes from "./pages/MovieShowtimes"
import SeatBooking from "./pages/SeatBooking"
import CinemaList from "./pages/CinemaList"
import AddOrUpdateCinema from "./pages/AddOrUpdateCinema"
import AddOrUpdateTheater from "./pages/AddOrUpdateTheater"
import ViewTheaters from "./pages/ViewTheaters"
import AddOrUpdateMovie from "./pages/AddOrUpdateMovie"
import AddOrUpdateShowtime from "./pages/AddOrUpdateShowtime"
import ViewBookings from "./pages/ViewBookings"
import UserProfile from "./pages/UserProfile"

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />

        <main className="flex-grow pt-14 sm:pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/movies/:id" element={<MovieDetails />} />
            <Route path="/book/:movieId" element={<MovieShowtimes />} />
            <Route path="/select-seat/:showtimeId" element={<SeatBooking />} />
            <Route path="/add-cinema" element={<AddOrUpdateCinema />} />
            <Route path="/update-cinema/:id" element={<AddOrUpdateCinema />} />
            <Route path="/add-theater/:cinemaId" element={<AddOrUpdateTheater />} />
            <Route path="/edit-theater/:theaterId" element={<AddOrUpdateTheater />} />
            <Route path="/add-movie" element={<AddOrUpdateMovie />} />
            <Route path="/edit-movie/:movieId" element={<AddOrUpdateMovie />} />
            <Route path="/view-cinema/:id" element={<ViewTheaters />} />
            <Route path="/add-show" element={<AddOrUpdateShowtime />} />
            <Route path="/add-show/:movieId/:cinemaId" element={<AddOrUpdateShowtime />} />
            <Route path="/cinemas" element={<CinemaList />} />
            <Route path="/my-bookings" element={<ViewBookings />} />
            <Route path="/update-profile" element={<UserProfile />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  )
}

export default App
