import { Group, type TPoint } from "smallgame"
import { Polygon } from "./polygon"

export class Polygons extends Group<Polygon> {

  private point: TPoint | null = null

  get activePointSelected () {
    return Boolean(this.point)
  }

  get activePolygon () {
    return this.polygons.find(p => p.isActive)
  }

  selectPolygon (sprite: Polygon) {
    this.deactivate()
    sprite.isActive = true
  }

  unselectPolygon () {
    this.deactivate()
  }

  selectPoint () {
    const poly = this.activePolygon
    if (poly) this.point = poly.selectedPoint
  }

  changeActivePointPos (point: TPoint) {
    if (!this.point) return
    this.point.x = point.x
    this.point.y = point.y
  }

  deselectActivePoint () { this.point = null }

  add (sprite: Polygon): void {
    this.deactivate()
    sprite.isActive = true
    super.add(sprite)
  }

  removePolygon (polygon: Polygon) {
    super.remove(polygon)
  }
  
  removeActivePolygon () {
    if (!this.activePolygon) return
    this.point = null
    super.remove(this.activePolygon)
  }

  setZoomIndex (zoomIndex: number) {
    this.polygons.forEach(p => p.zoomIndex = zoomIndex)
  }

  private get polygons () {
    return this.sprites as Polygon[]
  }

  private deactivate () {
    this.polygons.forEach(p => p.isActive = false)
  }
}