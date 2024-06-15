import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import instance from '../../apis/instance';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { queryClient } from '../../App';
import { useState } from 'react';

/** 디테일 페이지 */
export default function ImageDetail() {
  const navigate = useNavigate();
  const { imageID } = useParams();
  const [showInput, setShowInput] = useState(false);
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    e.preventDefault();
    const newValue = e.target.value;
    const koreanRegex = /^[가-힣,]*$/; // 한글과 콤마만 허용하는 정규 표현식

    if (koreanRegex.test(newValue)) {
      setValue(newValue);
      setError('');
    } else {
      setError('한글만 입력가능합니다.');
    }
  };

  const { data: image, isLoading: isImageLoading } = useQuery({
    queryKey: ['getOneImage'],
    queryFn: async () => {
      const res = await instance.get(`/manage/image/${imageID}`);

      return res.data;
    },
  });

  const { data: imageData, isLoading: isImageDataLoading } = useQuery({
    queryKey: ['getImageDetail'],
    queryFn: async () => {
      const res = await instance.get(`/manage/image-data/${imageID}`);

      return res.data.data[0];
    },
  });

  const { mutate } = useMutation({
    mutationFn: async () => {
      await instance.delete(`/manage/image/${imageID}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getData'] });
      queryClient.invalidateQueries({ queryKey: ['getImageData'] });
      navigate('/dashboard');
    },
  });

  const { mutate: updateTagsMutate } = useMutation({
    mutationFn: async (tags) => {
      await instance.patch(`/manage/image/${imageID}/tags`, tags);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getImageDetail'] });
    },
  });

  if (isImageLoading || isImageDataLoading) {
    return <p>Loading...</p>;
  }

  if (!imageData || !imageData.UploadTime) {
    return <p>Invalid data</p>;
  }

  const date = new Date(imageData?.UploadTime);

  const datePart = date?.toISOString().split('T')[0];
  const timePart = date?.toTimeString().split(' ')[0];

  const handleShowInput = () => {
    setShowInput(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const arr = e.target[0].value.replace(/\s/g, '').split(',');
    updateTagsMutate(arr);
    setShowInput(false);
  };

  const handleDeleteImage = () => {
    mutate();
  };

  return (
    <Section>
      <img src={image} alt='image' width={500} height={500} />
      <Article>
        <p>
          업로드 시간: {datePart} {timePart}
        </p>
        <TagsContainer>
          <span>태그: </span>
          <Tags>
            {(imageData?.Tags?.length !== 0 &&
              imageData.Tags.map((tag) => <Tag key={tag}>{tag}</Tag>)) ||
              '없음'}
          </Tags>
        </TagsContainer>
      </Article>
      <ModifyTagsButton onClick={handleShowInput}>
        tag 수정하기
      </ModifyTagsButton>
      {showInput && (
        <Form onSubmit={handleSubmit}>
          <div>
            <TagInput
              type='text'
              value={value}
              onChange={handleChange}
              placeholder='태그를 검색해보세요. 반드시 태그를 ,를 이용하여 구분해주세요. (ex. 만화, 몸짓, 미술). 입력이 완료되면 엔터키를 눌러주세요.'
            />
            <SubmitInput type='submit' />
          </div>
          {error && <div style={{ color: 'red' }}>{error}</div>}
        </Form>
      )}
      <DeleteButton onClick={handleDeleteImage}>삭제하기</DeleteButton>
    </Section>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 50px;
  justify-content: center;
  align-items: center;
  font-size: 32px;
`;

const Article = styled.article`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
`;

const TagsContainer = styled.p`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Tags = styled.span`
  display: flex;
  gap: 10px;
  align-items: center;
  flex-shrink: 0;
`;

const Tag = styled.span`
  border: 1px solid black;
  border-radius: 15px;
  padding: 3px 5px;
  text-align: center;
`;

const ModifyTagsButton = styled.button`
  background-color: blue;
  color: white;
  border-radius: 20px;
  padding: 10px 20px;
  text-align: center;
  transition: all 0.2s ease;

  &:hover {
    background-color: darkblue;
  }

  &:active {
    background-color: blue;
  }
`;

const TagInput = styled.input`
  width: 830px;
  border: 1px solid black;
  padding: 10px 20px;
  border-radius: 10px;

  &::placeholder {
    color: gray;
  }
`;

const SubmitInput = styled.input`
  background-color: green;
  color: white;
  border-radius: 20px;
  padding: 10px 20px;
  text-align: center;
  transition: all 0.2s ease;
  margin-left: 10px;

  &:hover {
    background-color: yellowgreen;
  }

  &:active {
    background-color: green;
  }
`;

const DeleteButton = styled.button`
  background-color: red;
  color: white;
  border-radius: 20px;
  padding: 10px 20px;
  text-align: center;
  transition: all 0.2s ease;

  &:hover {
    background-color: darkred;
  }

  &:active {
    background-color: red;
  }
`;
