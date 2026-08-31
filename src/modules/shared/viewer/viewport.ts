import { Point, setPoint, TPoint, TSize } from "smallgame"
import { Viewer } from "./viewer"
import { IViewport } from "./ui/viewport"


export class Viewport {
 
  private _offset = Point.zero
  private _zoom = 1

  constructor (private viewportSize: TSize, private viewer: Viewer, private vwp: IViewport) {

  }
  
  get offset () { return this._offset }
  get zoom () { return this._zoom }
  
  zoomTo (zoom: number, point: Point) {
    const wpos = point.shift(this._offset.neg()).scale(1 / this._zoom).neg()
    this._zoom = zoom
    this._offset = point.shift(wpos.scale(this._zoom))

    this.viewer.zoom = zoom
    this.viewer.offset = this._offset.dup()
    this.vwp.offset = setPoint(this._offset.x, this._offset.y)
    this.vwp.zoom = this._zoom
  }

  zoomAt (delta: number, x: number, y: number) {
    const factor = delta < 0 ? 1.1 : 0.9
    const newZoom = Math.min(4, Math.max(0.2, this.zoom * factor))
    if (newZoom === this.zoom) return
    const { x: worldX, y: worldY} = this.screenToWorld(x, y)
    this._zoom = newZoom
    this.offset.x = x - worldX * newZoom
    this.offset.y = y - worldY * newZoom
  }
  
  panTo (point: TPoint): void {
    this._offset.x = point.x
    this._offset.y = point.y
    this.viewer.offset = this.viewer.offset.move(-point.x, -point.y)
    this.vwp.offset = setPoint(this._offset.x, this._offset.y)
  }

  panBy (shift: Point) {
    this._offset.shiftSelf(shift)
    this.viewer.offset = this.viewer.offset.shift(shift.negX())
    this.vwp.offset = setPoint(this._offset.x, this._offset.y)
  }
  
  reset (): void {
    this._zoom = 1
    this._offset.x = 0
    this._offset.y = 0
    this.vwp.offset = setPoint(this._offset.x, this._offset.y)
    this.vwp.zoom = this._zoom
  }

   zoomIn () {
    if (this.zoom < 4) this._zoom += 0.2
  }

  zoomOut () {
    if (this.zoom > 0.2) this._zoom -= 0.2
  }

  goHome () {
    this._zoom = 1
    this.offset.x = 0
    this.offset.y = 0
  }

  screenToWorld (x: number, y: number): { x: number, y: number } {
    const worldX = (x - this.offset.x) / this.zoom
    const worldY = (y - this.offset.y) / this.zoom
    return { x: worldX, y: worldY }
  }

  worldToScreen (x: number, y: number): { x: number, y: number } {
    const screenX = (x + this.offset.x) * this.zoom
    const screenY = (y + this.offset.y) * this.zoom
    return { x: screenX, y: screenY }
  }
}