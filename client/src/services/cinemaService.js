import axios from "axios"

const API = axios.create({ baseURL: import.meta.env.VITE_BACKEND_API_URL })

export const getAllCinemas = async () => {
  try {
    const res = await API.get("/api/cinemas", { withCredentials: true })
    return res.data
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to fetch cinemas")
  }
}

export const addCinema = async (cinemaData) => {
  try {
    const res = await API.post("/api/cinemas/addCinema", cinemaData, { withCredentials: true })
    return res.data
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to add cinema")
  }
}

// Update cinema
export const updateCinema = async (id, cinemaData) => {
  try{
    const res = await API.put(`/api/cinemas/${id}`, cinemaData, { withCredentials: true });
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to update cinema")
  }
  
};

// Delete cinema
export const deleteCinema = async (id) => {
  try{
    const res = await API.delete(`/api/cinemas/${id}`, { withCredentials: true });
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to delete cinema")
  }
};

export const getCinemaById = async (id) => {
  try{
    console.log(id)
    const res = await API.get(`/api/cinemas/${id}`, { withCredentials: true });
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to fetch cinema by id")
  }
};