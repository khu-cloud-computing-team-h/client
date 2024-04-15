import { Outlet } from 'react-router-dom';
import styled from '@emotion/styled';
import Navigation from './Navigation';

export default function HomeLayout() {
  return (
    <>
      <Navigation />
      <Main>
        <Outlet />
      </Main>
    </>
  );
}

const Main = styled.main`
  max-width: 179.2rem;
  margin: 0 auto;
  margin-top: 7.6rem;
`;
