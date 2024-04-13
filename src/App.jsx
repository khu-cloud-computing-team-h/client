import { RouterProvider } from 'react-router-dom';
import router from './Router';
import { Global } from '@emotion/react';
import global from './styles/global';
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Global styles={global} />
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  );
}
