import styled from '@emotion/styled';
import { Link, useNavigate } from 'react-router-dom';
import {
  AlertDialog,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Box,
  Button,
  Image,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  useDisclosure,
} from '@chakra-ui/react';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useState } from 'react';
import { useRef } from 'react';

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
        reader.onload = () => {
          // 이미지 데이터를 Blob으로 변환
          const blob = arrayBufferToBlob(reader.result);
          // Blob URL 생성
          const previewUrl = URL.createObjectURL(blob);
          onSetPreview(previewUrl);
          // Do whatever you want with the file contents
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

const Header = () => {
  const [preview, setPreview] = useState('none');
  const [folderName, setFolderName] = useState('');
  const [folder, setFolder] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const redirect_uri = import.meta.env.VITE_REDIRECT_URL;
  const google_client_id = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  const GoogleURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${google_client_id}&redirect_uri=${redirect_uri}/google&response_type=code&scope=email profile`;

  const handleGoogleLoginButton = () => {
    window.location.href = GoogleURL;
  };

  const ACCESS_TOKEN = localStorage.getItem('ACCESS_TOKEN');
  const navigate = useNavigate();

  const handleSignOut = () => {
    // await instance.post('/v1/user/log-out');
    localStorage.removeItem('ACCESS_TOKEN');
    navigate('/');
  };

  const handleFolderName = (e) => {
    setFolderName(e.target.value);
  };

  const handleCreateFolder = (e) => {
    e.preventDefault();
    setFolder((prev) => [...prev, e.target[0].value]);
    setFolderName('');
    onClose();
  };

  const isError = folderName === '';

  return (
    <>
      <HeaderWrapper>
        <Button size='lg' colorScheme='blue'>
          <Link to='/'>Home</Link>
        </Button>
        <Navigation>
          {!ACCESS_TOKEN && (
            <Button
              size='lg'
              colorScheme='green'
              onClick={handleGoogleLoginButton}
            >
              로그인
            </Button>
          )}
          {ACCESS_TOKEN && (
            <Button size='lg' colorScheme='pink' onClick={handleSignOut}>
              로그아웃
            </Button>
          )}
        </Navigation>
      </HeaderWrapper>
      <DropzoneWrapper>
        <MyDropzone onSetPreview={setPreview} />
      </DropzoneWrapper>
      <Button size='lg' colorScheme='teal' onClick={onOpen}>
        Create Folder
      </Button>
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={() => {
          setFolderName('');
          onClose();
        }}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>폴더를 생성하시겠습니까?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <form onSubmit={handleCreateFolder}>
            <FormControl isInvalid={isError} width='90%' margin='0 auto'>
              <FormLabel>폴더 이름을 입력해주세요.</FormLabel>
              <Input
                type='text'
                value={folderName}
                onChange={handleFolderName}
                pattern='[a-zA-Z0-9ㄱ-힣]*'
                title='10자 이내의 숫자, 문자만 입력하세요.'
                maxLength={10}
                placeholder='10자 이내의 숫자, 문자만 입력하세요.'
              />
              {isError && (
                <FormErrorMessage>필수 입력값 입니다.</FormErrorMessage>
              )}
            </FormControl>
            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={() => {
                  setFolderName('');
                  onClose();
                }}
              >
                No
              </Button>
              <Button type='submit' colorScheme='red' ml={3}>
                Yes
              </Button>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>

      <FolderWrapper>
        {folder?.map((pileName) => (
          <>
            <Folder to={`/${pileName}`}>
              <Image
                src='https://cdn-icons-png.freepik.com/512/5994/5994710.png'
                alt='folder image'
                width='100px'
                height='100px'
              />
              <p>{pileName}</p>
            </Folder>
          </>
        ))}
        {preview !== 'none' && (
          <Image
            cursor='pointer'
            width='100px'
            height='100px'
            src={preview}
            alt='preview-image'
          />
        )}
      </FolderWrapper>
    </>
  );
};

export default Header;

const HeaderWrapper = styled.header`
  border: 1px solid black;
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  height: 7.6rem;
  padding: 0 3.5rem;

  button {
    font-size: 2rem;
    padding: 2rem;
  }
`;

const Navigation = styled.nav`
  display: flex;
  gap: 5rem;
  align-items: center;
`;

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

const FolderWrapper = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const Folder = styled(Link)`
  width: 10rem;
  height: 10rem;

  p {
    text-align: center;
  }
`;
