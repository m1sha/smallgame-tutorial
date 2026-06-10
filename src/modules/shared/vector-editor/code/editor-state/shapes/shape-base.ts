import { Point, Rect, ShapeStyle } from "smallgame"
export abstract class ShapeBase  {
  constructor (public style: ShapeStyle) {

  }

  abstract pointIn (point: Point): boolean 
  abstract shift (point: Point): void
  abstract get bounds (): Rect
}