// src/utils/authUtils.js
const userInfo = {
  role: "user",
};

export const getCurrentUser = () => {
  const user = userInfo;
  // JSON.parse(localStorage.getItem("userInfo"));
  return user || null;
};
