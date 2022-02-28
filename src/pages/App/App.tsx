import React, { useState } from "react";
import FileUpload from './../../components/FileUpload/FileUpload'
import './App.scss';

function App() {

  const updateUploadedFiles = (contentFile: string) => console.log(contentFile);
    

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
