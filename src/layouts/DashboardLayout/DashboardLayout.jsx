import { Outlet, Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { getCurrentUser } from "../../utils/authUtils";
// import { useSelector } from "react-redux";
// import { selectCurrentToken } from "../../features/auth/authSlice";

const DashboardLayout = () => {
  const user = getCurrentUser();

  if (user?.role !== "admin") {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar />

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
