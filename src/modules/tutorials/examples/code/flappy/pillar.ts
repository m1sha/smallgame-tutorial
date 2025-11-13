import { Rect, Sketch, Sprite, Surface, TSize } from "smallgame";

export class Pillar extends Sprite {
  constructor (fieldSize: TSize) {
    super()

    this.image = new Surface(80, fieldSize.height)
    this.rect = this.image.rect

    const v = 0 | Math.random() * 600 + 200  

    const rect = Math.random() > 0.5    ? new Rect(0, v, 80, fieldSize.height - v) : new Rect(0, 0, 80,  v)

    const s = new Sketch().rect({ fill: '#16304bff' }, rect).toSurface()
    this.image.blit(s, s.rect)

    this.rect.x = fieldSize.width - 80
  }

  update () {
    this.rect.x -= 2
  }
}