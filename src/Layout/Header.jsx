import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@chakra-ui/react';

const Header = () => {
  const redirect_uri = import.meta.env.VITE_REDIRECT_URL;
  const google_client_id = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  const GoogleURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${google_client_id}&redirect_uri=${redirect_uri}/google&response_type=code&scope=email profile`;

  console.log('red', redirect_uri);
  console.log('gl', google_client_id);
  console.log('URL', GoogleURL);

  const handleGoogleLoginButton = () => {
    window.location.href = GoogleURL;
  };

  const ACCESS_TOKEN = localStorage.getItem('ACCESS_TOKEN');
  const navigate = useNavigate();

  const handleSignOut = async () => {
    // await instance.post('/v1/user/log-out');
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('REFRESH_TOKEN');

    navigate('/');
  };

  return (
    <HeaderWrapper>
      <Button colorScheme='blue'>
        <Link to='/'>Home</Link>
      </Button>
      <Navigation>
        {!ACCESS_TOKEN && (
          <Button colorScheme='green' onClick={handleGoogleLoginButton}>
            로그인
          </Button>
        )}
        {ACCESS_TOKEN && (
          <StSignOutButton onClick={handleSignOut}>로그아웃</StSignOutButton>
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
`;

const Navigation = styled.nav`
  display: flex;
  gap: 5rem;
  align-items: center;
`;

const signInLink = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 7.8rem;
  height: 3rem;
  border-radius: 6px;
`;

const StSignOutButton = styled.button`
  color: ${({ theme }) => theme.colors.gray_300};
  background-color: ${({ theme }) => theme.colors.gray_550};

  ${signInLink}
  ${({ theme }) => theme.fonts.btn_14_semibold};
`;
