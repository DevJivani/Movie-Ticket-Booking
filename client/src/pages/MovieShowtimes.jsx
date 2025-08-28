"use client"

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getShowtimesByMovieId } from "../services/showtimeService"
import ShowtimeCard from "../components/ShowtimeCard"
import DateSelector from "../components/DateSelector"
import { getMovieById } from "../services/movieService"

const MovieShowtimes = () => {
  const { movieId } = useParams()
  const [showtimes, setShowtimes] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [movie, setMovie] = useState(null)

  const formatDate = (date) => {
    const yy = date.getFullYear().toString()
    const mm = (date.getMonth() + 1).toString().padStart(2, "0")
    const dd = date.getDate().toString().padStart(2, "0")
    return `${yy}-${mm}-${dd}`
  }

  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()))

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        // Add a small delay to show loading state
        await new Promise((resolve) => setTimeout(resolve, 800))

        // Fetch both movie details and showtimes
        const [movieData, showtimesData] = await Promise.all([getMovieById(movieId), getShowtimesByMovieId(movieId)])

        setMovie(movieData)
        setShowtimes(showtimesData)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [movieId])



  const LoadingSkeleton = () => (
    <div className="space-y-6">
      {[1, 2, 3].map((item) => (
        <div key={item} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden animate-pulse">
          <div className="bg-gray-300 h-20"></div>
          <div className="p-6 space-y-4">
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            <div className="grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((btn) => (
                <div key={btn} className="h-12 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {isLoading ? (
        <div className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-white">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row items-center gap-8 animate-pulse">
              <div className="w-32 h-48 md:w-40 md:h-60 bg-white/20 rounded-xl"></div>
              <div className="flex-1 space-y-4">
                <div className="h-4 bg-white/20 rounded w-32"></div>
                <div className="h-12 bg-white/20 rounded w-3/4"></div>
                <div className="h-6 bg-white/20 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Hero Section */
        <div className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-white">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Movie Poster */}
              {movie?.photos[0] && (
                <div className="flex-shrink-0">
                  <img
                    src={`${movie.photos[0]}` || "/placeholder.svg"}
                    alt={movie.title}
                    className="w-32 h-48 md:w-40 md:h-60 object-cover rounded-xl shadow-2xl"
                  />
                </div>
              )}

              {/* Movie Details */}
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  Now Showing
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  {movie?.title || "Loading..."}
                </h1>

                {movie && (
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-4 text-blue-100">
                    {movie.genre && (
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 4V2a1 1 0 011-1h4a1 1 0 011 1v2m-6 0h8m-8 0H5a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2h-2"
                          />
                        </svg>
                        {movie.genre.map((genre, index) => (
                          <span key={index} className="px-3 py-1 text-white text-sm ">
                            {genre}
                          </span>
                        ))}
                      </span>
                    )}
                    {movie.duration && (
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {movie.duration} min
                      </span>
                    )}
                  </div>
                )}

                <p className="text-xl text-blue-100 max-w-2xl">
                  Book Your Perfect Show & Select your preferred date and time for an unforgettable cinema experience
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Date Selection Section */}
        <div className="mb-8">
          <DateSelector selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        </div>

        {/* Showtimes Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <svg className="w-6 h-6 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0h2M7 7h10M7 11h10M7 15h10"
                  />
                </svg>
                Available Cinemas
              </h2>
              <p className="text-gray-600 mt-1">
                {showtimes.length} cinema{showtimes.length !== 1 ? "s" : ""} showing this movie
              </p>
            </div>

            {/* Filter/Sort Options */}
            {/* <div className="hidden md:flex items-center space-x-3">
              <button className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
                Filter
              </button>
              <button className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                  />
                </svg>
                Sort
              </button>
            </div> */}
          </div>

          {/* Loading State */}
          {isLoading ? (
            <LoadingSkeleton />
          ) : showtimes.length === 0 ? (
            /* Empty State */
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Showtimes Available</h3>
                <p className="text-gray-600 mb-6">
                  Sorry, there are no showtimes available for the selected date. Please try a different date.
                </p>
                <button
                  onClick={() => setSelectedDate(formatDate(new Date()))}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Try Today's Shows
                </button>
              </div>
            </div>
          ) : (
            /* Showtimes Grid */
            <div className="space-y-6">
              {showtimes.map((cinema, index) => (
                <div
                  key={cinema.cinemaId}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ShowtimeCard cinema={cinema} movieId={movieId} selectedDate={selectedDate} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Additional Info Section */}
        {/* {showtimes.length > 0 && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Booking Information</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Tickets can be cancelled up to 2 hours before showtime</li>
                  <li>• Premium seats include complimentary snacks and drinks</li>
                  <li>• Arrive 15 minutes early for the best experience</li>
                  <li>• Mobile tickets are accepted at all locations</li>
                </ul>
              </div>
            </div>
          </div>
        )} */}
      </div>
    </div>
  )
}

export default MovieShowtimes
