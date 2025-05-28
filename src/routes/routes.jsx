import { createBrowserRouter } from "react-router-dom";
import MainLayOut from "../../MainLayOut";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import LoginPage from "../pages/Authentication/LoginPage/LoginPage";
import RegisterPage from "../pages/Authentication/RegisterPage/RegisterPage";
import FilterPage from "../pages/FilterPage/FilterPage";
import SingleListingPage from "../pages/FilterPage/SingleListingPage";
import Home from "../pages/Home/Home";
// import { lazy } from "react";
// const Contact = lazy(() => import("../pages/Contact/Contact"));

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
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/listings",
        element: <FilterPage />,
      },
      {
        path: "/listings/:id",
        element: <SingleListingPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },
]);

export { AppRoutes };
