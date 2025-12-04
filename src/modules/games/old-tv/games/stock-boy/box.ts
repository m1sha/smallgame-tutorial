import { loadImage, Point, Rect, Sprite, Time } from "smallgame"
import { sizes } from "./sizes"

export class Box extends Sprite {
  id = uuidv4()
  isGrounded: boolean = true
  fieldRect: Rect | null = null
  private target: Point  = Point.zero
  
  
  constructor (public readonly colorIndex: number) {
    super()
  }

  setTarget (value: number) {
    this.target.shiftSelf(value, 0)
  }

  async create(): Promise<void> {
    const url = 'stock-boy/' + ['red-box.png', 'blue-box.png', 'green-box.png', 'yellow-box.png'][this.colorIndex]
    this.image = await loadImage(url)
    this.rect = this.image.rect
  }

  protected update(): void {
    if (!this.isGrounded) this.rect.y += 100 * Time.deltaTime
    
    if (this.moving && this.isGrounded) {
      //this.rect.x += 80 * Time.deltaTime //   Math.sign(this.target.x - this.rect.x)
      //this.rect.x *= Math.sign(this.target.x - this.rect.x) - 45
      
    }
  }

  get cell (): { col: number, row: number } {
    const rect = this.fieldRect
    if (!rect) throw new Error('Field rect is not set')
    return {
      col: 0 | (this.rect.x - rect.x) / sizes.boxSize,
      row: 0 | (this.rect.y - rect.y) / sizes.boxSize,
    }
  }

   get moving () {
    const cx = 0 | this.rect.x
    const tx = 0 | this.target.x
    return cx !== tx
  }
}

export function uuidv4(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
