"use client"

import { useEffect, useRef } from "react"

const SeatGrid = ({ rows, seatsPerRow, bookedSeats, selectedSeats, onSelect }) => {
  const scrollContainerRef = useRef(null)
  const bookedSet = new Set(bookedSeats.map(({ row, number }) => `${row}${number}`))
  const rowsName = [...rows]

  // Define seat types for visual variety
  const premiumRows = ["RA", "RB", "RC"] // First few rows are premium
  const isPremiumSeat = (row) => premiumRows.includes(row)

  // Define seat groups for realistic layout
  const getGroupClass = (seatIndex) => {
    if (seatIndex === 3) return "mr-2 sm:mr-4 md:mr-8" // Gap after seat 4
    if (seatIndex === 14) return "ml-2 sm:ml-4 md:ml-8" // Gap after seat 15
    return ""
  }

  // Auto-scroll to middle on mobile
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (scrollContainer) {
      // Small delay to ensure content is rendered
      setTimeout(() => {
        const scrollWidth = scrollContainer.scrollWidth
        const clientWidth = scrollContainer.clientWidth
        const scrollLeft = (scrollWidth - clientWidth) / 2

        scrollContainer.scrollTo({
          left: scrollLeft,
          behavior: "smooth",
        })
      }, 100)
    }
  }, [])

  return (
    <div className="max-w-4xl mx-auto mt-4 sm:mt-8 mb-8 sm:mb-16 px-2 sm:px-4">
      {/* Screen */}
      <div className="relative mx-auto mb-8 sm:mb-12 max-w-full sm:max-w-xl">
        <div className="h-2 sm:h-3 bg-blue-400 rounded-lg shadow-md mb-1"></div>
        <div className="h-4 sm:h-8 bg-gradient-to-b from-blue-300 to-transparent rounded-t-lg"></div>
        <p className="absolute -bottom-5 sm:-bottom-6 left-1/2 transform -translate-x-1/2 text-xs sm:text-sm text-blue-500 font-medium">
          SCREEN
        </p>
      </div>

      {/* Seat legend */}
      <div className="flex flex-wrap justify-center gap-3 sm:gap-8 mb-6 sm:mb-8 text-xs sm:text-sm">
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="w-4 h-4 sm:w-6 sm:h-6 rounded bg-gray-200 border border-gray-300"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="w-4 h-4 sm:w-6 sm:h-6 rounded bg-green-500 border border-green-600"></div>
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="w-4 h-4 sm:w-6 sm:h-6 rounded bg-gray-400 border border-gray-500"></div>
          <span>Booked</span>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="w-4 h-4 sm:w-6 sm:h-6 rounded bg-blue-100 border border-blue-300"></div>
          <span>Premium</span>
        </div>
      </div>

      {/* Seat grid - Scrollable container for mobile */}
      <div ref={scrollContainerRef} className="overflow-x-auto pb-4 scroll-smooth">
        <div className="flex flex-col gap-1 sm:gap-2 min-w-max">
          {rowsName.map((row) => (
            <div key={row} className="flex items-center justify-center gap-1">
              <div className="w-4 sm:w-6 text-center font-medium text-gray-700 text-xs sm:text-sm">{row}</div>
              <div className="flex gap-0.5 sm:gap-1 justify-center">
                {Array.from({ length: seatsPerRow }, (_, i) => {
                  const seatNumber = i + 1
                  const seatLabel = `${row}${seatNumber}`
                  const isBooked = bookedSet.has(seatLabel)
                  const isSelected = selectedSeats.includes(seatLabel)
                  const isPremium = isPremiumSeat(row)

                  return (
                    <div key={seatLabel} className={`${getGroupClass(i)}`}>
                      <button
                        disabled={isBooked}
                        onClick={() => onSelect(seatLabel)}
                        className={`
                          w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-t-lg text-[10px] sm:text-xs font-medium relative
                          transition-all duration-200 transform
                          ${
                            isBooked
                              ? "bg-gray-400 border-gray-500 cursor-not-allowed opacity-70"
                              : isSelected
                                ? "bg-green-500 border-green-600 text-white hover:bg-green-600 scale-110"
                                : isPremium
                                  ? "bg-blue-100 border-blue-300 hover:bg-blue-200"
                                  : "bg-gray-200 border-gray-300 hover:bg-gray-300"
                          }
                          border focus:outline-none
                        `}
                        title={`${row}${seatNumber} ${isBooked ? "(Booked)" : ""}`}
                      >
                        {seatNumber}
                        <span className="absolute -bottom-1 left-0 right-0 h-0.5 sm:h-1 bg-gray-400 rounded-b opacity-70"></span>
                      </button>
                    </div>
                  )
                })}
              </div>
              <div className="w-4 sm:w-6 text-center font-medium text-gray-700 text-xs sm:text-sm">{row}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Walking path */}
      <div className="mt-6 sm:mt-10 h-3 sm:h-6 bg-gray-200 rounded-full w-3/4 mx-auto mb-3 sm:mb-4"></div>

      {/* Entry/Exit */}
      <div className="flex justify-center gap-2 text-xs sm:text-sm text-gray-500">
        <div className="border border-gray-300 rounded px-2 sm:px-3 py-0.5 sm:py-1">← ENTRY</div>
        <div className="border border-gray-300 rounded px-2 sm:px-3 py-0.5 sm:py-1">EXIT →</div>
      </div>

      {/* Mobile scroll indicator */}
      <div className="sm:hidden text-center mt-4 text-xs text-gray-500 animate-pulse">← Swipe to see all seats →</div>
    </div>
  )
}

export default SeatGrid
