import { Rect, Sketch, Sprite, TSize } from "smallgame"

export class SelectedImage extends Sprite {
  constructor (size: TSize) {
    super()

    const originRect = Rect.size(size)
    const marlerSize = 8
    const rect = originRect.outline(-marlerSize)
    const color = '#2e2e2eff'
    this.image = new Sketch()
      .rect({ fill: color }, Rect.fromCenter(originRect.topLeft, marlerSize, marlerSize))
      .rect({ fill: color }, Rect.fromCenter(originRect.topRight, marlerSize, marlerSize))
      .rect({ fill: color }, Rect.fromCenter(originRect.bottomLeft, marlerSize, marlerSize))
      .rect({ fill: color }, Rect.fromCenter(originRect.bottomRight, marlerSize, marlerSize))
      .toSurface(rect.width, rect.height)
    this.rect = rect
  }
}