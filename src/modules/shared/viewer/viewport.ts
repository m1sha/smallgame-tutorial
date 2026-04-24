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
}