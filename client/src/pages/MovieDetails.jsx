"use client"

import { useParams, Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { getMovieById, deleteMovie } from "../services/movieService"
import { useAuth } from "../context/AuthContext"

const MovieDetails = () => {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const loadMovie = async () => {
      try {
        setLoading(true)
        const data = await getMovieById(id)
        console.log(data)
        setMovie(data)
      } catch (error) {
        console.error("Failed to load movie:", error)
      } finally {
        setLoading(false)
      }
    }
    loadMovie()
  }, [id])

  const handleDelete = async () => {
    try{
      await deleteMovie(id);
      navigate("/");
    } catch(e) {
      alert("there is some error while deleting movie");
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    )
  }

  if (!movie) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h2 className="text-2xl font-bold mb-4">Movie not found</h2>
        <Link to="/" className="text-red-600 hover:text-red-700">
          Return to home
        </Link>
      </div>
    )
  }

  // Format duration to hours and minutes
  const hours = Math.floor(movie.duration / 60)
  const minutes = movie.duration % 60
  const formattedDuration = `${hours > 0 ? `${hours}h` : ""} ${minutes > 0 ? `${minutes}m` : ""}`

  return (
    <div className="relative">
      {/* Hero Banner with Gradient Overlay */}
      <div className="relative min-h-[95vh] w-full">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage: `url("${movie.photos[1]}")`,
            backgroundPosition: "center 20%",
          }}
        ></div>

        {/* Gradient overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent z-10"></div>

        {/* Content overlay */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-12 lg:p-16 text-white">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">{movie.title}</h1>

            {/* Age rating and description */}
            <div className="mb-4">
              <span className="inline-block bg-gray-800 text-white px-2 py-1 text-xs font-bold rounded mr-2">
                {movie.ageRating || "PG-13"}
              </span>
              <p className="text-lg md:text-xl mt-2 max-w-2xl">{movie.description}</p>
            </div>

            {/* Genre tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {movie.genre.map((genre, index) => (
                <span key={index} className="px-3 py-1 bg-gray-800/80 text-white text-sm rounded-full backdrop-blur-sm">
                  {genre}
                </span>
              ))}
            </div>

            {/* Movie details */}
            <div className="text-gray-300 text-sm mb-6">
              <div className="mb-2">
                <span className="text-blue-400">director: </span>
                <span>{movie.directors?.join(", ")}</span>
              </div>
              {movie.writers && (
                <div>
                  <span className="text-blue-400">writers: </span>
                  <span>{movie.writers?.join(", ")}</span>
                </div>
              )}
              {movie.stars && (
                <div>
                  <span className="text-blue-400">stars: </span>
                  <span>{movie.stars?.join(", ")}</span>
                </div>
              )}
            </div>

            {/* Rating, duration and release */}
            <div className="flex flex-wrap items-center gap-6 text-sm">
              {movie.rating && (
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-red-500 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <span className="font-bold">{movie.rating}/10</span>
                </div>
              )}

              <div className="px-3 py-1 bg-gray-800/80 rounded backdrop-blur-sm">{formattedDuration}</div>

              {movie.releaseDate && (
                <div className="flex items-center">
                  <span className="text-gray-400 mr-1">release</span>
                  <span>{new Date(movie.releaseDate).toLocaleDateString()}</span>
                </div>
              )}
            </div>

            {/* Book ticket button */}
            {user && user.role != "admin" && (<div className="mt-8">
              <Link
                to={`/book/${movie._id}`}
                className="inline-block bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Book Ticket
              </Link>
            </div>)}
            {user && user.role == "admin" && (<div className="mt-8">
              <Link
                onClick={handleDelete}
                className="inline-block bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Delete
              </Link>
            </div>)}
            {user && user.role == "admin" && (<div className="mt-8">
              <Link
                to={`/edit-movie/${movie._id}`}
                className="inline-block bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Update 
              </Link>
            </div>)}
          </div>
        </div>
      </div>

      {/* Additional movie details section */}
      {/* <div className="container mx-auto py-12 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="md:col-span-1">
            <img src={movie.photos[0] || "/placeholder.svg"} alt={movie.title} className="w-full rounded-lg shadow-lg" />
          </div>

          <div className="md:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Synopsis</h2>
              <p className="text-gray-700 leading-relaxed">{movie.description}</p>
            </div>

            {movie.cast && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Cast</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {movie.cast.map((actor, index) => (
                    <div key={index} className="text-gray-700">
                      {actor}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-gray-100 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Movie Info</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">
                    <span className="font-semibold">Release Date:</span>{" "}
                    {movie.releaseDate ? new Date(movie.releaseDate).toLocaleDateString() : "N/A"}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Duration:</span> {formattedDuration}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Genre:</span> {movie.genre.join(", ")}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">
                    <span className="font-semibold">Director:</span> {movie.directors?.join(", ")}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Language:</span> {movie.language || "English"}
                  </p>
                  {movie.rating && (
                    <p className="text-gray-600">
                      <span className="font-semibold">Rating:</span> {movie.rating}/10
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default MovieDetails
