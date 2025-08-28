"use client"

const DateSelector = ({ selectedDate, setSelectedDate }) => {
  const today = new Date()

  const formatDate = (date) => {
    const yy = date.getFullYear().toString()
    const mm = (date.getMonth() + 1).toString().padStart(2, "0")
    const dd = date.getDate().toString().padStart(2, "0")
    return `${yy}-${mm}-${dd}`
  }

  const getWeekDates = () => {
    const dates = []
    const start = new Date(today)

    for (let i = 0; i < 7; i++) {
      const d = new Date(start)
      d.setDate(start.getDate() + i)
      dates.push(new Date(d))
    }

    return dates
  }

  const isDisabled = (date) => {
    const todayDate = new Date()
    const tomorrow = new Date()
    tomorrow.setDate(todayDate.getDate() + 1)

    const dStr = formatDate(date)
    const tStr = formatDate(todayDate)
    const tmStr = formatDate(tomorrow)

    return dStr !== tStr && dStr !== tmStr
  }

  const isToday = (date) => {
    return formatDate(date) === formatDate(today)
  }

  const isTomorrow = (date) => {
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)
    return formatDate(date) === formatDate(tomorrow)
  }

  const weekDates = getWeekDates()

  return (
    <div className="w-full max-w-4xl">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
          <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          Select Date
        </h3>
        <p className="text-sm text-gray-600">Choose your preferred show date</p>
      </div>

      {/* Date Selector */}
      <div className="rounded-2xl border border-gray-100">
        {/* Desktop: Flex layout, Mobile: Grid layout */}
        <div className="hidden sm:flex gap-2 sm:gap-3">
          {weekDates.map((date, index) => {
            const formatted = formatDate(date)
            const disabled = isDisabled(date)
            const isSelected = formatted === selectedDate
            const todayDate = isToday(date)
            const tomorrowDate = isTomorrow(date)

            const day = date.toLocaleDateString("en-US", { weekday: "short" })
            const dateNum = date.getDate().toString().padStart(2, "0")
            const month = date.toLocaleDateString("en-US", { month: "short" })

            return (
              <div
                key={index}
                className={`
                  relative flex-shrink-0 min-w-[80px] px-4 py-4 text-center rounded-xl cursor-pointer 
                  transition-all duration-300 transform hover:scale-105 group
                  ${
                    isSelected
                      ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                      : disabled
                        ? "bg-gray-50 text-gray-300 hover:cursor-not-allowed opacity-60"
                        : "bg-gray-50 text-gray-700 hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 hover:text-blue-700 hover:shadow-md"
                  }
                  border-2 ${
                    isSelected
                      ? "border-transparent"
                      : disabled
                        ? "border-gray-200"
                        : "border-gray-200 hover:border-blue-200"
                  }
                `}
                onClick={() => {
                  if (!disabled) setSelectedDate(formatted)
                }}
              >
                {/* Special badges for today/tomorrow */}
                {todayDate && !disabled && (
                  <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow-md">
                    Today
                  </div>
                )}
                {tomorrowDate && !disabled && (
                  <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow-md">
                    Tomorrow
                  </div>
                )}

                {/* Date content */}
                <div className="space-y-1">
                  <div className={`text-xs font-bold tracking-wider ${isSelected ? "text-blue-100" : ""}`}>
                    {day.toUpperCase()}
                  </div>
                  <div className={`text-2xl font-bold ${isSelected ? "text-white" : ""}`}>{dateNum}</div>
                  <div className={`text-xs font-medium tracking-wider ${isSelected ? "text-blue-100" : ""}`}>
                    {month.toUpperCase()}
                  </div>
                </div>

                {/* Selection indicator */}
                {isSelected && (
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}

                {/* Hover effect overlay */}
                {!disabled && !isSelected && (
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 rounded-xl transition-all duration-300"></div>
                )}
              </div>
            )
          })}
        </div>

        {/* Mobile: Grid layout */}
        <div className="grid grid-cols-7 gap-1 p-2 sm:hidden">
          {weekDates.map((date, index) => {
            const formatted = formatDate(date)
            const disabled = isDisabled(date)
            const isSelected = formatted === selectedDate
            const todayDate = isToday(date)
            const tomorrowDate = isTomorrow(date)

            const day = date.toLocaleDateString("en-US", { weekday: "short" })
            const dateNum = date.getDate().toString().padStart(2, "0")
            const month = date.toLocaleDateString("en-US", { month: "short" })

            return (
              <div
                key={index}
                className={`
                  relative w-full px-1 py-2 text-center rounded-lg cursor-pointer 
                  transition-all duration-300 transform hover:scale-105 group
                  ${
                    isSelected
                      ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                      : disabled
                        ? "bg-gray-50 text-gray-300 hover:cursor-not-allowed opacity-60"
                        : "bg-gray-50 text-gray-700 hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 hover:text-blue-700 hover:shadow-md"
                  }
                  border-2 ${
                    isSelected
                      ? "border-transparent"
                      : disabled
                        ? "border-gray-200"
                        : "border-gray-200 hover:border-blue-200"
                  }
                `}
                onClick={() => {
                  if (!disabled) setSelectedDate(formatted)
                }}
              >
                {/* Special badges for today/tomorrow */}
                {todayDate && !disabled && (
                  <div className="absolute -top-1 -right-1 bg-green-500 text-white text-[8px] px-1 py-0.5 rounded-full font-bold shadow-md">
                    T
                  </div>
                )}
                {tomorrowDate && !disabled && (
                  <div className="absolute -top-1 -right-1 bg-orange-500 text-white text-[8px] px-1 py-0.5 rounded-full font-bold shadow-md">
                    T+
                  </div>
                )}

                {/* Date content */}
                <div className="space-y-0.5">
                  <div className={`text-[8px] font-bold tracking-wider ${isSelected ? "text-blue-100" : ""}`}>
                    {day.toUpperCase()}
                  </div>
                  <div className={`text-sm font-bold ${isSelected ? "text-white" : ""}`}>{dateNum}</div>
                  <div className={`text-[8px] font-medium tracking-wider ${isSelected ? "text-blue-100" : ""}`}>
                    {month.toUpperCase()}
                  </div>
                </div>

                {/* Selection indicator */}
                {isSelected && (
                  <div className="absolute bottom-0.5 left-1/2 transform -translate-x-1/2">
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                  </div>
                )}

                {/* Hover effect overlay */}
                {!disabled && !isSelected && (
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 rounded-lg transition-all duration-300"></div>
                )}
              </div>
            )
          })}
        </div>

        {/* Legend */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="flex flex-wrap gap-4 text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full"></div>
              <span>Selected</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <span>Not Available</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DateSelector
