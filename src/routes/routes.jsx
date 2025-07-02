import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { createBrowserRouter } from "react-router-dom";

import MainLayOut from "../../MainLayOut";
import LoginPage from "../pages/Auth/Login/LoginPage";
import FilterPage from "../pages/public/FilterPage/FilterPage";
import SingleListingPage from "../pages/public/FilterPage/SingleListingPage";
import Home from "../pages/public/Home/Home";

import ProfilePage from "../components/ProfilePage/ProfilePage";
import Dashboard from "../pages/admin/Dashboard";
import ErrorPage from "../pages/err/ErrorPage";
import CheckoutForm from "../pages/public/CheckoutForm/CheckoutForm";
import Contact from "../pages/public/Contact/Contact";
import FavouritePage from "../pages/public/FavouritePage/FavouritePage";
import About from "../pages/public/about/About";
import PropertiesPage from "../pages/public/properties/PropertiesPage";
import SinglePropertyPage from "../pages/public/properties/SinglePropertyPage";

// import { lazy } from "react";
// const Contact = lazy(() => import("../pages/Contact/Contact"));

const stripePromise = loadStripe(
  "pk_test_51RcJiND60jTqpzFUTyaTS0m8gzJ8dJUoCMfzokDmF8UKWIKgzdoguwKoRuB1o1QOhzHKtUiRh7Q4TWURblIAzbtS00UT4FOEQx",
);

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
        path: "/favourite",
        element: <FavouritePage />,
      },
      {
        path: "/properties/:id",
        element: <SinglePropertyPage />,
      },
      // -----------------------------------------------------------
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
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/register",
        element: (
          <Elements stripe={stripePromise}>
            <CheckoutForm />
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
