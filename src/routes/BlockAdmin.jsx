// src/routes/BlockAdmin.jsx
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../features/auth/authUtils";

const BlockAdmin = ({ children }) => {
  const user = getCurrentUser();

  if (user?.data?.role === "ADMIN") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
};

export default BlockAdmin;
