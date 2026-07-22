import { Size } from "smallgame"

export interface ITileMap {
  data: number[]
  rows: number
  cols: number
  tileSize: Size
}

export function createTileMap (tileSize: Size, rows: number, cols: number, data: number[]): ITileMap {
  return {
    tileSize,
    rows,
    cols,
    data
  }
}