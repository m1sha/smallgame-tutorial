import { Point, TSize } from "smallgame"

//** UVRect = [a b c d] */
export type UVRect = [
  number, number, 
  number, number, 
  number, number, 
  
  number, number,
  number, number,
  number, number
]

export class UVAtlas {
  readonly cols: number
  readonly rows: number

  constructor (private imgSize: TSize, private tileSize: TSize) {
    this.cols = imgSize.width / tileSize.width
    this.rows = imgSize.height / tileSize.height
  }

  rect (i: number, j: number): UVRect {
    if (i >= this.rows || j >= this.cols) throw new Error('Index is out of range.')

    const w = this.tileSize.width / this.imgSize.width
    const h = this.tileSize.height / this.imgSize.height
    const u = j * w
    const v = i * h
    
    
    return [
      u    , v + h,
      u + w, v,
      u,     v,
      u,     v + h,
      u + w, v + h,
      u + w, v
    ] 
  }
}




