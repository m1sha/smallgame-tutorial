import { AnimatedSprite, loadImage, Point, Rect, Size, SpriteSheet, Time } from "smallgame"

type EnemyState = 'patrolling' | 'catching' | 'attack'

export class Enemy {
  private state: EnemyState = 'patrolling' 
  private spriteWalk: AnimatedSprite | null = null
  private spriteRun: AnimatedSprite | null = null
  private spriteAttack: AnimatedSprite | null = null
  private targetPos = Point.zero
  private dir = -1
  private enemyRect = Rect.size(32, 96)
  
  startPoint = Point.zero
  patrolDistance = 0
  catchDistance = 0
  attackDistance = 0
  runSpeed = 0
  patrolSpeed = 0

  setPos (pos: Point) {
    this.enemyRect.moveSelf(pos, 'top-center').shiftSelf(0, -4)
    this.startPoint = this.enemyRect.topLeft
  }

  setTarget (pos: Point) {
    this.targetPos = pos
  }

  async load () {
    let img = await loadImage('zombie/Wild Zombie/Walk.png')
    let ss = new SpriteSheet(img, new Size(96, 96), 4)
    this.spriteWalk = new AnimatedSprite(ss)

    img = await loadImage('zombie/Wild Zombie/Run.png')
    ss = new SpriteSheet(img, new Size(96, 96), 14)
    this.spriteRun = new AnimatedSprite(ss)

    img = await loadImage('zombie/Wild Zombie/Attack_3.png')
    ss = new SpriteSheet(img, new Size(96, 96), 8)
    this.spriteAttack = new AnimatedSprite(ss)
  }

  get image () {
    const sprite = this.getSprite()
    const img = this.dir == -1 ? sprite.image.flip('x') : sprite.image
 
    img.rect.absCenter = this.enemyRect.absCenter
    return img
  }

  action () {
    if (this.state === 'patrolling') this.patrolling()
    if (this.state === 'catching') this.catching()
    if (this.state === 'attack') this.attack()
    this.getSprite().update()
  }
  
  patrolling () {
    if (this.startPoint.x - this.patrolDistance  > this.enemyRect.x && this.dir === -1) this.dir = 1
    if (this.enemyRect.bottomRight.x > this.startPoint.x + this.patrolDistance && this.dir === 1) this.dir = -1
    
    this.enemyRect.shiftSelf(this.patrolSpeed * this.dir * Time.deltaTime, 0)

    if (this.getDistance() < this.catchDistance) {
      this.state = 'catching'
    }
  }

  private catching () {
    this.detectTagetDirection()
    if (this.getDistance() > this.catchDistance) {
      this.state = 'patrolling'
      
    }

    this.enemyRect.shiftSelf(this.runSpeed * this.dir * Time.deltaTime, 0)


    if (this.enemyRect.absCenter.distance(this.targetPos) < this.attackDistance)  {
      this.state = 'attack'
      return
    }
  }

  private attack () {
    const distance = this.getDistance()
    if (distance < this.attackDistance) {
      return
    }
    if (distance < this.catchDistance) {
      this.state = 'catching'
      return
    }

    this.state = 'patrolling'
  }

  private getDistance () {
    return this.enemyRect.absCenter.distance(this.targetPos)
  }

  private detectTagetDirection () {
    const x = this.targetPos.x - this.enemyRect.absCenter.x
    if (x === 0) return
    this.dir = x < 0 ? -1 : 1
  }

  private getSprite () {
    if (this.state === 'catching') return this.spriteRun
    if (this.state === 'attack') return this.spriteAttack
    return this.spriteWalk
  }
}