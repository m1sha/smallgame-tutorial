import { Group, Point, TPoint } from "smallgame"
import { Marker } from "./marker"

export class Markers extends Group<Marker> {
  private active: Marker | null = null
  constructor (startPoint: Point, endPoint: Point) {
    super({ useSpriteCollideRect: true })

    this.add(new Marker(startPoint))
    this.add(new Marker(endPoint))
  }

  get hasActive () {
    return Boolean(this.active)
  }

  hittest (pos: TPoint) {
    this.unhover()
    this.collidePoint(pos, mkr => {
      mkr.hover()
    }, { once: true })
  }

  shiftActive (pos: TPoint) {
    if (this.active) this.active.shift(pos)
  }

  setActive (pos: TPoint) {
    this.active = null
    this.collidePoint(pos, mkr => {
      this.active = mkr
    }, { once: true })
  }

  releaseActive () {
    this.active = null
  }


  private unhover () {
    this.sprites.forEach(p => p.hovered = false)
  }
}
