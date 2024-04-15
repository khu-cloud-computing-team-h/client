import styled from '@emotion/styled';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

function MyDropzone() {
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);

    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        console.log(binaryStr);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

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
        <MyDropzone />
      </DropzoneWrapper>
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
