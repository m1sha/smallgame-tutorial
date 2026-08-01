import { Surface } from "smallgame";

export type SelectedData = {
  cols: number
  rows: number
  data: number[]
}


export class TilesCursor {
  constructor (readonly start: number, readonly end: number, readonly surface: Surface, readonly data: SelectedData) {}
}