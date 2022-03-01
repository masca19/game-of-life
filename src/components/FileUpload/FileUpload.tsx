import React, { useRef, useState } from "react";
import { isValidContent } from "../../service/GridInformation.service";
import { InputProps } from './FileUpload.model'
import './FileUpload.scss';


const FileUpload = ({
  title,
  label,
  accept,
  updateFileCb,
  cleanAll
}: InputProps) => {
  const [isErrorFile, setIsErrorFile] = useState<boolean>(false);
  const fileInputField = useRef<HTMLInputElement>(null);
  let fileReader: FileReader;

  const FileUploadRespose = () => {
    const messagge = "The content of the file does not respect the rules for a correct reading, correct the file and try again";
    return (
      <span className="error">{messagge}</span>
    );
  }  

  const handleUploadBtnClick = () => {
    fileInputField.current?.click();
  };

  const handleFileRead = () => {
    if(isValidContent(fileReader.result as string)){
      setIsErrorFile(false);
      updateFileCb(fileReader.result as string);
    }
    else {
      setIsErrorFile(true)
      cleanAll()
    }
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
      <h2>{title}</h2>
      <p>{label}</p>
      <button onClick={handleUploadBtnClick}>
        <div>
          <span>File</span>
        </div>
      </button>
      <input
        type="file"
        ref={fileInputField}
        onChange={handleNewFileUpload}
        accept={accept}
      />
      {isErrorFile && <FileUploadRespose />}
    </section>
  );
};

export default FileUpload;
