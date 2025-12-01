import { Game, gameloop } from "smallgame"
import { displayFps } from "../../../../utils/display-fps"
import { type ScriptModule, type ScriptSettings } from "../../../../components/example"
import { UIBuilder } from "../../../../components/example/code/ui"
import { Model } from "./model"

export default async ({ container, width, height, fps }: ScriptSettings): Promise<ScriptModule> => {
  const { game, screen } = Game.create(width, height, container)

  const model = new Model({ width, height })
  model.settings.concentrationPoints = 16
  model.settings.concentrationPointRadius = 300
  model.settings.avgBotsPerPoint = 30
  model.create()

  gameloop(() => {
    screen.fill('#3f3f3fff')
    model.update()
    screen.blit(model.surface, model.surface.rect)

    displayFps(fps)
  })

  const ui = new UIBuilder()
  ui.tracker("t", 0, 1, 0.01, v => model.t = v, 0)
  return {
    ui: ui.build(),
    dispose () { 
      game.kill() 
    }
  }
}
