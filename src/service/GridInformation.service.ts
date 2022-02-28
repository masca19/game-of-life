import { CellCoordinate, GetGridOutput, GridInformation, ValueOfGrid } from "../model/GridInformation.model";

export const getInformationForGame = (fileContent: string): GridInformation | null => {
    fileContent = fileContent.replace('\r\n', '\n');
    const contentSplitted: string[] = fileContent.split('\n');
    const generationInfoStr: string = contentSplitted[0];
    const structureInfoStr: string = contentSplitted[1];
    contentSplitted.splice(0, 2);
    const isValidContent = validationOfGenerationInfo(generationInfoStr) 
        && validationOfStructureInfo(structureInfoStr, contentSplitted) 
        && validationOfGrid(contentSplitted)
    if(!isValidContent) return null;
    const {grid, aliveCells} = getGrid(contentSplitted);
    return {
        generation: getGeneration(generationInfoStr),
        column: contentSplitted[0].length,
        row: contentSplitted.length,
        grid: grid,
        aliveCells: aliveCells
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

const getGeneration = (content: string): number => {
    return +content.split(' ')[1];
}

const getGrid = (content: string[]): GetGridOutput => {
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