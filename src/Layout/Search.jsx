import styled from '@emotion/styled';
import instance from '../apis/instance';

export default function Search() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const tags = e.target[0].value.replace(/\s/g, '').split(',');
    const queryString = tags.map((tag) => `keywords=${tag}`).join('&');
    console.log(queryString);

    const res = await instance.get(`/search/tag?${queryString}`, {
      params: {
        size: 1000,
      },
    });

    console.log(res.data.imageIds);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type='text'
        placeholder='반드시 태그를 ,를 이용하여 구분해주세요. (ex. 만화, 몸짓, 미술). 입력이 완료되면 엔터키를 눌러주세요.'
      />
    </form>
  );
}

const Input = styled.input`
  margin: 0 auto;
  display: flex;
  align-items: center;
  width: 80%;
  border: 1px solid black;
  padding: 10px 20px;
  border-radius: 10px;

  &::placeholder {
    color: gray;
  }
`;
