import { Point, Rect, ShapeStyle } from "smallgame"

type TShapeCorner = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'mid-top' | 'mid-bottom' | 'mid-right' | 'mid-left'

export abstract class ShapeBase  {
  constructor (public style: ShapeStyle) {

  }

  abstract pointIn (point: Point): boolean 
  abstract shift (point: Point): void
  abstract get bounds (): Rect

  abstract resizeBySelectedCorner (pos: Point): void

  seletedCorner: TShapeCorner | 'none' = 'none'
  hoveredCorner: TShapeCorner | 'none' = 'none'
  

  getHittestCorner (point: Point, radius: number): TShapeCorner | 'none' {
    const rect = this.bounds
    if (rect.topLeft.inRadius(point, radius)) return 'top-left'
    if (rect.topRight.inRadius(point, radius)) return 'top-right'
    if (rect.bottomLeft.inRadius(point, radius)) return 'bottom-left'
    if (rect.bottomRight.inRadius(point, radius)) return 'bottom-right'
    if (rect.midTop.inRadius(point, radius)) return 'mid-top'
    if (rect.midBottom.inRadius(point, radius)) return 'mid-bottom'
    if (rect.midLeft.inRadius(point, radius)) return 'mid-left'
    if (rect.midRight.inRadius(point, radius)) return 'mid-right'
    return 'none'
  }
}