"use client"

import { useEffect, useState } from "react"
import { getCinemaById } from "../services/cinemaService"
import { getTheaterById, addTheater, updateTheater } from "../services/theaterService"
import { useParams, useNavigate } from "react-router-dom"

const AddOrUpdateTheater = () => {
  const { cinemaId, theaterId } = useParams()
  const navigate = useNavigate()

  const [cinemaName, setCinemaName] = useState("")
  const [cinemaIdState, setCinemaIdState] = useState(cinemaId || "")
  const [name, setName] = useState("")
  const [totalSeats, setTotalSeats] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isEdit = Boolean(theaterId)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        if (isEdit) {
          const theater = await getTheaterById(theaterId)
          setName(theater.name)
          setTotalSeats(theater.totalSeats)
          setCinemaIdState(theater.cinemaId)

          const cinema = await getCinemaById(theater.cinemaId)
          setCinemaName(cinema.name)
        } else {
          const cinema = await getCinemaById(cinemaId)
          setCinemaName(cinema.name)
        }
      } catch (err) {
        setMessage(err.message || "Error loading data")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [cinemaId, theaterId, isEdit])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage("")
    setIsSubmitting(true)

    try {
      if (isEdit) {
        await updateTheater(theaterId, {
          name,
          totalSeats,
          cinemaId: cinemaIdState,
        })
        setMessage("Theater updated successfully!")
      } else {
        await addTheater({
          name,
          totalSeats,
          cinemaId: cinemaIdState,
        })
        setMessage("Theater added successfully!")
        setName("")
        setTotalSeats("")
      }

      setTimeout(() => navigate(`/view-cinema/${cinemaIdState}`), 1000)
    } catch (err) {
      setMessage(err.message || "Failed to save.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Back button */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
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
                  d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V3a1 1 0 011 1v10a1 1 0 01-1 1H8a1 1 0 01-1-1V4m0 0H5a1 1 0 00-1 1v10a1 1 0 001 1h2m0 0v2a1 1 0 001 1h8a1 1 0 001-1v-2m0 0V9a1 1 0 00-1-1H8a1 1 0 00-1 1v6z"
                />
              </svg>
              {isEdit ? "Update Theater" : "Add New Theater"}
            </h2>
            <p className="text-purple-100 text-sm mt-1">
              {isEdit ? "Update theater information and seating capacity" : "Create a new theater for this cinema"}
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

          {/* Loading State */}
          {loading ? (
            <div className="p-6 flex items-center justify-center">
              <div className="flex items-center space-x-3">
                <svg
                  className="animate-spin h-5 w-5 text-purple-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span className="text-gray-600">Loading theater details...</span>
              </div>
            </div>
          ) : (
            /* Form */
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Cinema Name (Read-only) */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cinema</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      value={cinemaName}
                      readOnly
                      className="w-full border border-gray-200 rounded-lg py-2.5 pl-10 pr-3 text-sm bg-gray-50 text-gray-700 cursor-not-allowed"
                    />
                  </div>
                  <p className="mt-1 text-xs text-purple-600">Cinema is pre-selected and cannot be changed</p>
                </div>

                {/* Theater Name */}
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Theater Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V3a1 1 0 011 1v10a1 1 0 01-1 1H8a1 1 0 01-1-1V4m0 0H5a1 1 0 00-1 1v10a1 1 0 001 1h2m0 0v2a1 1 0 001 1h8a1 1 0 001-1v-2m0 0V9a1 1 0 00-1-1H8a1 1 0 00-1 1v6z"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="e.g., Theater 1, Hall A, IMAX Screen"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg py-2.5 pl-10 pr-3 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
                      required
                    />
                  </div>
                </div>

                {/* Total Seats */}
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total Seats</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                    <input
                      type="number"
                      placeholder="e.g., 150"
                      value={totalSeats}
                      onChange={(e) => setTotalSeats(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg py-2.5 pl-10 pr-3 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
                      min="1"
                      max="1000"
                      required
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Enter the maximum seating capacity</p>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-2.5 px-4 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
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
                      {isEdit ? "Updating..." : "Adding..."}
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d={
                            isEdit
                              ? "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              : "M12 6v6m0 0v6m0-6h6m-6 0H6"
                          }
                        />
                      </svg>
                      {isEdit ? "Update Theater" : "Add Theater"}
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

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
                {isEdit
                  ? "Update theater details. The seating capacity affects booking availability for showtimes."
                  : "Add a new theater to this cinema. Make sure to set the correct seating capacity as it will be used for booking management."}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddOrUpdateTheater
