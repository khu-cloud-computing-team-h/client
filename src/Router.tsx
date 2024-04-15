import React from 'react';
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from './Layout/MainLayout';

const AuthGoogle = lazy(() => import('./pages/AuthGoogle'));
const Error = lazy(() => import('./pages/Error'));
const Home = lazy(() => import('./pages/Home'));
const HomeLayout = lazy(() => import('./Layout/HomeLayout'));
const Layout = lazy(() => import('./Layout/MainLayout'));
const LoginSuccess = lazy(() => import('./pages/LoginSuccess'));
const NewFolder = lazy(() => import('./pages/NewFolder'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
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
    ],
  },
  {
    path: '/success',
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
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
