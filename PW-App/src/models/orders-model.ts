import { Women } from "./women-model";

export interface Order {
    id?: number,
    firstname: string,
    surname: string,
    address: string,
    orderdata: string
}

export interface Order2 {
    id?: number,
    firstname: string,
    surname: string,
    address: string,
    orderdata: Women[] | string[]
}