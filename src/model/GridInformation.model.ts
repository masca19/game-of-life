export enum ValueOfGrid {
    alive = '*',
    dead = '.'
}
export interface GridInformation {
    generation: number;
    column: number;
    row: number;
    grid: boolean[][];
    aliveCells: CellCoordinate[];
}

export interface GrdiInformationAsString {
    generationInfoStr: string,
    structureInfoStr: string,
    gridAsString: string[]
}

export class CellCoordinate {
    column: number;
    row: number;

    constructor(row: number, column: number) {
        this.row = row;
        this.column = column;
    }

    static createIstance(row: number, column: number) { return new CellCoordinate(row, column)}
}
export interface GetGridOutput {
    grid: boolean[][],
    aliveCells: CellCoordinate[]
}

export interface InformationForCalculateNextGeneration{
    isAliveCell: boolean,
    cellsDeadNearAliveCell: CellCoordinate[]
}

export interface ResultNextGenerationToAliveCell {
    aliveCells: CellCoordinate[], 
    newCellsDeadNearAliveCell: Set<CellCoordinate> 
}