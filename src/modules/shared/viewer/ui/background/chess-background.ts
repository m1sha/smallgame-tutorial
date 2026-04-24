import { setSize, TSize } from "smallgame"

export type ChessBackground = {
  type: 'chess'
  oddCellColor: string
  evenCellColor: string
  cellSize: TSize
}

export function initChessBackground (): ChessBackground {
  return {
    type: 'chess',
    cellSize: setSize(64, 64),
    oddCellColor: '#333',
    evenCellColor: '#232323'
  }
}