import { Surface } from "smallgame"
import { DrawableObject, setDisplayObject } from "../core"
import { ImageDisplayObject } from "./image-display-object"
import { Viewport } from "../viewport"

export class ImageObject extends DrawableObject {
  constructor (private name: string, surface: Surface, viewport: Viewport) {
    super(viewport)

    this.surface = surface
    this.rect = this.surface.rect
  }

  draw (screen: Surface) {
    const rect = this.rect.scale(this.viewport.zoom, 'center-center')
    screen.blit(this.surface, rect)
  }

  update(): void {
     
  }

  toDisplay (): ImageDisplayObject {
    return {
      type: 'image-object',
      ...setDisplayObject(this.id, this.name),
      size: this.rect.size
    }
  }
}