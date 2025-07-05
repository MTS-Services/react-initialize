// src/routes/RequireAuth.jsx
import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children }) => {
  // You can replace this with a Redux selector if you prefer
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const location = useLocation();

  // If no user is logged in, redirect to login
  if (!userInfo) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // If logged in, render the protected component
  return children;
};

export default RequireAuth;
