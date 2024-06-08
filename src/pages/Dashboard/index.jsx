import { useQuery } from '@tanstack/react-query';
import instance from '../../apis/instance';
import styled from '@emotion/styled';

/** 로그인 성공 페이지 */
export default function Dashboard() {
  const { data: id } = useQuery({
    queryKey: ['firstData'],
    queryFn: async () => {
      const res = await instance.get('/auth/token');

      return res.data.id;
    },
  });

  const { data } = useQuery({
    queryKey: ['getData'],
    queryFn: async () => {
      const res = await instance.get(`/manage/image`);

      return res.data;
    },
  });
  console.log(data);
  return (
    <Container>
      {data
        ?.slice()
        .reverse()
        .map((url, idx) => (
          <Wrapper key={`${url}-${idx}`}>
            <img src={url} width={300} height={300} />
          </Wrapper>
        ))}
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

const Wrapper = styled.article`
  border: 1px solid black;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
