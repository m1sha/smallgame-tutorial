import { setSize, TSize } from "smallgame"
import { IViewer } from "../../../../components/example/code/viewer"
import { Background } from "../background"

export class ViewerUI {
  

  constructor (private background: Background) {

  }

  get cellSize (): TSize { return this.background.cellSize }

  setCellSize(width: number, height: number) {
    this.background.cellSize = { width, height }
  }



  build (): IViewer {
    return {}
  }
}