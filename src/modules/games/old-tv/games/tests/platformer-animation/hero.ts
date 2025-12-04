import { Animator, Rect, Sprite, Time } from "smallgame"
import { World } from "./world"

export class Hero extends Sprite {
  private animator: Animator = new Animator()
  private dir = 1
  speed = 0
  jumping = false

  private force = -600
  private currForce = 0

  constructor (private world: World) {
    super()
  }

  async create(): Promise<void> {
    const url = 'platformer-animation/VirtualGuy/'
    const list: [string, string][] = [
      ['DoubleJump', url + 'DoubleJump.png'],
      ['Fall', url + 'Fall.png'],
      ['Hit', url + 'Hit.png'],
      ['Idle', url + 'Idle.png'],
      ['Jump', url + 'Jump.png'],
      ['Run', url + 'Run.png'],
      ['WallJump', url + 'WallJump.png']
    ]

    await this.animator.bulk(list, { tileWidth: 32, tileHeight: 32, rate: 16 })
    
    this.animator.entry('Idle')
    
    this.animator.addTransition({ 
      to: 'Run', 
      from: 'Idle',
      trigger: () => this.speed !== 0, 
      flipX: () => this.speed < 0  
    })
    
    this.animator.addTransition({ 
      to: 'Idle', 
      from: 'Run',
      trigger: () => this.speed === 0,
      flipX: () => this.dir < 0
    })

    this.animator.addTransition({ 
      to: 'Jump', 
      from: 'any',
      trigger: () => this.jumping && this.currForce < 0,
      flipX: () => this.dir < 0
    })
    
    this.animator.addTransition({ 
      to: 'Fall', 
      from: 'Jump',
      trigger: () => this.jumping && this.currForce > 0,
      flipX: () => this.dir < 0
    }) 

    this.animator.addTransition({ 
      to: 'Idle', 
      from: 'Fall',
      trigger: () => !this.jumping,
      flipX: () => this.dir < 0
    })
    
    this.rect = new Rect(100, 0, 64, 64)
  }

  moveLeft () {
    this.speed = -100
    this.dir = -1
  }

  moveRight () {
    this.speed = 100
    this.dir = 1
  }

  stopMoveing () {
    this.speed = 0
  }

  jump () {
    if (this.jumping) return
    this.currForce = this.force
    this.rect.y -= 20
  }

  protected update(): void {
    this.image = this.animator.image
    this.animator.tick()

    this.rect.x += this.speed * Time.deltaTime

    this.jumping = !this.world.isGound(this.rect.y + this.rect.height)

    if (this.jumping) {
      this.rect.y +=  (this.world.gravity + this.currForce)  * Time.deltaTime
      this.currForce += 5 
    } else {
      this.currForce = 0
    }
  }
}