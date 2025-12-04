import { GameEvents, Keys, Surface, SurfaceBase, Text, loadImage, Group, Key } from "smallgame"
import { CallbackAction, IScene } from "../scene"
import { Hero } from "./hero"
import { Balloon } from "./balloon"
import { Brick } from "./brick"
import { sizes } from "./size"




export class BricksBreaker implements IScene {
  private screen: Surface
  private hero: Hero
  private balls: Group<Balloon>
  private bricks:  Group<Brick>

  constructor (width: number, height: number, index: number) {
    this.screen = new Surface(width, height)

    this.hero = new Hero(0, 0)
    this.hero.x = width * 0.5  - this.hero.rect!.width / 2
    this.hero.y = height - 30
    this.balls = new Group<Balloon>()
    const balloon1 = new Balloon(width * 0.5 + 10, height - 30, width, height)
  
    this.balls.add(balloon1)
  

    this.bricks = new Group<Brick>()
    for (let i = 0; i < 6; i++)  {
      for (let j = 0; j < 18; j++)  {
        const brick = new Brick(j * sizes.brick_width + 18, i * sizes.brick_height + 40, 'destroyable' )
        this.bricks.add(brick)
      }
    }


    for (let j = 0; j < 3; j++)  {
      const brick = new Brick(j * 200 + 85, 210, 'immortal' )
      this.bricks.add(brick)
    }
    
  }
  
  nextFrame(_: GameEvents, key: Keys): SurfaceBase {
     this.balls.collideSprite(this.hero, balloon => {
      const sides = this.hero.rect.touchSide(balloon.rect)
      for (const side of sides) {
        if (side === 'bottom') balloon.directionY = 'down'
        if (side === 'top') balloon.directionY = 'up'
      }
    })

    this.bricks.collideGroup(this.balls, (brick, balloon) => {
      const sides = brick.rect.touchSide(balloon.rect)
      for (const side of sides) {
        if (side === 'bottom') balloon.directionY = 'down'
        else
        if (side === 'top') balloon.directionY = 'up'
      }
      
      if (brick.type === 'destroyable') this.bricks.remove(brick)
    })

    var keys = key.getPressed()
    if (keys[Key.K_A] || keys[Key.LEFT]) this.hero.x -= 3
    if (keys[Key.K_D] || keys[Key.RIGHT]) this.hero.x += 3

    this.screen.fill('#404040')
    
    this.bricks.draw(this.screen)
    this.balls.draw(this.screen)
    this.hero.draw(this.screen)

    return this.screen
  }

  async create(): Promise<void> {
    const img = await loadImage('falling-blocks.png') //brick-breaker.png
    this.screen.blit(img, this.screen.rect)
  }

  onAction: CallbackAction | null = null
}