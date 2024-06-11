import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import instance from '../../apis/instance';

/** 디테일 페이지 */
export default function ImageDetail() {
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

      return res.data;
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

  return (
    <section>
      <img src={image} alt='image' width={300} height={300} />
      <article>
        <p>이름: {123}</p>
        <p>
          업로드 시간: {datePart} {timePart}
        </p>
        <p>
          <span>태그: </span>
          {imageData?.Tags?.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </p>
      </article>
    </section>
  );
}
