import { displayFps } from "../../../../utils/display-fps"
import { type ScriptModule, type ScriptSettings } from "../../../../components/example"
import { UIBuilder } from "../../../../components/example/code/ui"
import { Model } from "./model"
import { Viewer } from "../../../shared"

export default async ({ container, width, height, fps }: ScriptSettings): Promise<ScriptModule> => {
  const viewer = new Viewer({ width, height}, container)
  const model = new Model({ width, height })
  model.settings.concentrationPoints = 20
  model.settings.concentrationPointRadius = 20
  model.settings.avgBotsPerPoint = 10
  model.create()

  viewer.onFrameChanged = surface => {
    surface.clear()
    model.update()
    surface.blit(model.surface, model.surface.rect)
    displayFps(fps)
  }

  const ui = new UIBuilder()
  ui.tracker("t", 0, 1, 0.01, v => model.t = v, 0)
  return {
    ui: ui.build(),
    dispose () { 
      viewer.remove() 
    }
  }
}
