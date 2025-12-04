import { Rect } from "smallgame"

const sizes = {
  cols: 12,
  rows: 7,
  boxSize: 45,
  floorHeight: 60,
  getTubeRect (width: number, height: number) {
    const { x, width: w } = this.getFieldRect(width, height)
    return new Rect(x, 30, w, 12)
  },
  getFieldRect (width: number, height: number) {
    const w = this.cols * this.boxSize
    const h =  sizes.rows * this.boxSize
    const x = width * 0.5 - w * 0.5
    const y = height - sizes.floorHeight - h //- this.boxSize
    return new Rect(x, y, w, h)
  }
}

export { sizes }