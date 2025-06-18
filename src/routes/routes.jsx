import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { createBrowserRouter } from "react-router-dom";
import MainLayOut from "../../MainLayOut";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import LoginPage from "../pages/Authentication/LoginPage/LoginPage";
import RegisterPage from "../pages/Authentication/RegisterPage/RegisterPage";
import FilterPage from "../pages/FilterPage/FilterPage";
import SingleListingPage from "../pages/FilterPage/SingleListingPage";
import Home from "../pages/Home/Home";

import Contact from "../pages/Contact/Contact";
import About from "../pages/about/About";
import ProfilePage from "../components/ProfilePage/ProfilePage";
import PropertiesPage from "../pages/properties/PropertiesPage";
import SinglePropertyPage from "../pages/properties/SinglePropertyPage";

// import { lazy } from "react";
// const Contact = lazy(() => import("../pages/Contact/Contact"));

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/about",
        element: <About />,
      },

      // ----------------------------- property page ----------------
      {
        path: "/properties",
        element: <PropertiesPage />,
      },
      {
        path: "/properties/:id",
        element: <SinglePropertyPage />,
      },
      // ----------------------------
      {
        path: "/property-list",
        element: <FilterPage />,
      },
      {
        path: "/property-list/:id",
        element: <SingleListingPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: (
          <Elements stripe={stripePromise}>
            <RegisterPage />
          </Elements>
        ),
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
    ],
  },
]);

export { AppRoutes };
