import React, { useRef } from "react";


const FileUpload = ({
  label,
  updateFileCb,
  accept
}) => {
  const fileInputField = useRef(null);

  const handleUploadBtnClick = () => {
    fileInputField.current.click();
  };

  const handleNewFileUpload = (e) => {
    console.log(e)
    updateFileCb(e.target.files);
  };

  return (
      <div>
        <label>{label}</label>
        <p>Drag and drop your files anywhere or</p>
        <button type="button" onClick={handleUploadBtnClick}>
          <i className="fas fa-file-upload" />
          <span> Upload a file</span>
        </button>
        <input
          type="file"
          ref={fileInputField}
          onChange={handleNewFileUpload}
          title=""
          value=""
          accept
        />
      </div>
  );
};

export default FileUpload;
