import React from 'react';
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

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
      // {
      //   path: '/aa',
      //   element: <Aa />,
      // },
    ],
  },
]);

export default router;
