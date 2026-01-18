import { Point, Rect, Surface } from "smallgame"
import { DisplayObject } from "../display-objects"
import { uuidv4 } from "../../../../games/old-tv/games/stock-boy/box"
import { Viewport } from "../viewport"

export abstract class DrawableObject {
  rect: Rect = Rect.zero
  surface: Surface
  //zoom = 1
  readonly id = uuidv4()

  constructor (readonly viewport: Viewport) {}

  abstract draw (screen: Surface): void
  abstract update (): void
  //setZoom (index: number) {
  //  this.zoom = index
  //} 
 

  abstract toDisplay (): DisplayObject
}