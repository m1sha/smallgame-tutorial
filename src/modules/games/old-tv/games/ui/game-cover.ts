import { GameEvents, Keys, Surface, SurfaceBase, loadImage } from 'smallgame'
import { IScene, CallbackAction } from '../scene'
import { BaseMenu } from './base-menu'

export class GameCover implements IScene {
  private screen: Surface
  private bg: Surface
  private menu: BaseMenu

  constructor (private width: number, private height: number, private bgName: string, private gameIndex: number) {
    this.screen = new Surface(width, height)
    this.bg = new Surface(width, height)

    const x = this.width / 2 - 40
    const y = this.height - 70

    this.menu = new BaseMenu(['Start', 'Exit'], { x, y, width, height })
    this.menu.onSelect = index => {
      if (this.onAction) this.onAction( !index ? 'start': 'exit', { index: this.gameIndex })
    }
  }

  nextFrame(events: GameEvents, _: Keys): SurfaceBase {
    this.screen.blit(this.bg, this.screen.rect)
    this.menu.input(events)
    this.menu.draw(this.screen)
   
    return this.screen
  }

  async create(): Promise<void> {
    this.bg = await loadImage(this.bgName)
    this.menu.create()
  }

  onAction: CallbackAction | null = null
}