import { Group } from "smallgame"
import { Bot } from "./bot"
import { SeparateGrid } from "./speratate-grid"
import { Model } from "./model"

export class Bots extends Group<Bot> {
  constructor (private model: Model, private grid: SeparateGrid) {
    super()
  }

  protected update (): void {
    //this.grid.update(this.sprites as Bot[])
  }

  add (sprite: Bot): void {
    sprite.grid = this.grid
    sprite.model = this.model
    super.add(sprite)
  }
}