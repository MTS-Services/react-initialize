import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

// Layouts
import { FavoriteProvider } from "../context/FavouriteContext/FavouriteProvider";
const secratKey =
  "pk_test_51RcJiND60jTqpzFUTyaTS0m8gzJ8dJUoCMfzokDmF8UKWIKgzdoguwKoRuB1o1QOhzHKtUiRh7Q4TWURblIAzbtS00UT4FOEQx";
import DashboardLayout from "../layouts/Dashboard/DashboardLayout";
import AddProperty from "../pages/private/Properties/AddProperty";
import AllProperty from "../pages/private/Properties/AllProperty";
import UserProfile from "../pages/private/profile/UserProfile";
import Users from "../pages/private/users/Users";

import RequireAdmin from "./RequireAdmin";
import RequireAuth from "./RequireAuth";
import BlockAdmin from "./BlockAdmin";

import AuthLayout from "../layouts/Auth/AuthLayout";
import MainLayout from "../layouts/Main/MainLayout";

import TermsAndConditions from "../pages/public/TermsAndConditions/TermsAndConditions";
import PaymentSuccess from "../pages/Auth/CheckoutForm/PaymentSuccsess";
import PrivacyPolicy from "../pages/public/PrivacyPolicy/PrivacyPolicy";
import CookiePolicy from "../pages/public/CookiePolicy/CookiePolicy";
import RegisterPage from "../pages/Auth/register/Register";

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

const stripePromise = loadStripe(secratKey);

const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: (
      <FavoriteProvider>
        <BlockAdmin>
          <MainLayout />
        </BlockAdmin>
      </FavoriteProvider>
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
      {
        path: "my-profile",
        element: (
          <RequireAuth>
            <UserProfile />
          </RequireAuth>
        ),
      },
    ],
  },

  {
    path: "/auth",
    element: (
      <FavoriteProvider>
        <BlockAdmin>
          <AuthLayout />
        </BlockAdmin>
      </FavoriteProvider>
    ),
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "payment-success", element: <PaymentSuccess /> },
      { path: "register", element: <RegisterPage /> },
      {
        path: "payment",
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
      <FavoriteProvider>
        <RequireAdmin>
          <DashboardLayout />
        </RequireAdmin>
      </FavoriteProvider>
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

export default AppRoutes;
