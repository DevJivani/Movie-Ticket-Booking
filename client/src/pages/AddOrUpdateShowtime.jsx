"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getAllMovies } from "../services/movieService"
import { getAllCinemas } from "../services/cinemaService"
import { getTheatersByCinemaId } from "../services/theaterService"
import { addShowtime } from "../services/showtimeService"

const AddOrUpdateShowtime = () => {
  const { cinemaId, theaterId, movieId } = useParams()
  const [message, setMessage] = useState("")
  const navigate = useNavigate()

  const addCinemaShow = cinemaId && movieId ? true : false

  const [movies, setMovies] = useState([])
  const [cinemas, setCinemas] = useState([])
  const [theaters, setTheaters] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    movieId: movieId || "",
    cinemaId: cinemaId || "",
    theaterId: "",
    showDate: "",
    showTime: "",
    pricePerTicket: "",
  })

  // Fetch all movies and cinemas on mount
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true)
        const [movieList, cinemaList] = await Promise.all([getAllMovies(), getAllCinemas()])
        setMovies(movieList)
        setCinemas(cinemaList)
      } catch (err) {
        console.error("Init fetch error:", err.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchInitialData()
  }, [])

  // Fetch theaters when cinemaId changes
  useEffect(() => {
    if (formData.cinemaId) {
      const fetchTheaters = async () => {
        try {
          setIsLoading(true)
          const theaterList = await getTheatersByCinemaId(formData.cinemaId)
          setTheaters(theaterList)
        } catch (err) {
          console.error("Fetch theaters error:", err.message)
        } finally {
          setIsLoading(false)
        }
      }
      fetchTheaters()
    } else {
      setTheaters([])
    }
  }, [formData.cinemaId])

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage("")
    setIsLoading(true)

    try {
      await addShowtime(formData)
      setFormData({
        movieId: movieId || "",
        cinemaId: cinemaId || "",
        theaterId: "",
        showDate: "",
        showTime: "",
        pricePerTicket: "",
      })
      setMessage("Show added successfully!")
      if (movieId) setTimeout(() => navigate(`/book/${movieId}`), 1000)
    } catch (err) {
      setMessage(err.message || "Something went wrong.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Back button */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-800 transition-colors duration-200"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4">
            <h2 className="text-xl font-bold text-white flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {theaterId ? "Update Showtime" : "Add Showtime"}
            </h2>
            <p className="text-purple-100 text-sm mt-1">
              {addCinemaShow ? "Adding show for selected movie and cinema" : "Create a new showtime for any movie"}
            </p>
          </div>

          {/* Message */}
          {message && (
            <div
              className={`px-6 py-3 border-l-4 ${
                message.includes("success")
                  ? "bg-green-50 border-green-500 text-green-700"
                  : "bg-red-50 border-red-500 text-red-700"
              }`}
            >
              <div className="flex items-center">
                {message.includes("success") ? (
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                {message}
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Movie Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Movie</label>
                <div className="relative">
                  <select
                    name="movieId"
                    value={formData.movieId}
                    onChange={handleChange}
                    className={`w-full border rounded-lg py-2.5 pl-3 pr-10 text-sm ${
                      addCinemaShow
                        ? "bg-gray-100 border-gray-200 text-gray-700 cursor-not-allowed"
                        : "border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    }`}
                    required
                    disabled={addCinemaShow}
                  >
                    <option value="">Select movie</option>
                    {movies.map((movie) => (
                      <option key={movie._id} value={movie._id}>
                        {movie.title}
                      </option>
                    ))}
                  </select>
                </div>
                {addCinemaShow && (
                  <p className="mt-1 text-xs text-purple-600">Movie is pre-selected based on your navigation</p>
                )}
              </div>

              {/* Cinema Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cinema</label>
                <div className="relative">
                  <select
                    name="cinemaId"
                    value={formData.cinemaId}
                    onChange={handleChange}
                    className={`w-full border rounded-lg py-2.5 pl-3 pr-10 text-sm ${
                      addCinemaShow
                        ? "bg-gray-100 border-gray-200 text-gray-700 cursor-not-allowed"
                        : "border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    }`}
                    required
                    disabled={addCinemaShow}
                  >
                    <option value="">Select cinema</option>
                    {cinemas.map((cinema) => (
                      <option key={cinema._id} value={cinema._id}>
                        {cinema.name}
                      </option>
                    ))}
                  </select>
                </div>
                {addCinemaShow && (
                  <p className="mt-1 text-xs text-purple-600">Cinema is pre-selected based on your navigation</p>
                )}
              </div>

              {/* Theater Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Theater</label>
                <div className="relative">
                  <select
                    name="theaterId"
                    value={formData.theaterId}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg py-2.5 pl-3 pr-10 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    required
                  >
                    <option value="">Select theater</option>
                    {theaters.map((theater) => (
                      <option key={theater._id} value={theater._id}>
                        {theater.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Show Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Show Date</label>
                <input
                  type="date"
                  name="showDate"
                  value={formData.showDate}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg py-2.5 px-3 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>

              {/* Show Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Show Time</label>
                <input
                  type="time"
                  name="showTime"
                  value={formData.showTime}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg py-2.5 px-3 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>

              {/* Price per Ticket */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price per Ticket ($)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    name="pricePerTicket"
                    value={formData.pricePerTicket}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg py-2.5 pl-7 pr-3 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-2.5 px-4 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </>
                ) : theaterId ? (
                  "Update Showtime"
                ) : (
                  "Add Showtime"
                )}
              </button>
            </div>
          </form>

          {/* Help Text */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center text-sm text-gray-600">
              <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>
                All showtimes will be available for booking immediately after creation. Make sure all details are
                correct.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddOrUpdateShowtime
