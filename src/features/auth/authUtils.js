// src/features/auth/authUtils.js

// Example: Check if user is logged in
export const isPaid = () => {
  return !!localStorage.getItem("userInfo");
};

// Example: Get auth token (if stored in localStorage or cookies)
export const getAuthToken = () => {
  const user = JSON.parse(localStorage.getItem("token"));
  console.log(user);
  return user?.token || null;
};
