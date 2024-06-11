import React from 'react';
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from './Layout/MainLayout';

const AuthGoogle = lazy(() => import('./pages/AuthGoogle'));
const Error = lazy(() => import('./pages/Error'));
const Home = lazy(() => import('./pages/Home'));
const HomeLayout = lazy(() => import('./Layout/HomeLayout'));
const Layout = lazy(() => import('./Layout/MainLayout'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
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
    path: '/dashboard',
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: ':imageID',
        element: <NewFolder />,
      },
    ],
  },
]);

export default router;
