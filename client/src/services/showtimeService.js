// src/services/showtimeService.js
import axios from "axios";
// const API = "http://localhost:5000/api/showtimes"; // adjust if needed

const API = import.meta.env.VITE_BACKEND_API_URL

export const getShowtimesByMovieId = async (movieId) => {
  try {
    const res = await axios.get(`${API}/api/showtimes/movie/${movieId}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error("Failed to fetch showtimes by movie ID:", err?.response?.data || err.message);
    return { error: true, message: err?.response?.data?.message || "Unable to fetch showtimes" };
  }
};

export const getShowtimeById = async (showtimeId) => {
  try {
    const res = await axios.get(`${API}/api/showtimes/${showtimeId}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error("Failed to fetch showtime by ID:", err?.response?.data || err.message);
    return { error: true, message: err?.response?.data?.message || "Unable to fetch showtime" };
  }
};

export const getAllShowtimes = async () => {
  try {
    const res = await axios.get(`${API}/api/showtimes`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error("Failed to fetch all showtimes:", err?.response?.data || err.message);
    return { error: true, message: err?.response?.data?.message || "Unable to fetch all showtimes" };
  }
};

export const addShowtime = async (showtimeData) => {
  try {
    const res = await axios.post(`${API}/api/showtimes/addShow`, showtimeData, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error("Failed to add showtime:", err?.response?.data || err.message);
    return { error: true, message: err?.response?.data?.message || "Unable to add showtime" };
  }
};

export const updateShowtime = async (id, showtimeData) => {
  try {
    const res = await axios.put(`${API}/api/showtimes/${id}`, showtimeData, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error("Failed to update showtime:", err?.response?.data || err.message);
    return { error: true, message: err?.response?.data?.message || "Unable to update showtime" };
  }
};

export const deleteShowtime = async (id) => {
  try {
    const res = await axios.delete(`${API}/api/showtimes/${id}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error("Failed to delete showtime:", err?.response?.data || err.message);
    return { error: true, message: err?.response?.data?.message || "Unable to delete showtime" };
  }
};
