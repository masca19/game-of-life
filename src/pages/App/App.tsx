import { useState } from "react";
import FileUpload from './../../components/FileUpload/FileUpload';
import {getInformationForGame} from '../../service/GridInformation.service';
import { GridInformation } from "../../model/GridInformation.model";
import './App.scss';

export default function App() {
  const [gridInformation, setGridInformation] = useState<GridInformation | null>();
  const [isErrorFile, setIsErrorFile] = useState<boolean>(false);
  
  const updateUploadedFiles = (contentFile: string) => {
    setGridInformation(getInformationForGame(contentFile))
    setIsErrorFile(!!gridInformation)
  }
  

  return (
    <main>
        <FileUpload
          accept=".txt"
          label="File of generation"
          updateFileCb={updateUploadedFiles}
          isInError={isErrorFile}
        />
    </main>
  );
}

