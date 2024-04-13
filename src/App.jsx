import { RouterProvider } from 'react-router-dom';
import router from './Router';
import { Global } from '@emotion/react';
import global from './styles/global';
import { ChakraProvider } from '@chakra-ui/react';
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <ChakraProvider>
        <Global styles={global} />
        <RouterProvider router={router} />
      </ChakraProvider>
    </GoogleOAuthProvider>
  );
}
