import { RouterProvider } from 'react-router-dom';
import router from './Router';
import { Global } from '@emotion/react';
import global from './styles/global';

export default function App() {
  return (
    <>
      <Global styles={global} />
      <RouterProvider router={router} />
    </>
  );
}
