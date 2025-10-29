import { Entity, Group, Surface, TPoint, type TSize } from "smallgame"
import { BaseObject } from "./base-object"
import { ImageObject } from "./images"

export class Objects extends Group<BaseObject> {
  #currentObject: BaseObject | null = null
  #markerPoint: TPoint | null = null

  constructor (private screenSize: TSize) {
    super()
  }

  get currentObject () { return this.#currentObject }
  get markerPoint () { return this.#markerPoint }

  createImage (surface: Surface) {
    const { width, height } = this.screenSize
    const img = new ImageObject(width, height)
    img.setImage(surface)
    this.add(img)
    return img
  }

  pickObject (obj: BaseObject | null = null) {
    this.#currentObject = obj
  }

  pickMarkerPoint (point: TPoint | null) {
    this.#markerPoint = point
  }

  changeMarkerPoint (point: TPoint) {
    if (!this.markerPoint) return
    this.markerPoint.x = point.x
    this.markerPoint.y = point.y
  }

  add (sprite: BaseObject): void {
    super.add(sprite)
    this.#currentObject = sprite
  }

  remove (sprite: Entity): void {
    if (this.currentObject === sprite) this.#currentObject = null
    super.remove(sprite)
  }
}