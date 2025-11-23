import { Point, Rect, Sketch, Sprite, Surface, TPoint } from "smallgame"
import { MapSource } from "../astar"

export class MapObject extends Sprite {

   constructor (private map: MapSource) {
      super()
  
      this.image = this.toSurface() //new Surface(map.width, map.height)
      this.rect = this.image.rect
      
   }

   updateMap () {
    this.image = this.toSurface()
   }

   getCell (pos: TPoint) {
    return Point.from(pos).shiftSelf(this.rect.topLeft.neg()).scaleSelf(1/this.map.dx, 1/this.map.dy).intSelf()
   }

   reDraw () {
      this.image = this.toSurface() //new Surface(map.width, map.height)
      this.rect.resizeSelf(this.image.rect)
   }

   private toSurface () {
    const { dx, dy } = this.map
    const surface = new Surface(this.map.width, this.map.height)
    const sketch = new  Sketch()
    for (let i = 0; i < this.map.rows; i++) {
      for (let j = 0; j < this.map.cols; j++) {
        const rect = new Rect(dx * j, dy * i, dx, dy)
        const val = this.map.map[i][j]
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