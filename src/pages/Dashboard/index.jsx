import { useQuery } from '@tanstack/react-query';
import instance from '../../apis/instance';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

/** 로그인 성공 페이지 */
export default function Dashboard() {
  const { data: id, isLoading: isIdLoading } = useQuery({
    queryKey: ['firstData'],
    queryFn: async () => {
      const res = await instance.get('/auth/token');

      return res.data.id;
    },
  });

  const { data, isLoading: isImageLoading } = useQuery({
    queryKey: ['getData'],
    queryFn: async () => {
      const res = await instance.get(`/manage/image`);

      return res.data;
    },
  });

  const { data: dataImage, isLoading: isImageDataLoading } = useQuery({
    queryKey: ['getImageData'],
    queryFn: async () => {
      const res = await instance.get(`/manage/image-data`);

      return res.data.results.map(({ ImageID }) => ImageID).reverse();
    },
  });

  if (isIdLoading || isImageLoading || isImageDataLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      {data
        .slice()
        .reverse()
        .map((url, idx) => {
          return (
            <Wrapper to={`${dataImage[idx]}`} key={`${url}-${idx}`}>
              <img src={url} width={300} height={300} />
            </Wrapper>
          );
        })}
      {data.length === 0 && (
        <p
          style={{
            textAlign: 'center',
            fontSize: '46px',
          }}
        >
          No Data
        </p>
      )}
    </Container>
  );
}

const Container = styled.section`
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 50px 100px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 50px;
`;

const Wrapper = styled(Link)`
  border: 1px solid black;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
