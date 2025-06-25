// src/features/auth/authAPI.js
import axios from "axios";

const API_BASE = "/api"; // adjust your API base URL if needed

export const loginAPI = async ({ email, password }) => {
  const response = await axios.post(`${API_BASE}/login`, { email, password });
  return response.data;
};
