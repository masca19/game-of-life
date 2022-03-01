import { InputProps, RowModel, GridModel } from "./GameOfLife.model"
import "./GameOfLife.scss"

const Row = ({row}: RowModel) => {
    return (
        <div className="row">
            { row.map((cell, index) => ( <span key={index} className={`cell ${cell ? 'alive' : 'dead'}`}></span> ))}
        </div>
    )
}

const Grid = ({grid}: GridModel) => {
    return (
        <div className="gridContainer">
            { grid.map((row, index) => ( <Row key={index} row={row}/> ))}
        </div>
    )
}

const GameOfLife = ({
    title,
    generation,
    row,
    column,
    grid
}:InputProps) => {
    return (
        <div className="gameOfLifeContainer">
            <div className="gameOfLifeCard">
                <h2>{title} {generation}°</h2>
                <span>{row} x {column}</span>
                <Grid grid={grid} />
            </div>
        </div>
    ) 
}

export default GameOfLife;
