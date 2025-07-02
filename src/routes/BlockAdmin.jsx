// src/routes/BlockAdmin.jsx
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../features/auth/authUtils";

const BlockAdmin = ({ children }) => {
  const user = getCurrentUser();
  console.log("User role:", user?.data?.role); // ✅ Proper access now
  if (user?.data?.role === "ADMIN") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
};

export default BlockAdmin;
