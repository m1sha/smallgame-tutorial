import { Sprite, Size, Sketch, Rect } from "smallgame"

export class CanvasSprite extends Sprite {
  constructor (size: Size) {
    super()

    this.image = new Sketch().rect({ fill: '#fff' }, Rect.size(size)).toSurface()
    this.rect = this.image.rect
  }
}