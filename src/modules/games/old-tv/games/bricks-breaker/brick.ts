import { Rect, Sketch, Sprite, Surface } from "smallgame"
import { sizes } from "./size"

export class Brick extends Sprite {
  type: 'destroyable' | 'immortal'
  constructor (x: number, y: number, type: 'destroyable' | 'immortal') {
    super()
    this.type = type
    this.image = new Surface(sizes.brick_width, sizes.brick_height)
    this.rect = new Rect(0, 0, sizes.brick_width, sizes.brick_height)
    const sketch = new Sketch()
    sketch.rect({ 
      fill: type === 'destroyable' ? '#aa4411': 'gray', 
      stroke:  type === 'destroyable' ? '#aa6611' : '#bbb',
      lineWidth: 2.5 
    }, this.rect.outline(1.5))
    sketch.draw(this.image)

    this.x = x
    this.y = y
  }
  get x () { return this.rect!.x }
  set x (value: number) { this.rect!.x = value }
  get y () { return this.rect!.y }
  set y (value: number) { this.rect!.y = value }
}