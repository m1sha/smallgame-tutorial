import { Size } from "smallgame"
import { NumericTable } from "smallgame/src/utils"

export interface ITileMap {
  table: NumericTable
  tileSize: Size
}

export class TileMap {
  table: NumericTable

  constructor (readonly tileSize: Size, rows: number, cols: number, data: number[]) {
    this.table = new NumericTable(rows, cols, -1)
    this.table.set(0, 0, data, rows, cols)
  }
}

export function createTileMap (tileSize: Size, rows: number, cols: number, data: number[]): ITileMap {
  return new TileMap(tileSize, rows, cols, data)
}