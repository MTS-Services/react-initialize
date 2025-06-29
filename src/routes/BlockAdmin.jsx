// src/routes/BlockAdmin.jsx
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../utils/authUtils";

const BlockAdmin = ({ children }) => {
  const user = getCurrentUser();

  if (user?.role === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
};

export default BlockAdmin;
