import { Rect, Sketch, Sprite, Surface, Time } from "smallgame"
import { sizes } from "./size"

export class Balloon extends Sprite {
  directionX: 'left' | 'right' | 'none' = 'none'
  directionY: 'up' | 'down' | 'none' = 'none'

  speed = 200

  constructor (x: number, y: number, private width: number, private height: number) {
    super()
    this.image = new Surface(sizes.balloon_radius, sizes.balloon_radius)
    this.rect = new Rect(0, 0, sizes.balloon_radius, sizes.balloon_radius)
    const sketch = new Sketch()
    sketch.circle({ fill: '#bababa', stroke: '#ccc' }, { x: sizes.balloon_radius * 0.5, y: sizes.balloon_radius * 0.5 }, sizes.balloon_radius * 0.5 )
    sketch.draw(this.image)

    this.x = x
    this.y = y

    this.directionY = 'down'
    this.directionX = 'right'
  }

  get x () { return this.rect!.x }
  set x (value: number) { this.rect!.x = value }
  get y () { return this.rect!.y }
  set y (value: number) { this.rect!.y = value }

  update(): void {
    if (this.directionX == 'left')
      this.x-= this.speed * Time.deltaTime
    if (this.directionX == 'right')
      this.x+= this.speed * Time.deltaTime
    
      if (this.directionY == 'up')
      this.y-= this.speed * Time.deltaTime
    if (this.directionY == 'down')
      this.y+= this.speed * Time.deltaTime
  
    
    if (this.x < 0) this.directionX = 'right'
    if (this.x > this.width) this.directionX = 'left'
    if (this.y > this.height) this.directionY = 'up'
    if (this.y < 0) this.directionY = 'down'
  }
}