import { Point, Rect, ShapeStyle } from "smallgame"
import { ShapeBase } from "./shape-base"

export class PolygonShape extends ShapeBase  {
  type: 'polygon' = 'polygon'
  points: Point[]

  constructor (start: Point, end: Point, style: ShapeStyle) {
    super(style)

    this.points = Rect.fromTwoPoints(start, end).points.map(p => Point.from(p))
    this.points.push(this.points[0])
  }
}