import styled from '@emotion/styled';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import instance from '../apis/instance';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../App';

function MyDropzone() {
  const { mutateAsync: imageUploadMutate, isPending: isImageUploadPending } =
    useMutation({
      mutationFn: (formData) => {
        return instance.post('/manage/image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['getData'] });
        queryClient.invalidateQueries({ queryKey: ['getImageData'] });
      },
    });

  const { mutateAsync: createTagsMutate, isPending: isCreateTagsPending } =
    useMutation({
      mutationFn: (formData) => {
        return instance.post('/vision/tags/detect', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['getData'] });
        queryClient.invalidateQueries({ queryKey: ['getImageData'] });
      },
    });

  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();

        reader.onabort = () => {};
        reader.onerror = () => console.error('file reading has failed');
        reader.onload = async () => {
          const formData = new FormData();

          formData.append('imageFile', file);

          try {
            const imageIdData = await imageUploadMutate(formData);
            const arr = imageIdData.data.split(' ');
            const imageId = arr[arr.length - 1];

            await createTagsMutate(formData);
            const res = await instance.get('/vision/tags');
            const tagsWithSpace = res.data.tags;
            const tags = tagsWithSpace
              .filter((tag) => !/[a-zA-Z]/.test(tag))
              .map((tag) => tag.replace(/\s+/g, ''));

            await instance.post('/manage/image/upload/tags', {
              imageId,
              tags,
            });
          } catch (err) {
            console.error(err);
          }
        };

        reader.readAsArrayBuffer(file);
      });
    },
    [imageUploadMutate, createTagsMutate]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
    },
  });
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
        ) : isImageUploadPending || isCreateTagsPending ? (
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
