import { useEffect, useState } from "react";
import FileUpload from './../../components/FileUpload/FileUpload';
import GameOfLife from '../../components/GameOfLife/GameOfLife';
import { getInformationForGame } from '../../service/GridInformation.service';
import { getNextGenerationGrid } from '../../service/NextGeneration.service';
import { GridInformation } from "../../model/GridInformation.model";
import './App.scss';

export default function App() {
  const labelFirtSection = "To calculate the next generation load the file with the current generation. Please follow the specific file structure"
  const [gridCurrentGeneration, setGridCurrentGeneration] = useState<GridInformation>();
  const [gridNextGeneration, setGridNextGeneration] = useState<GridInformation>();
  
  useEffect(() => {
    gridCurrentGeneration && setGridNextGeneration(getNextGenerationGrid(gridCurrentGeneration))
  }, [gridCurrentGeneration])
  
  const updateUploadedFiles = (contentFile: string) => {
    setGridCurrentGeneration(getInformationForGame(contentFile))
  }

  const cleanAll = () => {
    setGridCurrentGeneration(undefined);
    setGridNextGeneration(undefined);
  }


  return (
    <main>
      <FileUpload
        accept=".txt"
        title="Choose file"
        label={labelFirtSection}
        updateFileCb={updateUploadedFiles}
        cleanAll={cleanAll}
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

