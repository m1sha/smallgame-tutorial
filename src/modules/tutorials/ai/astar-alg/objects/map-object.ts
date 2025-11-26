import { Point, Rect, Sketch, Sprite, Surface, TPoint, TSize } from "smallgame"
import { MapSource } from "../astar"
import { Path } from "./path"

export class MapObject extends Sprite {
  private mapImg: Surface
  readonly path: Path
  dx: number
  dy: number

  constructor (readonly source: MapSource, cellSize: TSize) {
    super()
    this.dx = cellSize.width 
    this.dy = cellSize.height 
  
    this.mapImg = this.toSurface() //new Surface(map.width, map.height)
    
    this.path = new Path(this)  
    this.image = new Surface(this.width, this.height)
    this.rect = this.image.rect
  }

  get width () {
    return this.source.cols * this.dx
  }

  get height () {
    return this.source.rows * this.dy
  }

  protected update(): void {
    this.image.blit(this.mapImg, this.mapImg.rect)
    this.path.draw(this.image)
  }

  setSize (cellSize: TSize) {
    this.dx = cellSize.width //0 | this.width / this.mx 
    this.dy = cellSize.height 
  }

  updateMap () {
    this.mapImg = this.toSurface()
  }

  getCell (pos: TPoint) {
    return Point.from(pos).shiftSelf(this.rect.topLeft.neg()).scaleSelf(1/this.dx, 1/this.dy).intSelf()
  }

  reDraw () {
    this.mapImg = this.toSurface() //new Surface(map.width, map.height)
    this.rect.resizeSelf(this.image.rect)
  }

  private toSurface () {
    const { dx, dy } = this
    const surface = new Surface(this.width, this.height, { useOffscreen: true })
    const sketch = new  Sketch()
    for (let i = 0; i < this.source.rows; i++) {
      for (let j = 0; j < this.source.cols; j++) {
        const rect = new Rect(dx * j, dy * i, dx, dy)
        const val = this.source.map[i][j]
        let color = '#cececeff'
        if (val === 1) color = '#353431ff'
        if (val === 2) color = '#1300bbff'
        if (val === 3) color = '#11661cff'
        if (val === 4) color = '#f8ffddff'
        if (val === 5) color = '#d0ecfcff'
        
        sketch.rect({ fill: color, stroke: '#1a1a1a25' }, rect)
      }  
    }

    sketch.draw(surface)
    return surface
  }
}