import { Outlet } from 'react-router-dom';
import Header from './Header';
import styled from '@emotion/styled';

export default function MainLayout() {
  return (
    <>
      <Header />
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
