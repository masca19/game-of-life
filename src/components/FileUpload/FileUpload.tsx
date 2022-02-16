import React, { useRef, DragEvent, RefObject } from "react";


const FileUpload = ({
  label,
  updateFileCb,
  accept
}: { label: string, updateFileCb: any, accept: string}) => {
  const fileInputField = useRef<HTMLInputElement>(null);

  const handleUploadBtnClick = () => {
    fileInputField?.current?.click();
  };
 
  const handlerDropFile = (files: DragEvent<HTMLDivElement>) => {
    console.log(files)
    
  }

  const handleNewFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    
  };

  return (
      <div onDrop={handlerDropFile}>
        <label>{label}</label>
        <p>Drag and drop your files anywhere or</p>
        <button type="button" onClick={handleUploadBtnClick}>
          <i className="fas fa-file-upload" />
          <span>Upload generation</span>
        </button>
        <input
          type="file"
          ref={fileInputField}
          onChange={handleNewFileUpload}
          title=""
          value=""
          accept={accept}
        />
      </div>
  );
};

export default FileUpload;
