import { setSize, TSize } from "smallgame"
import { Background } from "../background"

export class ViewerUI {
  

  constructor (private background: Background) {

  }

  get cellSize (): TSize { return this.background.cellSize }

  setCellSize(width: number, height: number) {
    this.background.cellSize = { width, height }
  }
  
}