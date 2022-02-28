import React, { useRef } from "react";
import { InputProps } from './FileUpload.model'
import './FileUpload.scss';


const FileUpload = ({
  label,
  updateFileCb,
  accept,
  isInError
}: InputProps) => {
  const fileInputField = useRef<HTMLInputElement>(null);
  let fileReader: FileReader;

  const FileUploadRespose = () => {
    const messagge = "The content of the file does not respect the rules for a correct reading, correct the file and try again"
    return (
      <span className="error">{messagge}</span>
    )
  }  

  const handleUploadBtnClick = () => {
    fileInputField.current?.click();
  };

  
  const handleFileRead = () => {
    updateFileCb(fileReader.result as string)
  };
  

  const handleNewFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return 
    const file: Blob = e.target.files[0];
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  };

  return (
    <section>
      <h2>{label}</h2>
      <button onClick={handleUploadBtnClick}>
        <div>
          <span>Choose File</span>
        </div>
      </button>
      <input
        type="file"
        ref={fileInputField}
        onChange={handleNewFileUpload}
        accept={accept}
      />
      {isInError && <FileUploadRespose />}
    </section>
  );
};

export default FileUpload;
