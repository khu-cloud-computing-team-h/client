import styled from '@emotion/styled';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import instance from '../apis/instance';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../App';

const arrayBufferToBlob = (arrayBuffer) => {
  const byteArray = new Uint8Array(arrayBuffer);
  return new Blob([byteArray], { type: 'image/jpeg' }); // 혹은 다른 이미지 타입에 맞게 수정
};

function MyDropzone() {
  const { mutate, isPending } = useMutation({
    mutationFn: (formData) => {
      return instance.post('/manage/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getData'] });
    },
  });

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = async () => {
        const formData = new FormData();
        formData.append('imageFile', file);

        try {
          mutate(formData);
        } catch (err) {
          console.error(err);
        }
      };

      reader.readAsArrayBuffer(file);
    });
  }, []);

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
    <>
      <Container {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : isPending ? (
          <p style={{ textAlign: 'center' }}>sending an Image file...</p>
        ) : (
          <p>
            Drag &apos;n&apos; drop some files here, or click to select files
          </p>
        )}
      </Container>
    </>
  );
}

export default function Dropzone() {
  return (
    <DropzoneWrapper>
      <MyDropzone />
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

const Container = styled.div`
  p {
    font-size: 40px;
  }
`;
