import React from 'react';
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const Error = lazy(() => import('./pages/Error'));
const Layout = lazy(() => import('./Layout'));
const LoginSuccess = lazy(() => import('./pages/LoginSuccess'));
const AuthGoogle = lazy(() => import('./pages/AuthGoogle'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'login/oauth2/code/google',
        element: <AuthGoogle />,
      },
      {
        path: 'success',
        element: <LoginSuccess />,
      },
    ],
  },
]);

export default router;
