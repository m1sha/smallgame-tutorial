import { Rect, Surface } from "smallgame"
import { DisplayObject } from "../display-object"
import { uuidv4 } from "../../../../games/old-tv/games/stock-boy/box"

export abstract class DrawableObject {
  rect: Rect = Rect.zero
  surface: Surface
  zoom = 1
  readonly id = uuidv4()

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