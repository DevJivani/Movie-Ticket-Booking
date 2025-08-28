"use client"

import { useEffect, useState } from "react"
import { useParams, useLocation } from "react-router-dom"
import { getTheaterById, getBookedSeats, createBooking } from "../services/bookingService"
import { getShowtimeById } from "../services/showtimeService"
import SeatGrid from "../components/SeatGrid"

const SeatBooking = () => {
  const { showtimeId } = useParams()
  const [theater, setTheater] = useState(null)
  const [showtime, setShowtime] = useState(null)
  const [bookedSeats, setBookedSeats] = useState([])
  const [selectedSeats, setSelectedSeats] = useState([])
  const location = useLocation()
  const [selectedDate, setSelectedDate] = useState(location.state?.selectedDate || "")
  const [isLoading, setIsLoading] = useState(true)
  const [bookingStatus, setBookingStatus] = useState({ success: false, message: "" })
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const showtime = await getShowtimeById(showtimeId)
        const theaterData = await getTheaterById(showtime.theaterId._id)
        const booked = await getBookedSeats(showtimeId, selectedDate)

        setShowtime(showtime)
        setTheater(theaterData)
        setBookedSeats(booked)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [showtimeId, selectedDate])

  const handleSelect = (seatLabel) => {
    // Don't allow seat selection if we just completed a booking
    if (bookingStatus.success) return

    setSelectedSeats((prev) => (prev.includes(seatLabel) ? prev.filter((s) => s !== seatLabel) : [...prev, seatLabel]))
  }

  const handleBooking = async () => {
    if (!selectedDate) {
      setBookingStatus({
        success: false,
        message: "Please select a date before booking.",
      })
      return
    }

    if (selectedSeats.length === 0) {
      setBookingStatus({
        success: false,
        message: "Please select at least one seat.",
      })
      return
    }

    setIsProcessing(true)

    const bookSeats = selectedSeats.map((seat) => {
      const match = seat.match(/^([A-Z]+)(\d+)$/i)
      if (match) {
        return {
          row: match[1],
          number: Number.parseInt(match[2], 10),
        }
      }
      return null
    })

    const numberOfTickets = bookSeats.length
    const price = showtime?.pricePerTicket || 0

    const bookingData = {
      showtimeId,
      seats: bookSeats,
      date: selectedDate,
      totalPrice: price * numberOfTickets,
    }

    try {
      const res = await createBooking(bookingData)

      // Update the booked seats to include the newly booked seats
      setBookedSeats((prev) => [...prev, ...bookSeats])

      // Clear the selected seats
      setSelectedSeats([])

      // Show success message
      setBookingStatus({
        success: true,
        message: "Your booking was successful! Your tickets have been confirmed.",
      })

      console.log(res.data)
    } catch (error) {
      setBookingStatus({
        success: false,
        message: error.response?.data?.msg || "Booking failed. Please try again.",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const resetBookingStatus = () => {
    setBookingStatus({ success: false, message: "" })
  }

  const calculateTotal = () => {
    const basePrice = showtime?.pricePerTicket || 10
    // Premium seats cost more
    return selectedSeats.reduce((total, seat) => {
      const isPremium = ["R"].includes(seat[0])
      return total + (isPremium ? basePrice * 1.5 : basePrice)
    }, 0)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading theater information...</p>
        </div>
      </div>
    )
  }

  if (!theater) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <p className="text-red-500">Theater information not available</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Status Messages */}
        {bookingStatus.message && (
          <div
            className={`mb-6 p-4 rounded-lg ${bookingStatus.success ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}
          >
            <div className="flex items-center">
              {bookingStatus.success ? (
                <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              <p className={bookingStatus.success ? "text-green-700" : "text-red-700"}>{bookingStatus.message}</p>
              <button onClick={resetBookingStatus} className="ml-auto text-gray-400 hover:text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-wrap justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{showtime?.movieId?.title || "Select Your Seats"}</h1>
              <p className="text-gray-600">
                {theater.name} • {showtime?.time || "Showtime"} • {selectedDate}
              </p>
            </div>
            <div className="bg-blue-50 px-4 py-2 rounded-lg">
              <p className="text-sm text-gray-600">Theater</p>
              <p className="font-bold text-gray-800">{theater.name}</p>
            </div>
          </div>

          <SeatGrid
            rows={theater.seatLayout.rows}
            seatsPerRow={theater.seatLayout.seatsPerRow}
            bookedSeats={bookedSeats}
            selectedSeats={selectedSeats}
            onSelect={handleSelect}
          />
        </div>

        {selectedSeats.length > 0 && !bookingStatus.success && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Booking Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Selected Seats:</span>
                <span className="font-medium">{selectedSeats.join(", ")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Number of Tickets:</span>
                <span className="font-medium">{selectedSeats.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Price per Standard Ticket:</span>
                <span className="font-medium">${showtime?.pricePerTicket || 10}.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Price per Premium Ticket:</span>
                <span className="font-medium">${(showtime?.pricePerTicket || 10) * 1.5}.00</span>
              </div>
              <div className="border-t pt-3 flex justify-between">
                <span className="font-bold">Total:</span>
                <span className="font-bold">${calculateTotal().toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleBooking}
              disabled={isProcessing}
              className={`w-full py-3 rounded-lg font-medium transition-colors ${
                isProcessing ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {isProcessing ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                </span>
              ) : (
                "Confirm Booking"
              )}
            </button>
          </div>
        )}

        {bookingStatus.success && (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Booking Successful!</h2>
            <p className="text-gray-600 mb-6">Your tickets have been confirmed and are ready for pickup.</p>
            <button
              onClick={() => setBookingStatus({ success: false, message: "" })}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Book More Tickets
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default SeatBooking
