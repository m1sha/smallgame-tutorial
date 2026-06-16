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

  shift (point: Point): void {
    this.rect.shiftSelf(point)
  }

  get bounds () {
    return this.rect
  }

  pointIn (point: Point): boolean { 
    return this.rect.containsPoint(point)
  }

  resizeBySelectedCorner (shift: Point): void {
    const rect = this.rect
    const tl = rect.topLeft
    const br = rect.bottomRight
    const setRect = (p0: Point, p1: Point) => rect.set(Rect.fromTwoPoints(p0, p1))
    switch (this.seletedCorner) {
      case 'top-left': 
        setRect(tl.shift(shift), br) 
        break
      case 'mid-top': 
        setRect(tl.shiftY(shift.y), br)
       break
      case 'top-right': 
        setRect(tl.shiftY(shift.y), br.shiftX(shift.x))
       break
      case 'mid-right': 
        setRect(tl, br.shiftX(shift.x))
       break
      case 'mid-left': 
        setRect(tl.shiftX(shift.x), br)
       break
      case 'bottom-left': 
        setRect(tl.shiftX(shift.x), br.shiftY(shift.y))
       break
      case 'mid-bottom': 
        setRect(tl, br.shiftY(shift.y))
       break
      case 'bottom-right': 
        setRect(tl, br.shift(shift))
       break
    }
  }
}