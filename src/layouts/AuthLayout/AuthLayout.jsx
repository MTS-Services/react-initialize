import { Outlet, Navigate } from "react-router-dom";
import MainHeader from "../MainLayout/MainHeader";
import MainFooter from "../MainLayout/MainFooter";
import { getCurrentUser } from "../../features/auth/authUtils";

const AuthLayout = () => {
  const user = getCurrentUser();

  if (user?.data?.role === "ADMIN") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <MainHeader />
      <main className="flex-grow">
        <Outlet />
      </main>
      <MainFooter />
    </div>
  );
};

export default AuthLayout;
