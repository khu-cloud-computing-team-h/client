import styled from '@emotion/styled';
import { Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function Files({ preview, folder }) {
  return (
    <FolderWrapper>
      {folder?.map((pileName) => (
        <>
          <Folder to={`/success/${pileName}`}>
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
  );
}

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
