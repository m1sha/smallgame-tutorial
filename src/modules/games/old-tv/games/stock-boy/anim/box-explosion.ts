import { Animator, Rect, Sprite, TPoint } from "smallgame";

export class BoxExplosion extends Sprite {
  private animator: Animator = new Animator()
  canDelete: boolean = false

  constructor (private position: TPoint) {
    super()
  }


  async create(): Promise<void> {
    await this.animator.add('explosion', { 
      tileWidth: 45, 
      titleHight: 45, 
      url: 'stock-boy/box-explosion.png', 
      rate: 12 
    })
    this.animator.onEndAnimationLoop = () => this.canDelete = true
    this.animator.set('explosion')
    this.rect = new Rect(this.position.x, this.position.y, 45, 45)
  }

  protected update(): void {
    this.image = this.animator.image
    //this.rect = this.image.rect.move(32, 110)
    this.animator.tick()
  }
}