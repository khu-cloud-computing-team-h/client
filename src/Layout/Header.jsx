import styled from '@emotion/styled';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@chakra-ui/react';

const Header = () => {
  const redirect_uri = import.meta.env.VITE_REDIRECT_URL;
  const google_client_id = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  const GoogleURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${google_client_id}&redirect_uri=${redirect_uri}/google&response_type=code&scope=email profile`;

  const handleGoogleLoginButton = () => {
    window.location.href = GoogleURL;
  };

  const ACCESS_TOKEN = localStorage.getItem('ACCESS_TOKEN');
  const navigate = useNavigate();

  const handleSignOut = () => {
    // await instance.post('/v1/user/log-out');
    localStorage.removeItem('ACCESS_TOKEN');
    navigate('/');
  };

  return (
    <HeaderWrapper>
      <Button size='lg' colorScheme='blue'>
        <Link to='/'>Home</Link>
      </Button>
      <Navigation>
        {!ACCESS_TOKEN && (
          <Button
            size='lg'
            colorScheme='green'
            onClick={handleGoogleLoginButton}
          >
            로그인
          </Button>
        )}
        {ACCESS_TOKEN && (
          <Button size='lg' colorScheme='pink' onClick={handleSignOut}>
            로그아웃
          </Button>
        )}
      </Navigation>
    </HeaderWrapper>
  );
};

export default Header;

const HeaderWrapper = styled.header`
  border: 1px solid black;
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  height: 7.6rem;
  padding: 0 3.5rem;

  button {
    font-size: 2rem;
    padding: 2rem;
  }
`;

const Navigation = styled.nav`
  display: flex;
  gap: 5rem;
  align-items: center;
`;
