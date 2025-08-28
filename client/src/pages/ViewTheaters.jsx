// import { useEffect, useState } from "react";
// import { getTheatersByCinemaId } from "../services/theaterService";
// import { useParams, useNavigate } from "react-router-dom";

// const ViewTheaters = () => {
//   const { id } = useParams(); // cinemaId
//   const navigate = useNavigate();
//   const [theaters, setTheaters] = useState([]);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const fetchTheaters = async () => {
//       try {
//         const data = await getTheatersByCinemaId(id);
//         setTheaters(data);
//       } catch (error) {
//         setMessage(error.message || "Failed to fetch theaters.");
//       }
//     };
//     fetchTheaters();
//   }, [id]);

//   return (
//     <div className="max-w-4xl mx-auto p-4 mt-6">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-bold">Theaters of Cinema</h2>
//         <button
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//           onClick={() => navigate(`/add-theater/${id}`)}
//         >
//           ➕ Add Theater
//         </button>
//       </div>

//       {message && <p className="text-red-600 mb-4">{message}</p>}

//       {theaters.length > 0 ? (
//         <table className="w-full border border-gray-300 text-sm">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="border px-4 py-2">#</th>
//               <th className="border px-4 py-2">Theater Name</th>
//               <th className="border px-4 py-2">Seats</th>
//               <th className="border px-4 py-2">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {theaters.map((theater, index) => (
//               <tr key={theater._id}>
//                 <td className="border px-4 py-2">{index + 1}</td>
//                 <td className="border px-4 py-2">{theater.name}</td>
//                 <td className="border px-4 py-2">{theater.totalSeats}</td>
//                 <td className="border px-4 py-2">
//                     <button
//                         onClick={() => navigate(`/edit-theater/${theater._id}`)}
//                         className="bg-yellow-400 text-white px-3 py-1 rounded mr-2"
//                         >
//                         Update
//                     </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No theaters found for this cinema.</p>
//       )}
//     </div>
//   );
// };

// export default ViewTheaters;

"use client"

import { useEffect, useState } from "react"
import { getTheatersByCinemaId } from "../services/theaterService"
import { useParams, useNavigate } from "react-router-dom"

const ViewTheaters = () => {
  const { id } = useParams() // cinemaId
  const navigate = useNavigate()
  const [theaters, setTheaters] = useState([])
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchTheaters = async () => {
      try {
        setIsLoading(true)
        const data = await getTheatersByCinemaId(id)
        setTheaters(data)
      } catch (error) {
        setMessage(error.message || "Failed to fetch theaters.")
      } finally {
        setIsLoading(false)
      }
    }
    fetchTheaters()
  }, [id])

  const getTotalSeats = () => {
    return theaters.reduce((total, theater) => total + theater.totalSeats, 0)
  }

  const LoadingSkeleton = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Theater Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seats</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {[1, 2, 3].map((item) => (
              <tr key={item} className="animate-pulse">
                <td className="px-6 py-4">
                  <div className="h-4 bg-gray-200 rounded w-8"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-8 bg-gray-200 rounded w-20"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <button
              onClick={() => navigate("/cinemas")}
              className="inline-flex items-center py-2 text-sm font-medium text-purple-600 hover:text-purple-900 transition-colors duration-200"
            >
              <svg className="w-4 h-4 m-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Cinemas
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-4 sm:mb-0">
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <svg className="w-8 h-8 mr-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 4V2a1 1 0 011-1h4a1 1 0 011 1v2m-6 0h8m-8 0H5a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2h-2"
                  />
                </svg>
                Theater Management
              </h1>
              <p className="mt-2 text-gray-600">
                Manage theaters for Cinema
              </p>
            </div>
            <button
              className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg shadow-sm transition-colors duration-200 transform hover:scale-105"
              onClick={() => navigate(`/add-theater/${id}`)}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Theater
            </button>
          </div>
        </div>

        {/* Error Message */}
        {message && (
          <div className="mb-6 p-4 rounded-lg border bg-red-50 border-red-200 text-red-800">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {message}
            </div>
          </div>
        )}

        {/* Theater Table */}
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      #
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Theater Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Seat Capacity
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {theaters.length > 0 ? (
                    theaters.map((theater, index) => (
                      <tr key={theater._id} className="hover:bg-gray-50 transition-colors duration-150">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex pl-1 items-center justify-center">
                              <svg
                                className="w-5 h-5 text-purple-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M7 4V2a1 1 0 011-1h4a1 1 0 011 1v2m-6 0h8m-8 0H5a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2h-2"
                                />
                              </svg>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{theater.name}</div>
                              <div className="text-sm text-gray-500">Theater ID: {theater._id.slice(-6)}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <svg
                              className="w-4 h-4 mr-2 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                              />
                            </svg>
                            <span className="text-sm font-medium text-gray-900">{theater.totalSeats}</span>
                            <span className="text-sm text-gray-500 ml-1">seats</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => navigate(`/edit-theater/${theater._id}`)}
                              className="inline-flex items-center px-3 py-1.5 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 text-xs font-medium rounded-md transition-colors duration-150"
                            >
                              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                              Edit
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center">
                          <svg
                            className="w-12 h-12 text-gray-400 mb-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M7 4V2a1 1 0 011-1h4a1 1 0 011 1v2m-6 0h8m-8 0H5a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2h-2"
                            />
                          </svg>
                          <h3 className="text-lg font-medium text-gray-900 mb-2">No theaters found</h3>
                          <p className="text-gray-500 mb-4">Get started by adding your first theater to this cinema.</p>
                          <button
                            onClick={() => navigate(`/add-theater/${id}`)}
                            className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors duration-200"
                          >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                              />
                            </svg>
                            Add First Theater
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ViewTheaters
