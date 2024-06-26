import styled from '@emotion/styled';
import instance from '../apis/instance';
import { useState } from 'react';
import { useRef } from 'react';

export default function Search({ onSearch }) {
  const timerRef = useRef(null);
  const [suggests, setSuggests] = useState([]);
  const [error, setError] = useState('');

  const handleChange = async (e) => {
    e.preventDefault();
    const newValue = e.target.value;
    const koreanRegex = /^[가-힣ㄱ-ㅎㅏ-ㅣ\s,]*$/; // 한글과 콤마만 허용하는 정규 표현식

    if (koreanRegex.test(newValue)) {
      setError('');
    } else {
      setError('태그는 한글로만 존재합니다.');
      return;
    }

    const tag = newValue.replace(/\s/g, '').split(',');
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Set a new timer
    timerRef.current = setTimeout(async () => {
      const res = await instance.get(
        `/search/auto-complete?input=${tag[tag.length - 1]}`
      );

      setSuggests(res.data.suggestKeywords);
    }, 150);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (e.target[0].value === '') {
      onSearch({ data: [], isSearch: false });
      return;
    }

    const tags = e.target[0].value.replace(/\s/g, '').split(',');
    const queryString = tags.map((tag) => `keywords=${tag}`).join('&');

    const res = await instance.get(`/search/tag?${queryString}`, {
      params: {
        size: 1000,
      },
    });

    onSearch({ data: res.data.imageIds, isSearch: true });
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Input
          type='text'
          onChange={handleChange}
          placeholder='태그를 검색해보세요. 반드시 태그를 ,를 이용하여 구분해주세요. (ex. 만화, 몸짓, 미술). 입력이 완료되면 엔터키를 눌러주세요.'
        />
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </Form>
      {suggests.length !== 0 && (
        <Suggests>
          <span>추천 태그 : </span>
          {suggests.map((item, idx) => (
            <Suggest key={`${idx}-${item}`}>{item}</Suggest>
          ))}
        </Suggests>
      )}
    </>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
`;

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

const Suggests = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const Suggest = styled.span`
  border: 1px solid black;
  border-radius: 15px;
  padding: 3px 5px;
  text-align: center;
`;
