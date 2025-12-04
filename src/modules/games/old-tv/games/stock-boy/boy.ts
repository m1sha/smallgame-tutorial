import { Sprite, Animator, Rect, Time, Point, TPoint } from "smallgame"
import { sizes } from "./sizes"

export class Boy extends Sprite {
  private animator: Animator = new Animator()
  private target: Point  = Point.zero
  isGrounded: boolean = true

  get position (): Readonly<TPoint> {
    return this.rect
  }

  set position (value: Readonly<TPoint>) {
    this.rect.moveSelf(value)
    this.target.moveSelf(value)
  }

  get moving () {
    const cx = 0 | this.rect.x
    const tx = 0 | this.target.x
    return cx !== tx
  }
  
  setTarget (value: number) {
    this.target.shiftXSelf(value)
  }

  jump (value: number) {
    this.target.shiftYSelf(value)
  }

  async create(): Promise<void> {
    this.rect = new Rect(0, 0, sizes.boxSize, sizes.boxSize * 2)

    await this.animator.add('idle', { 
      tileWidth: 45, 
      titleHight: 90, 
      url: 'stock-boy/boy1.png', 
      rate: 1.5 
    })
    
    this.animator.set('idle')
  }

  protected update(): void {
    this.image = this.animator.image
    this.animator.tick()

    if (!this.isGrounded) this.rect.y += 100 * Time.deltaTime
    if (this.moving) this.rect.x += 75 * Time.deltaTime * Math.sign(this.target.x - this.rect.x) 
  }

  
}