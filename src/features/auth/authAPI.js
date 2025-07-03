// src/features/auth/authAPI.js
import axios from "axios";

const API_BASE = "http://localhost:3000/api/users";

export const loginAPI = async ({ email, password }) => {
  const res = await axios.post(`${API_BASE}/login`, { email, password });
  return res.data;
};

export const registerAPI = async ({ name, email, password }) => {
  const response = await axios.post(`${API_BASE}/create`, {
    name,
    email,
    password,
  });
  return response.data;
};
