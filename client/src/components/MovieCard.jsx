"use client"

import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { getMe } from "../services/authService"
import { useAuth } from "../context/AuthContext"

const MovieCard = ({ movie }) => {
  const navigate = useNavigate()
  const { user, isLogin } = useAuth()
  console.log("movie", movie);

  const handleBookNow = async () => {
    try {
      const user = await getMe()
      if (!user) {
        navigate("/login")
      } else {
        navigate(`/book/${movie._id}`)
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden flex flex-col h-full">
      {/* Movie Poster - Responsive Height Container */}
      <div className="relative aspect-[2/3] overflow-hidden bg-gray-100">
        <img
          src={`${movie.photos[0]}` || "/placeholder.svg?height=400&width=300"}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.target.src = "/error.svg?height=400&width=300"
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Movie Info - Auto Height Container */}
      <div className="p-3 sm:p-4 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {movie.title}
          </h3>

          {/* Genre Tags */}
          <div className="flex flex-wrap gap-1 mb-2 sm:mb-3">
            {movie.genre.slice(0, 1).map((genre, index) => (
              <span
                key={index}
                className="px-2 py-0.5 sm:py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium"
              >
                {genre}
              </span>
            ))}
            {movie.genre.length > 1 && (
              <span className="px-2 py-0.5 sm:py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">
                +{movie.genre.length - 1}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-2">
          <Link
            to={`/movies/${movie._id}`}
            className="flex-1 px-2 sm:px-3 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-center font-medium text-xs sm:text-sm"
          >
            View Details
          </Link>
          {/* {isLogin && user && user.role === "admin" ? (
            <button
              onClick={handleBookNow}
              className="flex-1 px-2 sm:px-3 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all transform hover:scale-105 font-medium text-xs sm:text-sm shadow-lg"
            >
              View Shows
            </button>
          ) : (
            <button
              onClick={handleBookNow}
              className="flex-1 px-2 sm:px-3 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all transform hover:scale-105 font-medium text-xs sm:text-sm shadow-lg"
            >
              Book Now
            </button>
          )} */}
          {isLogin && <button
              onClick={handleBookNow}
              className="flex-1 px-2 sm:px-3 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all transform hover:scale-105 font-medium text-xs sm:text-sm shadow-lg"
            >
              { user && user.role == "admin" ? "View Shows" : "Book Now"}
            </button>}
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
    </div>
  )
}

export default MovieCard
