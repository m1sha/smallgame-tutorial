import { Group, Surface, TSize } from "smallgame"
import { ImageObject } from "./background"

export class Images extends Group<ImageObject> {
  constructor (private screenSize: TSize) {
    super()
  }

  createImage (surface: Surface) {
    const { width, height } = this.screenSize
    const img = new ImageObject(width, height)
    img.setImage(surface)
    this.add(img)
    return img
  }
}