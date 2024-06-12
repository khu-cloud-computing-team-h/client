import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import instance from '../../apis/instance';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { queryClient } from '../../App';

/** 디테일 페이지 */
export default function ImageDetail() {
  const navigate = useNavigate();
  const { imageID } = useParams();

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

  if (isImageLoading || isImageDataLoading) {
    return <p>Loading...</p>;
  }

  if (!imageData || !imageData.UploadTime) {
    return <p>Invalid data</p>;
  }

  const date = new Date(imageData?.UploadTime);

  const datePart = date?.toISOString().split('T')[0];
  const timePart = date?.toTimeString().split(' ')[0];

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
      <DeleteButton onClick={handleDeleteImage}>삭제하기</DeleteButton>
    </Section>
  );
}

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
