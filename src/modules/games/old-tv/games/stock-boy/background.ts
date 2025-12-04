import { Rect, Sketch, Sprite } from "smallgame"
import { sizes } from "./sizes"

export class Background extends Sprite {
  constructor (private width: number, private height: number) {
    super()
  }

  async create(): Promise<void> {
    const sketch = new Sketch()
    sketch.defineStyle('floor', { fill: '#333' })
    sketch.defineStyle('floor_out', { fill: '#aaa' })
    sketch.defineStyle('wall', { fill: '#af8d66' })
    sketch.defineStyle('tube', { fill: '#7f7f8b' })

    sketch.rect('floor', new Rect(0, this.height - sizes.floorHeight, this.width, sizes.floorHeight))
    sketch.rect('floor_out', new Rect(0, this.height - sizes.floorHeight, this.width, sizes.floorHeight * 0.25))
    sketch.rect('wall', new Rect(0, 0, this.width, this.height - sizes.floorHeight))
    sketch.rect('tube', sizes.getTubeRect(this.width, this.height))

    this.image = sketch.toSurface()
    this.rect = this.image.rect
  }
}