import styled from '@emotion/styled';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import instance from '../apis/instance';

const arrayBufferToBlob = (arrayBuffer) => {
  const byteArray = new Uint8Array(arrayBuffer);
  return new Blob([byteArray], { type: 'image/jpeg' }); // 혹은 다른 이미지 타입에 맞게 수정
};

function MyDropzone({ onSetPreview }) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();

        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');
        reader.onload = async () => {
          // 이미지 데이터를 Blob으로 변환
          const blob = arrayBufferToBlob(reader.result);
          // Blob URL 생성
          const previewUrl = URL.createObjectURL(blob);
          onSetPreview(previewUrl);
          const formData = new FormData();
          formData.append('imageFile', file);

          try {
            await instance.post('/manage/image', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
          } catch (err) {
            console.error(err);
          }
        };

        reader.readAsArrayBuffer(file);
      });
    },
    [onSetPreview]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  // const {
  //   getRootProps,
  //   getInputProps,
  // } = useDropzone({
  //   accept: {
  //     "image/*": [".jpeg", ".jpg", ".png"],
  //   },
  // });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
      )}
    </div>
  );
}

export default function Dropzone({ onSetPreview }) {
  return (
    <DropzoneWrapper>
      <MyDropzone onSetPreview={onSetPreview} />
    </DropzoneWrapper>
  );
}

const DropzoneWrapper = styled.section`
  width: 90%;
  margin: 10rem auto;
  cursor: pointer;
  border: 5px dashed black;

  p {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 20rem;
    font-size: 2rem;
  }
`;
