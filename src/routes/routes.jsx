import { lazy } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { createBrowserRouter } from "react-router-dom";

// Layouts
import MainLayout from "../layouts/MainLayout/MainLayout";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";
import Users from "../pages/private/users/Users";
import BlockAdmin from "./BlockAdmin";
import RequireAdmin from "./RequireAdmin";
import UserProfile from "../pages/private/profile/UserProfile";
import AllProperty from "../pages/private/Properties/AllProperty";
import AddProperty from "../pages/private/Properties/AddProperty";
import CookiePolicy from "../pages/public/CookiePolicy/CookiePolicy";
import PrivacyPolicy from "../pages/public/PrivacyPolicy/PrivacyPolicy";
import TermsAndConditions from "../pages/public/TermsAndConditions/TermsAndConditions";

// Pages
const Home = lazy(() => import("../pages/public/Home/Home"));
const LoginPage = lazy(() => import("../pages/Auth/Login/LoginPage"));
const PropertiesPage = lazy(
  () => import("../pages/public/properties/PropertiesPage"),
);
const SinglePropertyPage = lazy(
  () => import("../pages/public/properties/SinglePropertyPage"),
);
const Contact = lazy(() => import("../pages/public/Contact/Contact"));
const About = lazy(() => import("../pages/public/about/About"));
const FavouritePage = lazy(
  () => import("../pages/public/FavouritePage/FavouritePage"),
);
const AdminProfile = lazy(
  () => import("../pages/private/profile/AdminProfile"),
);
const Dashboard = lazy(() => import("../pages/private/admin/Dashboard"));
const CheckoutForm = lazy(
  () => import("../pages/Auth/CheckoutForm/CheckoutForm"),
);

const ErrorPage = lazy(() => import("../pages/err/ErrorPage"));
const stripePromise = loadStripe(
  "pk_test_51RcJiND60jTqpzFUTyaTS0m8gzJ8dJUoCMfzokDmF8UKWIKgzdoguwKoRuB1o1QOhzHKtUiRh7Q4TWURblIAzbtS00UT4FOEQx",
);

export const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: (
      <BlockAdmin>
        <MainLayout />
      </BlockAdmin>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "properties",
        element: <PropertiesPage />,
      },
      {
        path: "properties/:id",
        element: <SinglePropertyPage />,
      },
      {
        path: "favourite",
        element: <FavouritePage />,
      },
      {
        path: "my-profile",
        element: <UserProfile />,
      },
      {
        path: "cookie-policy",
        element: <CookiePolicy />,
      },
      {
        path: "privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "terms-and-conditions",
        element: <TermsAndConditions />,
      },
    ],
  },
  {
    path: "/auth",
    element: (
      <BlockAdmin>
        <AuthLayout />
      </BlockAdmin>
    ),
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
    element: (
      <RequireAdmin>
        <DashboardLayout />
      </RequireAdmin>
    ),
    children: [
      { path: "dashboard", index: true, element: <Dashboard /> },
      { path: "profile", element: <AdminProfile /> },
      { path: "users", element: <Users /> },
      { path: "properties/all", element: <AllProperty /> },
      { path: "properties/add", element: <AddProperty /> },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
