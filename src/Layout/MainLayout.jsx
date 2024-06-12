import { Outlet } from 'react-router-dom';
import Header from './Header';
import styled from '@emotion/styled';
import Search from './Search';
import { useParams } from 'react-router-dom';
import { createContext } from 'react';
import { useState } from 'react';

export const DataContext = createContext();

export default function MainLayout() {
  const { imageID } = useParams();
  const [searchedData, setSearchedData] = useState({
    data: [],
    isSearch: false,
  });

  return (
    <DataContext.Provider value={searchedData}>
      <Header />
      {!imageID && <Search onSearch={setSearchedData} />}
      <Main>
        <Outlet />
      </Main>
    </DataContext.Provider>
  );
}

const Main = styled.main`
  max-width: 179.2rem;
  margin: 0 auto;
  margin: 7.6rem 0;
`;
