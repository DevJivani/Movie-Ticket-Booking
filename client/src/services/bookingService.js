import axios from "axios";

// const BASE_URL = "http://localhost:5000/api"; // adjust as needed
const BASE_URL = import.meta.env.VITE_BACKEND_API_URL

export const getTheaterById = async (theaterId) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/theaters/${theaterId}`, { withCredentials: true });
    return res.data;
  } catch (err) {
    console.error("Fetch theater error:", err.response?.data?.msg || err.message);
    throw new Error(err.response?.data?.msg || "Failed to fetch theater.");
  }
};

export const getBookedSeats = async (showtimeId, selectedDate) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/bookings/booked-seats/${showtimeId}/date/${selectedDate}`, { withCredentials: true });
    return res.data;
  } catch (err) {
    console.error("Get booked seats error:", err.response?.data?.msg || err.message);
    throw new Error(err.response?.data?.msg || "Failed to fetch booked seats.");
  }
};

export const createBooking = async (bookingData) => {
  try {
    const res = await axios.post(`${BASE_URL}/api/bookings`, bookingData, { withCredentials: true });
    return res.data;
  } catch (err) {
    console.error("Create booking error:", err.response?.data?.msg || err.message);
    throw new Error(err.response?.data?.msg || "Booking failed.");
  }
};

export const getUserBookings = async (id) => {
  console.log(id)
  try {
    const res = await axios.get(`${BASE_URL}/api/bookings/${id}`, { withCredentials: true });
    return res.data;
  } catch (err) {
    console.error("Fetch user booking error:", err.response?.data?.msg || err.message);
    throw new Error(err.response?.data?.msg || "Failed to fetch bookings.");
  }
};