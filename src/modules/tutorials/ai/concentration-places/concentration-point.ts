import { Point, Rect, Sketch, Sprite, TPoint } from "smallgame"
import { PolarPoint } from "./polar"

export class ConcentrationPoint extends Sprite {
  
  

  constructor (fillColor: string, strokeColor: string, public botColor, public coordCenter: TPoint) {
    super()
    const rect = Rect.size(18, 18)
    this.image = new Sketch().circle({ fill: fillColor, stroke: strokeColor }, rect.center, rect.width / 2 - 2).toSurface()
    this.rect = this.image.rect

//    this.position = new PolarPoint(0, 0, Point.zero)
  }

  // setPosition(pp: PolarPoint) {
  //   this.position = pp
  //   this.rect.center = pp.point
  // }

  get position (): PolarPoint {
    return PolarPoint.from(this.rect.absCenter, this.coordCenter)
  }
}