import { Rect, Sketch, Sprite } from "smallgame"
import { sizes } from "./sizes"

export class Foreground extends Sprite {
  constructor (private width: number, private height: number) {
    super()
  }

  async create(): Promise<void> {
    const sketch = new Sketch()
    const fieldRect = sizes.getFieldRect(this.width, this.height)
    const tubeRect = sizes.getTubeRect(this.width, this.height)
    const leftRect = new Rect(0, tubeRect.y - 8, fieldRect.x,  fieldRect.y + fieldRect.height - tubeRect.y + 8)
    const rightRect = new Rect(tubeRect.absWidth, tubeRect.y - 8, fieldRect.x,  fieldRect.y + fieldRect.height - tubeRect.y + 8)

    sketch.rect({ fill: '#a95500' }, leftRect)
    sketch.rect({ fill: '#895547' }, rightRect)

    this.image = sketch.toSurface()
    this.rect = this.image.rect
  }
}