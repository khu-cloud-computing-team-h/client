import React from 'react';
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import SignIn from './pages/SignIn';
import AuthGoogle from './pages/AuthGoogle';

const Home = lazy(() => import('./pages/Home'));

const router = createBrowserRouter([
  {
    path: '/',
    // element: <Layout />,
    // errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: 'sign-in',
        children: [{ index: true, element: <SignIn /> }],
      },
    ],
  },
  {
    path: '/login/oauth2/code',
    children: [
      {
        path: 'google',
        element: <AuthGoogle />,
      },
    ],
  },
]);

export default router;
