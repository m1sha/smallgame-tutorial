import { Sprite, Surface } from "smallgame"

export class ImageSprite extends Sprite {
  constructor (surface: Surface) {
    super()
    this.image = surface
    this.rect = this.image.rect
  }
}