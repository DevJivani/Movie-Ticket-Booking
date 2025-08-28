"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { logout } from "../services/authService"
import { useAuth } from "../context/AuthContext"

const Navbar = () => {
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user, isLogin, setUser, setIsLogin } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
      setIsLogin(false)
      setUser(null)
      setIsMobileMenuOpen(false)
      navigate("/login")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-800 to-slate-900 shadow-lg border-b border-slate-700">
      <div className="max-w-8xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" onClick={closeMobileMenu}>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white flex items-center gap-1 sm:gap-2">
                <span className="text-xl sm:text-2xl lg:text-3xl">🎬</span>
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  CineBooking
                </span>
              </h2>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-4 lg:ml-10 flex items-baseline space-x-1 lg:space-x-3">
              <Link
                to="/"
                className="text-gray-300 hover:text-white hover:bg-slate-700 px-2 lg:px-3 py-2 rounded-md text-xs lg:text-sm font-medium transition-all duration-200 ease-in-out transform hover:scale-105"
              >
                Home
              </Link>

              {user && user.role !== "admin" && (
                <>
                  <Link
                    to="/my-bookings"
                    className="text-gray-300 hover:text-white hover:bg-slate-700 px-2 lg:px-3 py-2 rounded-md text-xs lg:text-sm font-medium transition-all duration-200 ease-in-out transform hover:scale-105"
                  >
                    Bookings
                  </Link>
                  <Link
                    to="/update-profile"
                    className="text-gray-300 hover:text-white hover:bg-slate-700 px-2 lg:px-3 py-2 rounded-md text-xs lg:text-sm font-medium transition-all duration-200 ease-in-out transform hover:scale-105"
                  >
                    Profile
                  </Link>
                </>
              )}

              {user && user.role === "admin" && (
                <>
                  <Link
                    to="/cinemas"
                    className="text-gray-300 hover:text-white hover:bg-slate-700 px-2 lg:px-3 py-2 rounded-md text-xs lg:text-sm font-medium transition-all duration-200 ease-in-out transform hover:scale-105"
                  >
                    Cinemas
                  </Link>
                  <Link
                    to="/add-movie"
                    className="text-gray-300 hover:text-white hover:bg-slate-700 px-2 lg:px-3 py-2 rounded-md text-xs lg:text-sm font-medium transition-all duration-200 ease-in-out transform hover:scale-105"
                  >
                    Add Movie
                  </Link>
                  <Link
                    to="/add-show"
                    className="text-gray-300 hover:text-white hover:bg-slate-700 px-2 lg:px-3 py-2 rounded-md text-xs lg:text-sm font-medium transition-all duration-200 ease-in-out transform hover:scale-105"
                  >
                    Add Show
                  </Link>
                </>
              )}

              {!isLogin ? (
                <>
                  <Link
                    to="/login"
                    className="text-gray-300 hover:text-white hover:bg-slate-700 px-2 lg:px-3 py-2 rounded-md text-xs lg:text-sm font-medium transition-all duration-200 ease-in-out transform hover:scale-105"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-2 lg:px-4 py-2 rounded-md text-xs lg:text-sm font-medium transition-all duration-200 ease-in-out transform hover:scale-105 shadow-md"
                  >
                    Signup
                  </Link>
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white hover:bg-red-600 px-2 lg:px-3 py-2 rounded-md text-xs lg:text-sm font-medium transition-all duration-200 ease-in-out transform hover:scale-105"
                >
                  Logout
                </button>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-300 hover:text-white hover:bg-slate-700 p-2 rounded-md transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-slate-800 border-t border-slate-700">
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="text-gray-300 hover:text-white hover:bg-slate-700 block px-3 py-2 sm:py-3 rounded-md text-sm sm:text-base font-medium transition-colors duration-200"
          >
            <span className="flex items-center">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Home
            </span>
          </Link>

          {user && user.role !== "admin" && (
            <>
            <Link
              to="/my-bookings"
              onClick={closeMobileMenu}
              className="text-gray-300 hover:text-white hover:bg-slate-700 block px-3 py-2 sm:py-3 rounded-md text-sm sm:text-base font-medium transition-colors duration-200"
            >
              <span className="flex items-center">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                My Bookings
              </span>
            </Link>
            <Link
            to="/update-profile"
            onClick={closeMobileMenu}
            className="text-gray-300 hover:text-white hover:bg-slate-700 block px-3 py-2 sm:py-3 rounded-md text-sm sm:text-base font-medium transition-colors duration-200"
          >
            <span className="flex items-center">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Profile
            </span>
          </Link>
            </>
          )}

          {user && user.role === "admin" && (
            <>
              <Link
                to="/cinemas"
                onClick={closeMobileMenu}
                className="text-gray-300 hover:text-white hover:bg-slate-700 block px-3 py-2 sm:py-3 rounded-md text-sm sm:text-base font-medium transition-colors duration-200"
              >
                <span className="flex items-center">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  Manage Cinemas
                </span>
              </Link>
              <Link
                to="/add-movie"
                onClick={closeMobileMenu}
                className="text-gray-300 hover:text-white hover:bg-slate-700 block px-3 py-2 sm:py-3 rounded-md text-sm sm:text-base font-medium transition-colors duration-200"
              >
                <span className="flex items-center">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Add Movie
                </span>
              </Link>
              <Link
                to="/add-show"
                onClick={closeMobileMenu}
                className="text-gray-300 hover:text-white hover:bg-slate-700 block px-3 py-2 sm:py-3 rounded-md text-sm sm:text-base font-medium transition-colors duration-200"
              >
                <span className="flex items-center">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Add Show
                </span>
              </Link>
            </>
          )}

          {!isLogin ? (
            <>
              <Link
                to="/login"
                onClick={closeMobileMenu}
                className="text-gray-300 hover:text-white hover:bg-slate-700 block px-3 py-2 sm:py-3 rounded-md text-sm sm:text-base font-medium transition-colors duration-200"
              >
                <span className="flex items-center">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                  Login
                </span>
              </Link>
              <Link
                to="/signup"
                onClick={closeMobileMenu}
                className="bg-blue-600 hover:bg-blue-700 text-white block px-3 py-2 sm:py-3 rounded-md text-sm sm:text-base font-medium transition-colors duration-200"
              >
                <span className="flex items-center">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                  Signup
                </span>
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white hover:bg-red-600 block w-full text-left px-3 py-2 sm:py-3 rounded-md text-sm sm:text-base font-medium transition-colors duration-200"
            >
              <span className="flex items-center">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </span>
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
