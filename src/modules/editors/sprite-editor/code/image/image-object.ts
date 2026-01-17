import { Surface } from "smallgame"
import { DrawableObject, setDisplayObject } from "../core"
import { ImageDisplayObject } from "./image-display-object"

export class ImageObject extends DrawableObject {
  constructor (private name: string, surface: Surface) {
    super()

    this.surface = surface
    this.rect = this.surface.rect
  }

  draw (screen: Surface) {
    screen.blit(this.surface, this.rect)
  }

  toDisplay (): ImageDisplayObject {
    return {
      type: 'image-object',
      ...setDisplayObject(this.id, this.name)
    }
  }
}