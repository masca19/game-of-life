export interface GridInformation {
    generation: number;
    column: number;
    row: number;
    grid: boolean[][];
}

export enum ValueOfGrid {
    alive = '*',
    dead = '.'
}