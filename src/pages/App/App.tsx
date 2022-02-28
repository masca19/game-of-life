import { useEffect, useState } from "react";
import FileUpload from './../../components/FileUpload/FileUpload';
import GameOfLife from '../../components/GameOfLife/GameOfLife';
import { getInformationForGame } from '../../service/GridInformation.service';
import { getNextGenerationGrid } from '../../service/NextGeneration.service';
import { GridInformation } from "../../model/GridInformation.model";
import './App.scss';

export default function App() {
  const [gridCurrentGeneration, setGridCurrentGeneration] = useState<GridInformation | null>();
  useEffect(() => {
    setIsErrorFile(!gridCurrentGeneration)
    !!gridCurrentGeneration && setGridNextGeneration(getNextGenerationGrid(gridCurrentGeneration))
  }, [gridCurrentGeneration])
  const [gridNextGeneration, setGridNextGeneration] = useState<GridInformation | null>();
  const [isErrorFile, setIsErrorFile] = useState<boolean>(false);
  const labelFirtSection = "To calculate the next generation load the file with the current generation, I recommend respecting the structure"
  
  const updateUploadedFiles = (contentFile: string) => {
    setGridCurrentGeneration(getInformationForGame(contentFile))
  }


  return (
    <main>
      <FileUpload
        accept=".txt"
        title="Choose file"
        label={labelFirtSection}
        updateFileCb={updateUploadedFiles}
        isInError={isErrorFile}
      />
      {
        gridCurrentGeneration
        && <GameOfLife key="current"
          title="Current generation"
          generation={gridCurrentGeneration.generation}
          column={gridCurrentGeneration.column}
          row={gridCurrentGeneration.row}
          grid={gridCurrentGeneration.grid}
          aliveCells={gridCurrentGeneration.aliveCells}
        />
      }

      {
        gridNextGeneration
        && <GameOfLife key="next"
          title="Next generation"
          generation={gridNextGeneration.generation}
          column={gridNextGeneration.column}
          row={gridNextGeneration.row}
          grid={gridNextGeneration.grid}
          aliveCells={gridNextGeneration.aliveCells}
        />
      }

    </main>
  );
}

