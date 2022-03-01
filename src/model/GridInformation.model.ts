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

export interface CellCoordinate {
    column: number;
    row: number;
}
export interface GetGridOutput {
    grid: boolean[][],
    aliveCells: CellCoordinate[]
}
