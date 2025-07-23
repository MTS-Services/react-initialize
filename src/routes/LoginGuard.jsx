import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginGuard = ({ children }) => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    if (userInfo?.ispaid) {
      // Already paid user trying to access login — probably a mistake, redirect to home or dashboard
      navigate("/", { replace: true });
    } else if (userInfo) {
      // Logged-in but unpaid user — redirect to payment
      navigate("/auth/payment", { replace: true });
    }
    // Else, user is a guest — allow access to login
  }, [navigate, userInfo]);

  return !userInfo ? children : null; // render login page only for guests
};

export default LoginGuard;
