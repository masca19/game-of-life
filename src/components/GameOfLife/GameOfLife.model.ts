import { GridInformation } from "../../model/GridInformation.model";

export interface InputProps extends GridInformation {
    title: string
}

export interface RowModel {
    row: boolean[]
}

export interface GridModel {
    grid: boolean[][]
}