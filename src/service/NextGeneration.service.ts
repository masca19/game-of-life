import { CellCoordinate, GridInformation, InformationForCalculateNextGeneration, ResultNextGenerationToAliveCell } from "../model/GridInformation.model";

const generalIndexToTurnAround: CellCoordinate[] = [
    { row: -1, column: -1, },
    { row: -1, column: 0, },
    { row: -1, column: 1, },
    { row: 0, column: -1, },
    { row: 0, column: 1, },
    { row: 1, column: -1, },
    { row: 1, column: 0, },
    { row: 1, column: 1, }
]

export const getNextGenerationGrid = (currentGridInformation: GridInformation): GridInformation => {
    const newGrid = currentGridInformation.grid.map(row  => row.map( item => item));
    let {aliveCells, newCellsDeadNearAliveCell}  = generateNextGenerationToAliveCell(currentGridInformation, newGrid);
    aliveCells = generateNextGenerationToDeadCell(currentGridInformation, newGrid, aliveCells, newCellsDeadNearAliveCell);

    return {
        generation: currentGridInformation.generation + 1,
        column: currentGridInformation.column,
        row: currentGridInformation.row,
        grid: newGrid,
        aliveCells: aliveCells
    }
}

const generateNextGenerationToAliveCell = (
    currentGridInformation: GridInformation, 
    newGrid: boolean[][]): ResultNextGenerationToAliveCell => 
{
    let newCellsDeadNearAliveCell = new Set<CellCoordinate>();
    const aliveCells: CellCoordinate[] = [];
    currentGridInformation.aliveCells.forEach(cell => {
        const { isAliveCell, cellsDeadNearAliveCell } = nextGenerationForAliveCell(currentGridInformation.grid, cell, currentGridInformation.column, currentGridInformation.row);
        newGrid[cell.row][cell.column] = isAliveCell;
        newCellsDeadNearAliveCell = new Set([...newCellsDeadNearAliveCell, ...cellsDeadNearAliveCell]);
        if(isAliveCell) {
            aliveCells.push(CellCoordinate.createIstance(cell.row, cell.column));
        }
    });

    return {
        aliveCells: aliveCells,
        newCellsDeadNearAliveCell: newCellsDeadNearAliveCell
    };
}

const generateNextGenerationToDeadCell = (
    currentGridInformation: GridInformation, 
    newGrid: boolean[][], 
    aliveCells: CellCoordinate[], 
    newCellsDeadNearAliveCell: Set<CellCoordinate>): CellCoordinate[]  => 
{
    newCellsDeadNearAliveCell.forEach(cellDead => {
        newGrid[cellDead.row][cellDead.column] = nextGenerationForDeadCell(currentGridInformation.grid, cellDead, currentGridInformation.column, currentGridInformation.row);
        if (newGrid[cellDead.row][cellDead.column]){
            aliveCells.push(CellCoordinate.createIstance(cellDead.row, cellDead.column));
        }
    });
    return aliveCells
}


const nextGenerationForAliveCell = (
    grid: boolean[][], 
    cell: CellCoordinate, 
    maxColumn: number, 
    maxRow: number): InformationForCalculateNextGeneration =>
{
    const cellsDeadNearAliveCell: CellCoordinate[] = [];
    let nearAliveCell = 0;
    generalIndexToTurnAround.forEach(item => {
        const row = cell.row + item.row;
        const column = cell.column + item.column;
        if(isRowAndColumnInsideTheGrid(row, column, maxColumn, maxRow)){
            grid[row][column]
                ? nearAliveCell++
                : cellsDeadNearAliveCell.push(CellCoordinate.createIstance(row, column));
        }
    })
    const isAliveCell: boolean = nearAliveCell === 2 || nearAliveCell === 3;
    return {
        isAliveCell: isAliveCell,
        cellsDeadNearAliveCell: cellsDeadNearAliveCell,
    };
}

const nextGenerationForDeadCell = (
    grid: boolean[][], 
    cell: CellCoordinate, 
    maxColumn: number, 
    maxRow: number): boolean => 
{
    let nearAliveCell = 0;
    generalIndexToTurnAround.forEach(item => {
        const row = cell.row + item.row;
        const column = cell.column + item.column;
        if (isRowAndColumnInsideTheGrid(row, column, maxColumn, maxRow) && grid[row][column]) {
            nearAliveCell++;
        }
    })
    return nearAliveCell === 3;
}

const isRowAndColumnInsideTheGrid = (row:number, column: number, maxColumn: number, maxRow: number): boolean => {
    return row >= 0 && column >= 0 && row<maxRow && column<maxColumn;
}