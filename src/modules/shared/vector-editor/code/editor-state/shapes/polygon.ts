import { GMath, Point, Rect, ShapeStyle } from "smallgame"
import { ShapeBase } from "./shape-base"
import { removeItem } from "../../../../../games/old-tv/utils"

export class PolygonShape extends ShapeBase  {
  #rect: Rect
  type: 'polygon' = 'polygon'
  points: Point[]
  selectedPoints: Point[]
  editPoints: boolean = false

  constructor (start: Point, end: Point, style: ShapeStyle) {
    super(style)

    this.#rect = Rect.fromTwoPoints(start, end)
    this.points = this.#rect.points.map(p => Point.from(p))
    this.points.push(this.points[0])
    this.selectedPoints = []
  }

  pointIn (point: Point): boolean {
    return this.#rect.containsPoint(point) && isPointInPolygon(this.points, point)
  }

  get bounds () { return this.#rect }

  getHittestPoint (pos: Point, radius: number = 5) {
    return this.points.find(p => p.inRadius(pos, radius))
  }

  selectPoint (point?: Point, accumulate: boolean = false) {
    if (!accumulate) this.selectedPoints = []
    if (!point) return
    const origin = this.selectedPoints.find(p => p === point)
    if (origin) {
      if (accumulate) removeItem(this.selectedPoints, p => p === origin)
      return
    }
    this.selectedPoints.push(point)
  }

  unselectPoints () {
    this.selectedPoints = []
  }

  movePoints (shift: Point) {
    this.selectedPoints.forEach(p => p.shiftSelf(shift))
    this.calcBounds()
  }

  shift (point: Point): void {
    for (let i = 0; i< this.points.length -1; i++)
      this.points[i].shiftSelf(point)
    this.calcBounds()
  }

  private calcBounds () {
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