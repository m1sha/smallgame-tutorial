import { Point, setPoint, TPoint, TSize } from "smallgame"

const grid = [
  // 1
  -1,0,
  0,1,
  -1,1,
  -1,0,
  0,0,
  0,1,
  
  // 2
  0,0,
  1,1,
  0,1,
  0,0,
  1,0,
  1,1,

  // 3
  -1,-1,
  0,0,
  -1,0,
  -1,-1,
  0,-1,
  0,0,

  //4
  0,-1,
  1,0,
  0,0,
  0,-1,
  1,-1,
  1,0
]

export default grid

export class Grid {
  constructor (private rows: number, private cols: number, private tileSize: TSize, private viewportSize: TSize) {}

  rects () {
    
    const result: number[] = []
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        const w = this.tileSize.width
        const h = this.tileSize.height
        const x = j * w
        const y = i * h

        const bl = this.getPoint(setPoint(x, y + h))
        const tr = this.getPoint(setPoint(x + w, y))
        const tl = this.getPoint(setPoint(x, y))
        const br = this.getPoint(setPoint(x + w, y + h))

        const rect = [
          bl.x, bl.y,
          tr.x, tr.y,
          tl.x, tl.y,

          bl.x, bl.y,
          br.x, br.y,
          tr.x, tr.y
        ]

        result.push(...rect)
      
      }  
    }
    return result
  }

  private getPoint ({ x, y }: TPoint) {
    return new Point(x * 2 / this.viewportSize.width - 1, y * 2 / this.viewportSize.height - 1)
  }
}