import { GameEvents, Keys, Surface, SurfaceBase, Key } from "smallgame"
import { CallbackAction, IScene } from "../scene"
import { Field } from "./field"
import { Background } from "./background"
import { Foreground } from "./foreground"
import { Manipulators } from "./manipulators"

export class StockBoy implements IScene {
  private screen: Surface
  private background: Background
  private foreground: Foreground
  private field: Field
  private manipulators: Manipulators
  
  constructor (width: number, height: number, _: number) {
    this.screen = new Surface(width, height)
    this.background = new Background(width, height)
    this.foreground = new Foreground(width, height)
    this.field = new Field(width, height)
    this.manipulators = new Manipulators(width, height)
    this.manipulators.onDischarge = (box, index) => this.field.setBoxOnTopColumn(index, box)
  }

  nextFrame(events: GameEvents, _: Keys): SurfaceBase {
    this.input(events)

    this.background.draw(this.screen)
    this.field.draw(this.screen)
    this.manipulators.draw(this.screen)
    this.foreground.draw(this.screen)

    return this.screen
  }

  async create(): Promise<void> {
    await this.background.create()
    await this.foreground.create()
    await this.field.create()
    await this.manipulators.create()
  }
  
  onAction: CallbackAction | null = null

  private input (events: GameEvents) {
    for (const event of events.get()) {
      if (event.type === 'KEYDOWN') {
        if (event.key === Key.LEFT) {
          this.field.moveLeft()
        }

        if (event.key === Key.RIGHT) {
          this.field.moveRight()
        }

        if ([Key.UP, Key.SPACE].includes(event.key)) {
          this.field.moveUp()
        }
      }
    }
  }
}