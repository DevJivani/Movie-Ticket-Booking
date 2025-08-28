"use client"

import { useState } from "react"
import { signup } from "../services/authService"
import { Link, useNavigate } from "react-router-dom"

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", password: "" })
  const [step, setStep] = useState(1)
  const navigate = useNavigate()
    const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (step === 1) {
      if (!formData.email) {
        setError("Email is required.")
        return
      }
      setStep(2)
      return
    }

    const { name, email, phone, password } = formData
    if (!name || !email || !phone || !password) {
      return setError("All fields are required.")
    }

    try {
      const res = await signup(formData)
      setFormData({ name: "", email: "", phone: "", password: "" })
      alert(res.data?.msg || "Signup successful")
      navigate("/login")
      console.log(res.data) // Store token in localStorage if needed
    } catch (err) {
      const message = err.response?.data?.msg || "Signup failed. Try again."
      setError(message)
    }
  }

  return (
    <div className="flex min-h-[calc(84vh)] relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: `url("/images/login.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center 20%",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      {/* Dark overlay for entire background */}
      <div
        className={`absolute inset-0 z-10 transition-all duration-700 ${step === 2 ? "bg-black/30" : "bg-black/30"}`}
      ></div>

      {/* Gradient overlay from left to right */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/70 to-black/100 z-20"></div>

      {/* Left side - Empty space to show background (2/3 width) */}
      <div className="hidden md:block md:w-2/3"></div>

        <div className="w-full md:w-1/2 relative">
          {/* Signup form */}
      <div className="relative z-40 text-white flex flex-col items-center justify-center px-6 py-12 h-full">
        <div className="w-full max-w-md">
          <h1 className="text-red-600 text-3xl font-bold mb-8">🎬 CineBooking</h1>

          {error && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg backdrop-blur-sm">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              </div>
            )}

          <h2 className="text-3xl font-bold mb-2">Create Account</h2>
          <p className="text-gray-400 mb-8">Join CineBooking today</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 ? (
              <>
                <div>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your Email"
                    className="w-full px-4 py-3 rounded bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded font-medium transition duration-200"
                >
                  Continue
                </button>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <div>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      className="w-full px-4 py-3 rounded bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
                      disabled
                    />
                  </div>
                  <div>
                    <input
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Full Name"
                      className="w-full px-4 py-3 rounded bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
                      autoFocus
                    />
                  </div>
                  <div>
                    <input
                      name="phone"
                      type="number"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone Number"
                      className="w-full px-4 py-3 rounded bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
                    />
                  </div>
                  <div>
                    <input
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Password"
                      className="w-full px-4 py-3 rounded bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <button type="button" onClick={() => setStep(1)} className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded font-medium transition duration-200">
                    Back
                  </button>
                  <button
                    type="submit"
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded font-medium transition duration-200"
                  >
                    Sign Up
                  </button>
                </div>
              </>
            )}
          </form>

          <p className="mt-8 text-center text-gray-400">
            Already have an account?
            <Link to="/login" className="text-red-600 hover:text-red-500 ml-1 font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
        </div>
      
    </div>
  )
}

export default Signup





