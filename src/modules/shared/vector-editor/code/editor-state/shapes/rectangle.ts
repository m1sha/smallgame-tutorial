import { Point, Rect, ShapeStyle } from "smallgame"
import { ShapeBase } from "./shape-base"

export class RectangleShape extends ShapeBase  {
  type: 'rectangle' = 'rectangle'
  rect: Rect

  constructor (startPoint: Point, style: ShapeStyle) {
    super(style)
    this.rect = Rect.zero
    this.rect.moveSelf(startPoint)
  }
}