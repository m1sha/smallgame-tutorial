import { Point, TPoint, TSize } from "smallgame"
import { Viewer } from "./viewer"

export class Viewport {
 
  private _offset = Point.zero
  private _zoom = 1

  constructor (private viewportSize: TSize, private viewer: Viewer) {

  }
  
  get offset () { return this._offset }
  get zoom () { return this._zoom }
  
  zoomTo (zoom: number, point: Point) {
    const wpos = point.shift(this._offset.neg()).scale(1 / this._zoom).neg()
    this._zoom = zoom
    this._offset = point.shift(wpos.scale(this._zoom))

    this.viewer.zoom = zoom
    this.viewer.offset = this._offset.clone()
  }
  
  panTo (point: TPoint): void {
    this._offset.x = point.x
    this._offset.y = point.y
    this.viewer.offset = this.viewer.offset.move(-point.x, -point.y)
  }

  panBy (shift: Point) {
    this._offset.shiftSelf(shift)
    this.viewer.offset = this.viewer.offset.shift(shift.negX())
  }
  
  reset(): void {
    this._zoom = 1
    this._offset.x = 0
    this._offset.y = 0
  }
}