import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../utils/authUtils";

const RequireAdmin = ({ children }) => {
  const user = getCurrentUser();

  if (!user || user.role !== "admin") {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

export default RequireAdmin;
