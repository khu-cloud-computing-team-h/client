import { Outlet } from 'react-router-dom';
import Header from './Header';
import styled from '@emotion/styled';
import Search from './Search';
import { useParams } from 'react-router-dom';

export default function MainLayout() {
  const { imageID } = useParams();

  return (
    <>
      <Header />
      {!imageID && <Search />}
      <Main>
        <Outlet />
      </Main>
    </>
  );
}

const Main = styled.main`
  max-width: 179.2rem;
  margin: 0 auto;
  margin: 7.6rem 0;
`;
