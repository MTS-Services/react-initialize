import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { createBrowserRouter } from 'react-router-dom';
import MainLayOut from '../../MainLayOut';
import ErrorPage from '../components/ErrorPage/ErrorPage';
import LoginPage from '../pages/Authentication/LoginPage/LoginPage';
import RegisterPage from '../pages/Authentication/RegisterPage/RegisterPage';
import FilterPage from '../pages/FilterPage/FilterPage';
import SingleListingPage from '../pages/FilterPage/SingleListingPage';
import Home from '../pages/Home/Home';

import Contact from '../pages/Contact/Contact';

import ProfilePage from '../components/ProfilePage/ProfilePage';

// import { lazy } from "react";
// const Contact = lazy(() => import("../pages/Contact/Contact"));

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
import About from './../pages/about/About';

const AppRoutes = createBrowserRouter([
  {
    path: '/',
    element: <MainLayOut />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/listings',
        element: <FilterPage />,
      },
      {
        path: '/listings/:id',
        element: <SingleListingPage />,
      },
      {
        path: '/profile',
        element: <ProfilePage />,
      },
      {
        path: '/register',
        element: (
          <Elements stripe={stripePromise}>
            <RegisterPage />
          </Elements>
        ),
      },
    ],
  },
]);

export { AppRoutes };
