import React from 'react';
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const App = lazy(() => import('./App'));

const router = createBrowserRouter([
  {
    path: '/',
    // element: <Layout />,
    // errorElement: <Error />,
    children: [
      {
        index: true,
        element: <App />,
      },
      // {
      //   path: '/aa',
      //   element: <Aa />,
      // },
    ],
  },
]);

export default router;
