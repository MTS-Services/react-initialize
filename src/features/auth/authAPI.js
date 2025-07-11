// src/features/auth/authAPI.js
import axios from "axios";
import BASE_URL from "../../config/api";

export const loginAPI = async ({ email, password }) => {
  const res = await axios.post(`${BASE_URL}/users/login`, { email, password });
  return res.data;
};

export const registerAPI = async ({ name, email, password }) => {
  const response = await axios.post(`${BASE_URL}/create`, {
    name,
    email,
    password,
  });
  return response.data;
};
