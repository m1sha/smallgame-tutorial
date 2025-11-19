import { Point, Sprite, Surface, TPoint } from "smallgame"
import { MapSource } from "../astar"

export class MapObject extends Sprite {

   constructor (private map: MapSource) {
      super()
  
      this.image = map.toSurface() //new Surface(map.width, map.height)
      this.rect = this.image.rect
      
   }

   updateMap () {
    this.image = this.map.toSurface()
   }

   getCell (pos: TPoint) {
    return Point.from(pos).shiftSelf(this.rect.topLeft.neg()).scaleSelf(1/this.map.dx, 1/this.map.dy).intSelf()
   }
}