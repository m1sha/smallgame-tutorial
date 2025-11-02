import { Game, gameloop } from "smallgame"
import { ScriptSettings } from "../../../../../components/example"
import { Effect } from "./effect"
import { displayFps } from "../../../../../utils/display-fps"

export class EffectController {
  readonly effect: Effect 

  constructor (private settings: ScriptSettings) {
    this.effect = new Effect(settings)
  }

  play () {
    const { screen, game } = Game.create(this.settings.width, this.settings.height, this.settings.container)
     
    gameloop(() => {
      displayFps(this.settings.fps)
      this.effect.tick(screen)

      for (const ev of game.event.get()) {
        this.effect.input(ev)
      }
    })
  }

  create (s: string) {
    this.effect.create(s)
  }

  [Symbol.dispose] () {
    this.effect.dispose()
  }
}