import { Surface, TSize } from "smallgame"
import { DrawableObject } from "./drawable-object"
import { DisplayObject } from "../display-object"

export class ImageCombineObject extends DrawableObject {
  constructor (imgs: Surface[], viewportSize: TSize) {
    super()
    let w = 0
    let h = 0
    let maxH = 0
    for (const img of imgs) {
      img.rect.x = w
      img.rect.y = h
      maxH = Math.max(maxH, img.rect.height)
      if (w + img.rect.width >= viewportSize.width) {
        w = 0
        h += maxH
        maxH = 0
      } else {
        w += img.rect.width
      }
    }
  }

  draw (screen: Surface) {
    
  }

  toDisplay(): DisplayObject {
    throw new Error("Method not implemented.")
  }
}