// src/features/auth/authUtils.js

export const getCurrentUser = () => {
  const user = JSON.parse(localStorage.getItem("userInfo"));

  // JSON.parse(localStorage.getItem("userInfo"));
  return user || null;
};

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

// Logout user
export const logout = () => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("authToken");
  // Optionally, remove more items if needed
};
