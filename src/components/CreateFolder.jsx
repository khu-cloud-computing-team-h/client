import {
  AlertDialog,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function CreateFolder({ onSetFolder }) {
  const { pathname } = useLocation();

  const [folderName, setFolderName] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const handleFolderName = (e) => {
    setFolderName(e.target.value);
  };

  const handleCreateFolder = (e) => {
    e.preventDefault();
    onSetFolder((prev) => [
      ...prev,
      {
        folderName: e.target[0].value,
        path: `${pathname}/${e.target[0].value}`,
      },
    ]);
    setFolderName('');
    onClose();
  };

  const isError = folderName === '';

  return (
    <>
      <p>{pathname}</p>
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
    </>
  );
}
