import { lazy } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { createBrowserRouter } from "react-router-dom";

// Layouts
import MainLayout from "../layouts/MainLayout/MainLayout";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";

// Pages
const Home = lazy(() => import("../pages/public/Home/Home"));
const LoginPage = lazy(() => import("../pages/Auth/Login/LoginPage"));
const PropertiesPage = lazy(
  () => import("../pages/public/properties/PropertiesPage"),
);
const SinglePropertyPage = lazy(
  () => import("../pages/public/properties/SinglePropertyPage"),
);
const FilterPage = lazy(
  () => import("../pages/public/properties/PropertiesPage"),
);

const Contact = lazy(() => import("../pages/public/Contact/Contact"));
const About = lazy(() => import("../pages/public/about/About"));
const FavouritePage = lazy(
  () => import("../pages/public/FavouritePage/FavouritePage"),
);
const ProfilePage = lazy(
  () => import("../pages/private/ProfilePage/ProfilePage"),
);
const Dashboard = lazy(() => import("../pages/private/admin/Dashboard"));
const CheckoutForm = lazy(
  () => import("../pages/Auth/CheckoutForm/CheckoutForm"),
);
const ErrorPage = lazy(() => import("../pages/err/ErrorPage"));

const stripePromise = loadStripe(
  "pk_test_51RQjDcQXcUxzu52Z8GJmcg5tSKqe3wwof2OfeNMiLXwTgwcqagvzwIGD1VmrNnOQIFOWeYtU7R0cQBbW6AEHANE000ArSqcMUm",
);

export const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "properties", element: <PropertiesPage /> },
      { path: "properties/:id", element: <SinglePropertyPage /> },
      { path: "favourite", element: <FavouritePage /> },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <LoginPage /> },
      {
        path: "register",
        element: (
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        ),
      },
    ],
  },
  {
    path: "/admin",
    element: <DashboardLayout />,
    children: [
      { path: "dashboard", index: true, element: <Dashboard /> },
      { path: "profile", element: <ProfilePage /> },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
