import { Point, points2segments, setPoint, Sketch, type TPoint } from "smallgame"
import { BaseObject } from "../base-object"

type TempPoint = TPoint & { index: number }

export class Polygon extends BaseObject {
  #sketch = new Sketch()
  #points: TPoint[] = []
  #tempPoints: TempPoint[] = []
  #sliceIndex: number = -1
  selectedPoint: TPoint | null = null
  selectedPointType: 'fund' | 'temp' = 'fund'
  isPolygonSelected: boolean = false
  isActive: boolean = false
  zoomIndex: number = 1

  constructor (pos?: TPoint) {
    super()
    this.#sketch.defineStyle('normal', { stroke: 'green', fill:'#00dd0025' })
    this.#sketch.defineStyle('hover', { stroke: 'green', fill:'#00f60050' })
    this.#sketch.defineStyle('point_fund', { fill: 'tomato', stroke: 'red' })
    this.#sketch.defineStyle('point_temp', { fill: 'grey', stroke: 'grey' })
    this.#sketch.defineStyle('point_selected_fund', { fill: 'tomato', stroke: 'transparent' })
    this.#sketch.defineStyle('point_selected_temp', { fill: 'grey', stroke: 'transparent' })
    //this.sketch.sx = 2
    //this.sketch.sy = 2

    if (pos) {
      const { x, y } = pos
      const w = 150 / 2
      const h = 150 / 2
      this.#points.push(new Point(x - w, y - h))
      this.#points.push(new Point(x + w, y - h))
      this.#points.push(new Point(x + w, y + h))
      this.#points.push(new Point(x - w, y + h))
    }
  }

  update () {
    this.#sketch.clear()
    
    const vecs = points2segments(this.#points, true)
    this.#sketch.polygon(this.isPolygonSelected ? 'hover' : 'normal', this.#points)
    this.#sketch.arrows(this.isPolygonSelected ? 'hover' : 'normal', vecs)
    
    
    if (this.isActive) {
      this.#sketch.dots('point_fund', this.#points, 3 / this.zoomIndex)
      this.calcTemp()
      this.#sketch.dots('point_temp', this.#tempPoints, 3 / this.zoomIndex)

      if (this.selectedPoint) {
        if (this.selectedPointType === 'fund')
          this.#sketch.circle('point_selected_fund', this.selectedPoint, 5 / this.zoomIndex)
        if (this.selectedPointType === 'temp')
          this.#sketch.circle('point_selected_temp', this.selectedPoint, 5 / this.zoomIndex)
      }
    }

    this.image = this.#sketch.toSurface(800, 800)
    this.rect = this.image.rect
  }

  hittest (pos: TPoint): boolean {
    for (const point of this.#points) {
      if (Point.inCircle(point, pos, 5)) {
        this.selectedPoint = point
        this.selectedPointType = 'fund'
        this.#sliceIndex = -1
        this.isPolygonSelected = false
        return true
      }
    }

    for (const point of this.#tempPoints) {
      if (Point.inCircle(point, pos, 5)) {
        this.selectedPoint = point
        this.selectedPointType = 'temp'
        this.#sliceIndex = point.index
        this.isPolygonSelected = false
        return true
      }
    }

    this.#sliceIndex = -1
    this.selectedPoint = null
    return this.isPolygonSelected = this.inside(pos, this.#points)
  }

  pointInside (pos: TPoint) {
    return this.inside(pos, this.#points)
  }

  convertToFund () {
    this.#points.splice(this.#sliceIndex, 0, this.selectedPoint!)
    this.selectedPointType = 'fund'
  }

  shiftPoints(shift: TPoint) {
    this.#points.forEach(point => {
      point.x += shift.x
      point.y += shift.y
    })
  }

  getPoints () {
    return this.#points.map(p => setPoint(p.x, p.y))
  }

  setPoints (points: TPoint[]) {
    if (this.#points.length !== points.length) throw new Error('setPoints')
    for (let i = 0; i < points.length; i++) {
      this.#points[i].x = points[i].x
      this.#points[i].y = points[i].y
    }
  }

  private calcTemp() {
    if (this.#points.length < 2) return 
    this.#tempPoints = []
    for (let i = 0; i < this.#points.length - 1; i ++) {
      const { x, y } = Point.middle(this.#points[i], this.#points[i + 1])
      
      this.#tempPoints.push({ x, y, index: i + 1 })
    }

    const { x, y } = Point.middle(this.#points[this.#points.length - 1], this.#points[0])
    this.#tempPoints.push({ x, y, index: 0 })
  }

  private inside(point: TPoint, vs: TPoint[]) {
    // ray-casting algorithm based on
    // https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html
    const x = point.x, y = point.y;
    
    let inside = false;
    for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
      const xi = vs[i].x, yi = vs[i].y
      const xj = vs[j].x, yj = vs[j].y
        
      const intersect = ((yi > y) != (yj > y))
          && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)
      if (intersect) inside = !inside
    }
    
    return inside;
  }
}