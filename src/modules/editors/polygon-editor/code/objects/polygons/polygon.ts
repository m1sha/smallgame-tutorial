import { Point, setPoint, type TPoint } from "smallgame"
import { BaseObject } from "../base-object"

type TempPoint = TPoint & { index: number }

export class Polygon extends BaseObject {
  
  readonly type = 'polygon'
  #points: TPoint[] = []
  #tempPoints: TempPoint[] = []
  #sliceIndex: number = -1

  showArrows: boolean = true
  color: string = '#00dd007e'
  
  selectedPointType: 'fund' | 'temp' = 'fund'
  isPolygonSelected: boolean = false
  
  zoomIndex: number = 1

  constructor (pos?: TPoint) {
    super()
    
    this.rect.resizeSelf(1200, 800)
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

  get points () { return this.#points }
  get tempPoints () { return this.#tempPoints }

  update () {
    
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

  shift (shift: TPoint) {
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

   calculateTempPoints () {
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