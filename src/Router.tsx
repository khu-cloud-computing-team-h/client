import React from 'react';
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const AuthGoogle = lazy(() => import('./pages/AuthGoogle'));
const Error = lazy(() => import('./pages/Error'));
const Home = lazy(() => import('./pages/Home'));
const Layout = lazy(() => import('./Layout'));
const LoginSuccess = lazy(() => import('./pages/LoginSuccess'));
const NewFolder = lazy(() => import('./pages/NewFolder'));

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
      {
        path: ':folderName',
        element: <NewFolder />,
      },
    ],
  },
]);

export default router;
