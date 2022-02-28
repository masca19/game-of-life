import { CellCoordinate, GridInformation } from "../model/GridInformation.model";

const generalIndexToTurnAround = [
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
    let newCellsDeadNearAliveCell = new Set<CellCoordinate>();
    const aliveCells: CellCoordinate[] = []
    const newGrid = [...currentGridInformation.grid];
    currentGridInformation.aliveCells.forEach(cell => {
        const { isAliveCell, cellsDeadNearAliveCell } = nextGenerationForAliveCell(newGrid, cell, currentGridInformation.column, currentGridInformation.row);
        newGrid[cell.row][cell.column] = isAliveCell;
        newCellsDeadNearAliveCell = new Set([...newCellsDeadNearAliveCell, ...cellsDeadNearAliveCell])
        if(isAliveCell) {
            aliveCells.push({
                row: cell.row,
                column: cell.column
            })
        }
    });

    newCellsDeadNearAliveCell.forEach(cellDead => {
        newGrid[cellDead.row][cellDead.column] = nextGenerationForDeadCell(newGrid, cellDead, currentGridInformation.column, currentGridInformation.row);
        if (newGrid[cellDead.row][cellDead.column]){
            aliveCells.push({
                row: cellDead.row,
                column: cellDead.column
            })
        }
    });

    return {
        generation: currentGridInformation.generation + 1,
        column: currentGridInformation.column,
        row: currentGridInformation.row,
        grid: newGrid,
        aliveCells: aliveCells
    }
}


const nextGenerationForAliveCell = (grid: boolean[][], cell: CellCoordinate, maxColumn: number, maxRow: number) => {
    const cellsDeadNearAliveCell: CellCoordinate[] = [];
    let nearAliveCell = 0;
    generalIndexToTurnAround.forEach(item => {
        const row = cell.row + item.row;
        const column = cell.column + item.column;
        if(isRowAndColumnInsideTheGrid(row, column, maxColumn, maxRow)){
            if (grid[row][column]) {
                nearAliveCell++;
            }
            else {
                cellsDeadNearAliveCell.push({ row: row, column: column })
            }
        }
    })
    const isAliveCell: boolean = nearAliveCell === 2 || nearAliveCell === 3
    return {
        isAliveCell: isAliveCell,
        cellsDeadNearAliveCell: cellsDeadNearAliveCell,
    };
}

const nextGenerationForDeadCell = (grid: boolean[][], cell: CellCoordinate, maxColumn: number, maxRow: number) => {
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