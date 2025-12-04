import { GameEvents, Keys, Surface, SurfaceBase, Key } from "smallgame";
import { CallbackAction, IScene } from "../../scene";
import { Hero } from "./hero";
import { World } from "./world";

export class PlatformerAnimation implements IScene {
  private screen: Surface
  private world: World
  private hero: Hero

  constructor (width: number, height: number, private index: number) {
    this.screen = new Surface(width, height)
    this.world = new World(width, height)
    this.hero = new Hero(this.world)
    this.screen.imageRendering = 'pixelated'
  }

  async create(): Promise<void> {
    await this.hero.create()
  }

  nextFrame(events: GameEvents, key: Keys): SurfaceBase {
    this.inputs(events, key)
    this.screen.clear()
    this.hero.draw(this.screen)
    return this.screen
  }

  onAction: CallbackAction | null = null

  private inputs (events: GameEvents, key: Keys) {
    for (const event of events.get()) {
      if (event.type === 'KEYDOWN') {

        if (event.key === Key.ESCAPE) {
          if (this.onAction) this.onAction('gameover', { index: this.index })
        }

        if (event.key === Key.SPACE) {
          this.hero.jump()
        }

      }
    }

    const keys = key.getPressed()
    
    if (keys[Key.LEFT]) {
      this.hero.moveLeft()
    } else if (keys[Key.RIGHT]) {
      this.hero.moveRight()
    } else {
      this.hero.stopMoveing()
    }
  }
}