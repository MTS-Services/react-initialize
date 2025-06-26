import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { createBrowserRouter } from "react-router-dom";
import MainLayOut from "../../MainLayOut";
import LoginPage from "../pages/Auth/Login/LoginPage";
import FilterPage from "../pages/FilterPage/FilterPage";
import SingleListingPage from "../pages/FilterPage/SingleListingPage";
import Home from "../pages/Home/Home";

import ProfilePage from "../components/ProfilePage/ProfilePage";
import CheckoutForm from "../pages/CheckoutForm/CheckoutForm";
import Contact from "../pages/Contact/Contact";
import About from "../pages/about/About";
import ErrorPage from "../pages/err/ErrorPage";
import PropertiesPage from "../pages/properties/PropertiesPage";
import SinglePropertyPage from "../pages/properties/SinglePropertyPage";

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
