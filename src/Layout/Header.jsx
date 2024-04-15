import { useState } from 'react';
import Navigation from './Navigation';
import Dropzone from '../components/Dropzone';
import CreateFolder from '../components/CreateFolder';
import Files from '../components/Files';

const Header = () => {
  const [preview, setPreview] = useState('none');
  const [folder, setFolder] = useState([]);

  return (
    <>
      <Navigation />
      <Dropzone onSetPreview={setPreview} />
      <CreateFolder onSetFolder={setFolder} />
      <Files preview={preview} folder={folder} />
    </>
  );
};

export default Header;
