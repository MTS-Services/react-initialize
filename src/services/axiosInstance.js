// src/services/axiosInstance.js
import axios from "axios";
import { getAuthToken } from "../features/auth/authUtils";

const axiosInstance = axios.create({
  baseURL: "https://mts-ecommerce-backend.onrender.com/api/v1", // API base URL
});

axiosInstance.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
