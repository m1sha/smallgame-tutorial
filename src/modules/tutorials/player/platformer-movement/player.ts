import { AnimatedSprite, loadImage, Point, Rect, Size, SpriteSheet, Time } from "smallgame"
import { Platforms } from "./platforms"

export class Player {
  private platforms: Platforms | null = null
  private sprite: AnimatedSprite | null = null
  dir = 1
  isIdle = true
  jumping = false
  heroRect = Rect.zero

  //hy = 0
  maxJumpForce = 14
  expenseJumpForce = 80
  recoveringJumpForce = 40
  jumpForce: number = 0
  maxFallDownAccel = 3
  a = 3

  movementSensitivity = 0.8
  movementFriction = .9
  
  async load () {
    const img = await loadImage('action-pack/Full-Sheet.png')
    const ss = new SpriteSheet(img, new Size(72.225, 72), 8)
    ss.addBatch('idle', 1)
    ss.addBatch('run', 2, 8)
    ss.addBatch('jump', 26, 8)
    this.sprite = new AnimatedSprite(ss)
    this.sprite.playBatch('run')
    this.heroRect = ss.getTile(0).rect.dup()
  }

  get image () {
    const zoom = 1.6
    return this.dir == -1 ? this.sprite.image.scale(zoom, zoom).flip('x') : this.sprite.image.scale(zoom, zoom)
  }

  move (horizontalShift: number) {
    this.heroRect.shiftSelf(horizontalShift, 0)
  }

  jump () {
    if (!this.jumping && this.jumpForce >= this.maxJumpForce) {
      this.jumping = true
    //  this.hy = this.heroRect.y
      this.a = this.maxFallDownAccel
    }
  }

  setPlatforms (platforms: Platforms) {
    this.platforms = platforms
  }

  private doJump () {
    //const tp = this.platforms!.collidePlaforms(this.heroRect.midBottom)
    //if (!tp) {
      //this.a += this.a * Time.deltaTime
      this.heroRect.shiftSelf(0, this.jumpForce )
    //}
    //else {
    //  this.a = this.maxFallDownAccel
    //  this.heroRect.y = tp.rect.y - this.heroRect.height //this.hy
    //  this.jumping = false
    //}
  }

  private recoverJumpForce () {
    if (!this.jumping && this.jumpForce < this.maxJumpForce) {
      this.jumpForce += this.recoveringJumpForce * Time.deltaTime
    }
  }

  private gravity () {
    if (this.jumpForce > 0) {
      this.jumpForce -= this.expenseJumpForce * Time.deltaTime
      this.heroRect.shiftSelf(0, -this.jumpForce )
    }
    
    const tp = this.platforms!.collidePlaforms(this.heroRect.midBottom)
    if (!tp) return
    if (this.heroRect.y  > tp.rect.y - this.heroRect.height){
      this.heroRect.y = tp.rect.y - this.heroRect.height
    }
    
  }

  action () {
    
    if (this.jumping) {
      this.sprite.playBatch('jump')  
      this.doJump()
    } else
    this.sprite.playBatch(this.isIdle ? 'idle' : 'run')
    this.gravity()
    this.recoverJumpForce()
    this.sprite.update()
  }
}