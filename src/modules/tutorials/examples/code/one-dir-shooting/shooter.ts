import { GMath, loadImage, Point, Rect, Sketch, Sprite, Time } from "smallgame"
import { Missiles } from "./missiles"
import { Missile } from "./missile"

export class Shooter extends Sprite {
  goal = 0
  current = 0
  movementSpeed = 4
  movementAccel = 2
  pos = Point.zero
  private missiles: Missiles | null = null

  constructor () {
    super()

    this.image = new Sketch()
      .rect({ fill: '#373e83ff' }, new Rect(0, 0, 50, 50))
      .circle({ fill: '#921026ff' }, new Point(25, 14), 12)
      .toSurface()
    this.rect = this.image.rect
  }

  async create(): Promise<void> {
    this.image = await loadImage('space-striker/ships/Fighter_1.png')
    this.rect = this.image.rect
  }

  move (x: number) {
    this.goal = x * this.movementSpeed
  }

  setPos(point: Point) {
    this.pos = point
    this.rect.center = this.pos
  }

  setMissile (missiles: Missiles) {
    this.missiles = missiles
  }

  fire () {
    if (!this.missiles) return
    
    this.missiles.addMissile(this.pos.shiftY(-25))
  }

  protected update (): void {
    this.current = GMath.moveTowards(this.goal, this.current, this.movementAccel * Time.deltaTime)
    this.pos.shiftXSelf(this.current)  
    this.rect.center = this.pos
  }
}