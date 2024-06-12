import styled from '@emotion/styled';

const handleSubmit = (e) => {
  e.preventDefault();
  console.log(e.target[0].value);
};

export default function Search() {
  return (
    <form onSubmit={handleSubmit}>
      <Input type='text' placeholder='태그를 입력 후 엔터키를 눌러주세요' />
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
