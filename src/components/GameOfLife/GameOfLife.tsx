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
        <section className="gameOfLife">
            <h2>{title}</h2>
            <h3>Generation {generation}</h3>
            <p>
                <span>Row: {row}</span>
                <span>Column: {column}</span>
            </p>
            <Grid grid={grid} />

        </section>
    ) 
}

export default GameOfLife;
