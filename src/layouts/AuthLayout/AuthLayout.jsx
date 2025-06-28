import { Outlet, Navigate } from "react-router-dom";
import MainHeader from "../MainLayout/MainHeader";
import MainFooter from "../MainLayout/MainFooter";

const AuthLayout = () => {
  const isPaid = false;

  // If user is already authenticated, redirect to dashboard
  if (isPaid) {
    return <Navigate to="/dashboard" replace />;
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
