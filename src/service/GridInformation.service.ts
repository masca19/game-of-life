import { CellCoordinate, GetGridOutput, GridInformationAsString, GridInformation, ValueOfGrid } from "../model/GridInformation.model";

let gridInformationAsStirng: GridInformationAsString;

//Collecting the content from the file and parsing the information
export const getGridInformation = (fileContent: string): GridInformation => {
    if(!gridInformationAsStirng){
        gridInformationAsStirng = getGridInformationAsString(fileContent);
    }
    const {grid, aliveCells} = getGridAndAliveCellsFromString(gridInformationAsStirng.gridAsString);
    return {
        generation: getGenerationFromString(gridInformationAsStirng.generationInfoStr),
        column: gridInformationAsStirng.gridAsString[0].length,
        row: gridInformationAsStirng.gridAsString.length,
        grid: grid,
        aliveCells: aliveCells
    }
}


export const isValidContent = (fileContent: string): boolean => {
    gridInformationAsStirng = getGridInformationAsString(fileContent);
    return validationOfGenerationInfo(gridInformationAsStirng.generationInfoStr) 
    && validationOfStructureInfo(gridInformationAsStirng.structureInfoStr, gridInformationAsStirng.gridAsString) 
    && validationOfGrid(gridInformationAsStirng.gridAsString);
}

const getGridInformationAsString = (fileContent: string): GridInformationAsString => {
    fileContent = fileContent.replace('\r\n', '\n');
    const contentSplitted: string[] = fileContent.split('\n');
    const generationInfoStr: string = contentSplitted[0];
    const structureInfoStr: string = contentSplitted[1];
    contentSplitted.splice(0, 2);
    return {
        generationInfoStr: generationInfoStr,
        structureInfoStr: structureInfoStr,
        gridAsString: contentSplitted
    }
}

const validationOfGenerationInfo = (content: string): boolean => {
    const regex = new RegExp('^Generation [0-9]+$');
    return regex.test(content);
}

const validationOfStructureInfo = (content:string, gridAsString: string[]): boolean => {
    const regex = new RegExp('^[0-9]+ [0-9]+$');
    if (!regex.test(content)){
        return false;
    }
    const column = gridAsString[0].length;
    const row = gridAsString.length;
    const contentSplitted = content.split(' ')
    return +contentSplitted[0] === row && +contentSplitted[1] === column
}

const validationOfGrid = (gridAsString: string[]): boolean => {
    const regex = new RegExp(`^(\\${ValueOfGrid.alive}|\\${ValueOfGrid.dead})*$`);
    return gridAsString.reduce((previus: boolean, currrent: string) => previus && regex.test(currrent), true);
}

const getGenerationFromString = (content: string): number => {
    return +content.split(' ')[1];
}

const getGridAndAliveCellsFromString = (content: string[]): GetGridOutput => {
    const aliveCells: CellCoordinate[] = []
    const grid = content.map((row, rowIndex) => {
        const rowSplitted = row.split('');
        return rowSplitted.map( (cell, columnIndex) => {
            const isAliveCell = ValueOfGrid.alive === cell;
            if(isAliveCell) {
                aliveCells.push({
                    row: rowIndex,
                    column: columnIndex
                })
            }
            return isAliveCell;
        })
    });
    return {
        grid: grid,
        aliveCells: aliveCells
    }
}