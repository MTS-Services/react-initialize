// src/features/auth/authAPI.js
import axios from "../../utils/axiosInstance";

export const loginAPI = async ({ email, password }) => {
  const res = await axios.post(`/users/login`, { email, password });
  return res.data;
};

export const registerAPI = async ({ name, email, password }) => {
  const response = await axios.post(`/create`, {
    name,
    email,
    password,
  });
  return response.data;
};
