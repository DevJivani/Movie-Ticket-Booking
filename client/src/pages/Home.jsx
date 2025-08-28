// "use client"

// import { useEffect, useState } from "react"
// import { getAllMovies } from "../services/movieService"
// import MovieCard from "../components/MovieCard"

// const Home = () => {
//   const [movies, setMovies] = useState([])

//   useEffect(() => {
//     const loadMovies = async () => {
//       const data = await getAllMovies()
//       setMovies(data)
//     }
//     loadMovies()
//   }, [])

//   return (
//     <div className="p-4 md:p-8">
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
//         {movies.map((movie) => (
//           <MovieCard key={movie._id} movie={movie} />
//         ))}
//       </div>
//     </div>
//   )
// }

// export default Home


"use client"

import { useEffect, useState } from "react"
import { getAllMovies } from "../services/movieService"
import MovieCard from "../components/MovieCard"

const Home = () => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true)
        const data = await getAllMovies()
        console.log(data)
        setMovies(data)
      } catch (error) {
        console.error("Error loading movies:", error)
      } finally {
        setLoading(false)
      }
    }
    loadMovies()
  }, [])

  return (
    <div className="p-3 sm:p-4 md:p-8">
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Home
