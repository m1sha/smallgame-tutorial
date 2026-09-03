import { Point, TPoint } from "smallgame"

export interface IViewport {
  offset: Point
  zoom: number
}

export class Viewport implements IViewport {
  private _offset = Point.zero
  private _zoom = 1

  constructor () {

  }
  
  get offset () { return this._offset }
  get zoom () { return this._zoom }
  

  zoomAt (delta: number, x: number, y: number) {
    const factor = delta < 0 ? 1.1 : 0.9
    const newZoom = Math.min(4, Math.max(0.2, this.zoom * factor))
    if (newZoom === this.zoom) return
    const { x: worldX, y: worldY} = this.screenToWorld({ x, y })
    this._zoom = newZoom
    this.offset.x = x - worldX * newZoom
    this.offset.y = y - worldY * newZoom
  }
  
  panTo (point: TPoint): void {
    this._offset.x = point.x
    this._offset.y = point.y
  }

  panBy (shift: Point) {
    this._offset.shiftSelf(shift)
  }
  
  reset (): void {
    this._zoom = 1
    this._offset.x = 0
    this._offset.y = 0
  }

  zoomIn () {
    if (this.zoom < 4) this._zoom += 0.2
  }

  zoomOut () {
    if (this.zoom > 0.2) this._zoom -= 0.2
  }


  screenToWorld (point: TPoint): Point {
    const worldX = (point.x - this.offset.x) / this.zoom
    const worldY = (point.y - this.offset.y) / this.zoom
    return new Point(worldX, worldY)
  }

  worldToScreen (x: number, y: number): { x: number, y: number } {
    const screenX = (x + this.offset.x) * this.zoom
    const screenY = (y + this.offset.y) * this.zoom
    return { x: screenX, y: screenY }
  }
}