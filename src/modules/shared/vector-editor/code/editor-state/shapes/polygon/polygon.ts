import { GMath, Point, Rect, Segment, ShapeStyle } from "smallgame"
import { ShapeBase } from "../shape-base"
import { removeItem } from "../../../../../../games/old-tv/utils"

export class PolygonShape extends ShapeBase  {
  #rect: Rect
  type: 'polygon' = 'polygon'
  points: Point[]
  selectedPoints: Point[]
  editPoints: boolean = false
  segments: Segment[] = []
  activeSegment: Segment | null
  activePoint: Point | null

  constructor (start: Point, end: Point, style: ShapeStyle) {
    super(style)

    this.#rect = Rect.fromTwoPoints(start, end)
    this.points = this.#rect.points.map(p => Point.from(p))
    this.points.push(this.points[0])
    this.selectedPoints = []
    this.calcSegments()
  }

  setPoints (points: Point[]) {
    this.points = points
    this.points.push(this.points[0])
    this.calcBounds()
    this.calcSegments()
  }

  getActiveSegmentAndPoint (pos: Point) {
    for (let i = 0; i < this.segments.length; i++) {
      const segment = this.segments[i]
      const point = segment.getPointOnSegment(pos, 5)
      if (point) {
        return { 
          segment, 
          segmentIndex: i,
          point
        }
      }
    }
    return { segment: null, point: null, segmentIndex: -1 }
  }

  setActiveSegment (segment: Segment) {
    this.activeSegment = segment
  }

  setActivePoint (point: Point | null) {
    this.activePoint = point
  }

  addPoint (index: number) {
    this.points.splice(index, 0, this.activePoint)
    this.calcBounds()
    this.calcSegments()
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

  shiftPoints (shift: Point) {
    this.selectedPoints.forEach(p => p.shiftSelf(shift))
    this.calcBounds()
  }

  shift (point: Point): void {
    for (let i = 0; i< this.points.length -1; i++)
      this.points[i].shiftSelf(point)
    this.calcBounds()
  }

  deletePoint (point: Point) {
    removeItem(this.points, p => p === point)
    this.calcBounds()
    this.calcSegments()
  }

  resizeBySelectedCorner (pos: Point): void {
    
  }

  private calcBounds () {
    const x = GMath.minX(this.points)
    const w = GMath.maxX(this.points) - x
    const y = GMath.minY(this.points)
    const h = GMath.maxY(this.points) - y
    this.#rect.moveSelf(x, y)
    this.#rect.resizeSelf(w, h)
  }

  private calcSegments () {
    this.segments = []
    let j = this.points.length - 1
    for (let i = 0; i < this.points.length; i++) {
      this.segments.push(new Segment(this.points[j], this.points[i]))
      j = i
    }
  }
}

const isPointInPolygon = (polygon: Point[], point: Point) => {
  let result = false
  let j = polygon.length - 1
  for (let i = 0; i < polygon.length; i++) {
    const yi = polygon[i].y
    const yj = polygon[j].y
    const y = (yi < point.y && yj >= point.y) || (yj < point.y && yi >= point.y)
    if (y) {
      const xi = polygon[i].x
      const xj = polygon[j].x
      const x = (point.y - yi) * (xj - xi) / (yj - yi) 
      if (0 < point.x - x - xi) {
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