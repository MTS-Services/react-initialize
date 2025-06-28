import { Outlet, Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { selectCurrentToken } from "../../features/auth/authSlice";

// import Sidebar from "../../components/dashboard/Sidebar";
// import Navbar from "../../components/dashboard/Navbar";

const DashboardLayout = () => {
  const isPaid = true;

  // If user is not authenticated, redirect to login
  if (!isPaid) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      {/* <Sidebar /> */}
      {/* <h4>Sidebar</h4> */}

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Navbar */}
        {/* <Navbar /> */}
        {/* <h4>navbar</h4> */}

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
