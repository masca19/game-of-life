import React, { useState } from "react";
import FileUpload from './../../components/FileUpload/FileUpload'
import './App.scss';

function App() {
  const [newUserInfo, setNewUserInfo] = useState({
    profileImages: []
  });

  const updateUploadedFiles = (contentFile: string | ArrayBuffer | null) => console.log(contentFile);
    

  return (
    <main>
        <FileUpload
          accept=".txt"
          label="File of generation"
          updateFileCb={updateUploadedFiles}
        />
    </main>
  );
}

export default App;
