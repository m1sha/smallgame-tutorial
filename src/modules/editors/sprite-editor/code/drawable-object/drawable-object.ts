import { Rect, Surface } from "smallgame"
import { DisplayObject } from "../display-object"

export abstract class DrawableObject {
  rect: Rect = Rect.zero
  surface: Surface
  protected zoom = 1

  abstract draw (screen: Surface)
  setZoom (index: number) {
    this.zoom = index
  } 
  // constructor (protected image: Surface) {
  //   this.rect = image.rect
  // }

  // get img () {
  //   return this.image
  // }

  abstract toDisplay (): DisplayObject
}