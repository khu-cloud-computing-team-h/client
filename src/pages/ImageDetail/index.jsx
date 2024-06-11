import { useParams } from 'react-router-dom';

/** 디테일 페이지 */
export default function ImageDetail() {
  const { imageID } = useParams();
  console.log(imageID);
  return <div>NewFolder</div>;
}
