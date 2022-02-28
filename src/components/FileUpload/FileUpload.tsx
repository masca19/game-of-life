import React, { useRef, DragEvent } from "react";
import { InputProps } from './FileUpload.model'
import './FileUpload.scss';


const FileUpload = ({
  label,
  updateFileCb,
  accept
}: InputProps) => {
  const fileInputField = useRef<HTMLInputElement>(null);

  const handleUploadBtnClick = () => {
    fileInputField.current?.click();
  };

  let fileReader: FileReader;
  
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
    </section>
  );
};

export default FileUpload;
