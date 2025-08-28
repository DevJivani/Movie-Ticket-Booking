"use client"

import { useEffect, useState, useRef } from "react"
import { getUserBookings } from "../services/bookingService"
import { useAuth } from "../context/AuthContext"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"
import QRCode from "qrcode"

const ViewBookings = () => {
  const { user } = useAuth()
  const [bookings, setBookings] = useState([])
  const [qrCodes, setQrCodes] = useState({})
  const [loading, setLoading] = useState(true)
  const [downloadingPdf, setDownloadingPdf] = useState({})
  const hiddenPdfRef = useRef({}) // reference to hidden printable layout

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true)
        const data = await getUserBookings(user._id)
        setBookings(data || [])

        const qrData = {}
        for (const booking of data || []) {
          const url = await QRCode.toDataURL(`BookingID:${booking.bookingId}`)
          qrData[booking.bookingId] = url
        }
        setQrCodes(qrData)
      } catch (err) {
        console.error("Failed to fetch bookings:", err)
      } finally {
        setLoading(false)
      }
    }

    if (user?._id) fetchBookings()
  }, [user])

  const handleDownloadPDF = async (bookingId) => {
    const pdfLayout = hiddenPdfRef.current[bookingId]
    if (!pdfLayout) return

    setDownloadingPdf((prev) => ({ ...prev, [bookingId]: true }))

    try {
      const canvas = await html2canvas(pdfLayout, {
        backgroundColor: "#ffffff",
        scale: 2,
      })

      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF("p", "mm", "a4")
      const width = pdf.internal.pageSize.getWidth()
      const height = (canvas.height * width) / canvas.width

      pdf.addImage(imgData, "PNG", 0, 0, width, height)
      pdf.save(`Booking-${bookingId}.pdf`)
    } catch (error) {
      console.error("Error generating PDF:", error)
    } finally {
      setDownloadingPdf((prev) => ({ ...prev, [bookingId]: false }))
    }
  }

  const formatDateTime = (dateString) => {
    const date = new Date(dateString)
    return {
      date: date.toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      time: date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex items-center space-x-3">
              <svg
                className="animate-spin h-8 w-8 text-purple-600"
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
              <span className="text-lg text-gray-600">Loading your bookings...</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-2">
            <svg className="w-8 h-8 mr-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
              />
            </svg>
            <h1 className="text-3xl font-bold text-gray-900">Your Bookings</h1>
          </div>
          <p className="text-gray-600">Manage and download your movie tickets</p>
        </div>

        {bookings.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-12 text-center">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings found</h3>
            <p className="text-gray-600 mb-6">You haven't made any movie bookings yet.</p>
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300">
              Browse Movies
            </button>
          </div>
        ) : (
          /* Bookings Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking) => {
              const showDateTime = formatDateTime(booking.showtime.showDate)
              return (
                <div
                  key={booking.bookingId}
                  className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  {/* Card Header */}
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-white">Booking Confirmed</h3>
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <p className="text-purple-100 text-sm">ID: {booking.bookingId}</p>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    {/* Movie Title */}
                    <div className="mb-4">
                      <h4 className="text-xl font-bold text-gray-900 mb-1">{booking.movie.title}</h4>
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>
                          {showDateTime.date} • {showDateTime.time}
                        </span>
                      </div>
                    </div>

                    {/* Booking Details */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-sm">
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
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                        <span className="text-gray-600">{booking.cinema.name}</span>
                      </div>

                      <div className="flex items-center text-sm">
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
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span className="text-gray-600">{booking.cinema.location}</span>
                      </div>

                      <div className="flex items-center text-sm">
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
                            d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V3a1 1 0 011 1v10a1 1 0 01-1 1H8a1 1 0 01-1-1V4m0 0H5a1 1 0 00-1 1v10a1 1 0 001 1h2m0 0v2a1 1 0 001 1h8a1 1 0 001-1v-2m0 0V9a1 1 0 00-1-1H8a1 1 0 00-1 1v6z"
                          />
                        </svg>
                        <span className="text-gray-600">{booking.theater.name}</span>
                      </div>

                      <div className="flex items-center text-sm">
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
                        <span className="text-gray-600">
                          Seats: {booking.seats.map((s) => `${s.row}-${s.number}`).join(", ")}
                        </span>
                      </div>
                    </div>

                    {/* Price and QR Code */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Total Amount</p>
                        <p className="text-2xl font-bold text-green-600">₹{booking.totalPrice}</p>
                      </div>
                      {qrCodes[booking.bookingId] && (
                        <div className="text-center">
                          <img
                            src={qrCodes[booking.bookingId] || "/placeholder.svg"}
                            alt="QR Code"
                            className="w-16 h-16 mx-auto mb-1"
                          />
                          <p className="text-xs text-gray-500">Scan for Entry</p>
                        </div>
                      )}
                    </div>

                    {/* Download Button */}
                    <button
                      onClick={() => handleDownloadPDF(booking.bookingId)}
                      disabled={downloadingPdf[booking.bookingId]}
                      className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-2.5 px-4 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {downloadingPdf[booking.bookingId] ? (
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
                          Generating PDF...
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                          Download PDF
                        </>
                      )}
                    </button>

                    {/* Hidden printable PDF layout */}
                    <div
                      ref={(el) => (hiddenPdfRef.current[booking.bookingId] = el)}
                      style={{
                        position: "absolute",
                        top: "-9999px",
                        left: "-9999px",
                        width: "800px",
                        padding: "0",
                        backgroundColor: "#fff",
                        color: "#000",
                        fontFamily: "Arial, sans-serif",
                      }}
                    >
                      {/* PDF Header */}
                      <div
                        style={{
                          backgroundColor: "#6b21a8",
                          padding: "20px",
                          color: "white",
                          textAlign: "center",
                          borderTopLeftRadius: "8px",
                          borderTopRightRadius: "8px",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginBottom: "10px",
                          }}
                        >
                          <svg
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{ marginRight: "10px" }}
                          >
                            <path d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                          </svg>
                          <h1 style={{ fontSize: "28px", fontWeight: "bold", margin: "0" }}>Movie Ticket</h1>
                        </div>
                        <p style={{ margin: "0", fontSize: "16px" }}>Your booking is confirmed!</p>
                      </div>

                      {/* Main Content */}
                      <div style={{ padding: "30px", border: "1px solid #e2e8f0", borderTop: "none" }}>
                        {/* Movie and Showtime Section */}
                        <div style={{ marginBottom: "25px" }}>
                          <h2
                            style={{
                              fontSize: "24px",
                              fontWeight: "bold",
                              margin: "0 0 5px 0",
                              color: "#1a202c",
                            }}
                          >
                            {booking.movie.title}
                          </h2>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              fontSize: "14px",
                              color: "#4a5568",
                              marginBottom: "15px",
                            }}
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              style={{ marginRight: "6px" }}
                            >
                              <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>
                              {new Date(booking.showtime.showDate).toLocaleDateString("en-US", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}{" "}
                              at{" "}
                              {new Date(booking.showtime.showDate).toLocaleTimeString("en-US", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>

                          {/* Divider */}
                          <div
                            style={{
                              height: "1px",
                              backgroundColor: "#e2e8f0",
                              margin: "15px 0",
                              position: "relative",
                            }}
                          >
                            <div
                              style={{
                                position: "absolute",
                                left: "-30px",
                                top: "-10px",
                                height: "20px",
                                width: "20px",
                                backgroundColor: "#e2e8f0",
                                borderRadius: "50%",
                              }}
                            ></div>
                            <div
                              style={{
                                position: "absolute",
                                right: "-30px",
                                top: "-10px",
                                height: "20px",
                                width: "20px",
                                backgroundColor: "#e2e8f0",
                                borderRadius: "50%",
                              }}
                            ></div>
                          </div>
                        </div>

                        {/* Two Column Layout */}
                        <div style={{ display: "flex" }}>
                          {/* Left Column - Booking Details */}
                          <div style={{ flex: "1", paddingRight: "20px" }}>
                            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                              <tbody>
                                <tr>
                                  <td
                                    style={{
                                      padding: "8px 0",
                                      color: "#718096",
                                      fontSize: "14px",
                                      width: "120px",
                                    }}
                                  >
                                    Booking ID
                                  </td>
                                  <td style={{ padding: "8px 0", fontSize: "14px", fontWeight: "500" }}>
                                    {booking.bookingId}
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    style={{
                                      padding: "8px 0",
                                      color: "#718096",
                                      fontSize: "14px",
                                    }}
                                  >
                                    Name
                                  </td>
                                  <td style={{ padding: "8px 0", fontSize: "14px", fontWeight: "500" }}>
                                    {user?.name || "N/A"}
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    style={{
                                      padding: "8px 0",
                                      color: "#718096",
                                      fontSize: "14px",
                                    }}
                                  >
                                    Email
                                  </td>
                                  <td style={{ padding: "8px 0", fontSize: "14px" }}>{user?.email || "N/A"}</td>
                                </tr>
                                <tr>
                                  <td
                                    style={{
                                      padding: "8px 0",
                                      color: "#718096",
                                      fontSize: "14px",
                                    }}
                                  >
                                    Cinema
                                  </td>
                                  <td style={{ padding: "8px 0", fontSize: "14px" }}>{booking.cinema.name}</td>
                                </tr>
                                <tr>
                                  <td
                                    style={{
                                      padding: "8px 0",
                                      color: "#718096",
                                      fontSize: "14px",
                                    }}
                                  >
                                    Theater
                                  </td>
                                  <td style={{ padding: "8px 0", fontSize: "14px" }}>{booking.theater.name}</td>
                                </tr>
                                <tr>
                                  <td
                                    style={{
                                      padding: "8px 0",
                                      color: "#718096",
                                      fontSize: "14px",
                                    }}
                                  >
                                    Location
                                  </td>
                                  <td style={{ padding: "8px 0", fontSize: "14px" }}>{booking.cinema.location}</td>
                                </tr>
                                <tr>
                                  <td
                                    style={{
                                      padding: "8px 0",
                                      color: "#718096",
                                      fontSize: "14px",
                                    }}
                                  >
                                    Seats
                                  </td>
                                  <td style={{ padding: "8px 0", fontSize: "14px", fontWeight: "bold" }}>
                                    {booking.seats.map((s) => `${s.row}-${s.number}`).join(", ")}
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    style={{
                                      padding: "8px 0",
                                      color: "#718096",
                                      fontSize: "14px",
                                    }}
                                  >
                                    Booking Date
                                  </td>
                                  <td style={{ padding: "8px 0", fontSize: "14px" }}>
                                    {new Date(booking.createdAt || booking.showtime.showDate).toLocaleDateString()}
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    style={{
                                      padding: "8px 0",
                                      color: "#718096",
                                      fontSize: "14px",
                                    }}
                                  >
                                    Total Price
                                  </td>
                                  <td
                                    style={{
                                      padding: "8px 0",
                                      fontSize: "18px",
                                      fontWeight: "bold",
                                      color: "#2f855a",
                                    }}
                                  >
                                    ₹{booking.totalPrice}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>

                          {/* Right Column - QR Code */}
                          <div
                            style={{
                              width: "200px",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                              borderLeft: "1px dashed #cbd5e0",
                              paddingLeft: "20px",
                            }}
                          >
                            {qrCodes[booking.bookingId] && (
                              <>
                                <img
                                  src={qrCodes[booking.bookingId] || "/placeholder.svg"}
                                  alt="QR Code"
                                  style={{ width: "150px", height: "150px" }}
                                />
                                <p
                                  style={{
                                    fontSize: "14px",
                                    color: "#4a5568",
                                    textAlign: "center",
                                    marginTop: "10px",
                                  }}
                                >
                                  Scan for Entry
                                </p>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Divider */}
                        <div
                          style={{
                            height: "1px",
                            backgroundColor: "#e2e8f0",
                            margin: "25px 0 20px",
                          }}
                        ></div>

                        {/* Important Notes */}
                        <div
                          style={{
                            backgroundColor: "#f7fafc",
                            border: "1px solid #e2e8f0",
                            borderRadius: "6px",
                            padding: "15px",
                            marginBottom: "20px",
                          }}
                        >
                          <h3
                            style={{
                              fontSize: "16px",
                              fontWeight: "bold",
                              margin: "0 0 10px 0",
                              color: "#1a202c",
                            }}
                          >
                            Important Information
                          </h3>
                          <ul style={{ margin: "0", paddingLeft: "20px", fontSize: "13px", color: "#4a5568" }}>
                            <li style={{ marginBottom: "5px" }}>Please arrive 15 minutes before showtime.</li>
                            <li style={{ marginBottom: "5px" }}>
                              Carry a valid ID proof along with this ticket for verification.
                            </li>
                            <li style={{ marginBottom: "5px" }}>
                              No refunds or cancellations within 2 hours of showtime.
                            </li>
                            <li style={{ marginBottom: "5px" }}>
                              Outside food and beverages are not allowed inside the theater.
                            </li>
                          </ul>
                        </div>

                        {/* Footer */}
                        <div
                          style={{
                            textAlign: "center",
                            borderTop: "1px solid #e2e8f0",
                            paddingTop: "15px",
                          }}
                        >
                          <p style={{ fontSize: "13px", color: "#718096", margin: "0 0 5px 0" }}>
                            For support, contact: support@cinemabooking.com | 1800-000-1234
                          </p>
                          <p style={{ fontSize: "12px", color: "#a0aec0", margin: "0" }}>
                            Thank you for choosing our cinema. Enjoy your movie!
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default ViewBookings

