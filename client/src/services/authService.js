import axios from "axios";

// const API_URL = "http://localhost:5000/api/auth";
const API_URL = import.meta.env.VITE_BACKEND_API_URL

export const signup = async (userData) => {
  try {
    return await axios.post(`${API_URL}/api/auth/register`, userData);
  } catch (error) {
    console.error("Signup error:", error.response?.data || error.message);
    throw error;
  }
};

export const login = async (userData) => {
  console.log(API_URL)
  try {
    return await axios.post(`${API_URL}/api/auth/login`, userData,{
      withCredentials: true
    });
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
};

export const getMe = async () => {
  try {
    const res = await axios.get(`${API_URL}/api/auth/me`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error("getMe error:", error.response?.data?.msg || error.message);
    throw new Error(error.response?.data?.msg || "Failed to fetch user.");
  }
};

export const logout = async () => {
  try {
    const res = await axios.get(`${API_URL}/api/auth/logout`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error("Logout error:", error.response?.data?.msg || error.message);
    throw new Error(error.response?.data?.msg || "Logout failed.");
  }
};

export const updateUser = async (id, data) => {
  try {
    const res = await axios.put(`${API_URL}/api/auth/${id}`, data);
    return res.data;
  } catch (err) {
    throw err.response.data;
  }
};

