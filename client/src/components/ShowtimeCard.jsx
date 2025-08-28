// import { useNavigate, Link } from "react-router-dom"

// const ShowtimeCard = ({ cinema, movieId, selectedDate }) => {
//   const navigate = useNavigate()
//   console.log(cinema, movieId)

//   return (
//     <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
//       <div className="bg-gray-800 px-4 py-3">
//         <h3 className="text-lg font-medium text-white">
//           {cinema.cinemaName}
//           <Link to={`/add-show/${movieId}/${cinema.cinemaId}`}>
//           <button className="ml-4 px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700">
//             Add Show
//           </button>
//         </Link>
//         </h3>
//         {/* <p className="text-gray-300 text-sm">{cinema.cinemaId}</p> */}
        
//       </div>

//       <div className="p-4">
//         {cinema.shows.map((show, index) => (
//           <div key={show.theaterId} className={`${index > 0 ? "border-t border-gray-100 pt-4 mt-4" : ""}`}>
//             <div className="mb-3">
//               <h4 className="font-medium text-gray-900">
//                 {show.theaterName}
//                 {/* <Link
//                   to={`/edit-show/${show.theaterId}`}
//                   state={{
//                     movieId: movieId,
//                     cinemaId: cinema.cinemaId,
//                     theaterId: show.theaterId,
//                     times: show.times,
//                     showtimeIds: show.showtimeIds,
//                     pricePerTicket: show.pricePerTicket,
//                   }}
//                 >
//                   <button className="text-sm text-blue-600 hover:underline">Update</button>
//                 </Link> */}
//               </h4>
//               {/* <p className="text-sm text-gray-500">Screen {show.theaterId}</p> */}
//             </div>

//             <div className="flex flex-wrap gap-2">
//               {show.times.map((time, timeIndex) => (
//                 <Link
//                   key={show.showtimeIds[timeIndex]}
//                   to={`/select-seat/${show.showtimeIds[timeIndex]}`}
//                   state={{ selectedDate }}
//                 >
//                   <button className="px-4 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-colors">
//                     {time}
//                   </button>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default ShowtimeCard



"use client"

import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useEffect } from "react"

const ShowtimeCard = ({ cinema, movieId, selectedDate }) => {
  const navigate = useNavigate()
  const {user} = useAuth()
  console.log(cinema, movieId)

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Cinema Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">{cinema.cinemaName}</h3>
          </div>
          {user && user.role == "admin" && (<Link to={`/add-show/${movieId}/${cinema.cinemaId}`}>
            <button className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-medium rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105 shadow-md">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Show
            </button>
          </Link>)}
        </div>
      </div>

      {/* Shows Content */}
      <div className="p-6">
        {cinema.shows.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-2">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-gray-500 text-sm">No shows available</p>
          </div>
        ) : (
          <div className="space-y-6">
            {cinema.shows.map((show, index) => (
              <div
                key={show.theaterId}
                className={`${index > 0 ? "border-t border-gray-100 pt-6" : ""} transition-all duration-200`}
              >
                {/* Theater Info */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                      Theater No: {show.theaterName}
                    </h4>
                    {/* <div className="flex items-center space-x-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        🎭 Theater
                      </span>
                    </div> */}
                  </div>

                  {/* Theater Details */}
                  {/* <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                        />
                      </svg>
                      ${show.pricePerTicket || "12"}.00
                    </span>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {show.times.length} Shows
                    </span>
                  </div> */}
                </div>

                {/* Showtimes */}
                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Available Showtimes
                  </h5>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {/* {show.times.map((time, timeIndex) => (
                      <Link
                        key={show.showtimeIds[timeIndex]}
                        to={`/select-seat/${show.showtimeIds[timeIndex]}`}
                        state={{ selectedDate }}
                        className="group"
                      >
                        <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg text-sm font-semibold text-blue-700 hover:from-blue-500 hover:to-indigo-600 hover:text-white hover:border-blue-500 transition-all duration-200 transform hover:scale-105 hover:shadow-md group-hover:shadow-lg">
                          <div className="flex flex-col items-center">
                            <span className="text-lg">{time}</span>
                            <span className="text-xs opacity-75">Available</span>
                          </div>
                        </button>
                      </Link>
                    ))} */}

                    {show.times.map((time, timeIndex) => {
                      // Combine selectedDate (assumed format like "2025-06-04") and time (assumed "HH:mm" or similar)
                      const showDateTime = new Date(`${selectedDate}T${time}:00`); // ISO format with seconds
                      const now = new Date();

                      // Disable if selectedDate is today and showDateTime is before current time
                      const isDisabled = selectedDate === now.toISOString().split('T')[0] && showDateTime <= now;

                      return (
                        <Link
                          key={show.showtimeIds[timeIndex]}
                          to={`/select-seat/${show.showtimeIds[timeIndex]}`}
                          state={{ selectedDate }}
                          className="group"
                          onClick={e => isDisabled && e.preventDefault()} // prevent navigation if disabled
                        >
                          <button
                            disabled={isDisabled}
                            className={`w-full px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 transform
                              ${isDisabled 
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed border border-gray-400" 
                                : "bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-blue-700 hover:from-blue-500 hover:to-indigo-600 hover:text-white hover:border-blue-500 hover:scale-105 hover:shadow-md group-hover:shadow-lg"
                              }`}
                          >
                            <div className="flex flex-col items-center">
                              <span className="text-lg">{time}</span>
                              <span className="text-xs opacity-75">{isDisabled ? "Already Played" : "Available"}</span>
                            </div>
                          </button>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-50 px-6 py-3 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {selectedDate}
          </span>
          <span className="flex items-center">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
            {cinema.shows.reduce((total, show) => total + show.times.length, 0)} Shows Available
          </span>
        </div>
      </div>
    </div>
  )
}

export default ShowtimeCard
