import { GMath, Point, Rect, ShapeStyle } from "smallgame"
import { ShapeBase } from "./shape-base"

export class PolygonShape extends ShapeBase  {
  #rect: Rect
  type: 'polygon' = 'polygon'
  points: Point[]
  editPoints: boolean = false

  constructor (start: Point, end: Point, style: ShapeStyle) {
    super(style)

    this.#rect = Rect.fromTwoPoints(start, end)
    this.points = this.#rect.points.map(p => Point.from(p))
    this.points.push(this.points[0])
  }

  pointIn (point: Point): boolean {
    return this.#rect.containsPoint(point) && isPointInPolygon(this.points, point)
  }

  get bounds () { return this.#rect }

  movePoint (shift: Point, point: Point) {
    point.shiftSelf(shift)
    const x = GMath.minX(this.points)
    const w = GMath.maxX(this.points) - x
    const y = GMath.minY(this.points)
    const h = GMath.maxY(this.points) - y
    this.#rect.moveSelf(x, y)
    this.#rect.resizeSelf(w, h)
  }
}

const isPointInPolygon = (polygon: Point[], point: Point) => {
  let result = false
  let j = polygon.length - 1
  for (let i = 0; i < polygon.length; i++) {
    if ((polygon[i].y < point.y && polygon[j].y >= point.y) || (polygon[j].y < point.y && polygon[i].y >= point.y)) {
      if (polygon[i].x + (point.y - polygon[i].y) / (polygon[j].y - polygon[i].y) * (polygon[j].x - polygon[i].x) < point.x) {
        result = !result
      }
    }
    j = i
  }
  return result
}

export function isPolygonShape (value: any): value is PolygonShape {
  return Boolean(value) && value instanceof PolygonShape
}