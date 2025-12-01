import { Point, Rect, Sketch, Sprite } from "smallgame"
import { PolarPoint } from "./polar"

export class ConcentrationPoint extends Sprite {
  
  position: PolarPoint

  constructor (fillColor: string, strokeColor: string) {
    super()
    const rect = Rect.size(26, 26)
    this.image = new Sketch().circle({ fill: fillColor, stroke: strokeColor }, rect.center, rect.width / 2 - 2).toSurface()
    this.rect = this.image.rect

    this.position = new PolarPoint(0, 0, Point.zero)
  }

  setPosition(pp: PolarPoint) {
    this.position = pp
    this.rect.center = pp.point
  }
}