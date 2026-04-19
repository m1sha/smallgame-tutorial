import { displayFps } from "../../../../utils/display-fps"
import { type ScriptModule, type ScriptSettings } from "../../../../components/example"
import { Viewer } from "../../../shared"
import { Model } from "./model"

export default async ({ container, containerSize, fps, builders }: ScriptSettings): Promise<ScriptModule> => {
  const ui = builders.ui()
  const viewer = new Viewer(containerSize, container)

  const concentrationPoints = ui.var(20)
  const concentrationPointRadius = ui.var(20)
  const avgBotsPerPoint = ui.var(30)

  let model = new Model(containerSize)
  model.settings.concentrationPoints = concentrationPoints.value
  model.settings.concentrationPointRadius = concentrationPointRadius.value
  model.settings.avgBotsPerPoint = avgBotsPerPoint.value
  model.create()

  //viewer.onFixedUpdate = () => {
  //}

  viewer.onFrameChanged = surface => {
    surface.clear()
    model.update()
    surface.blit(model.surface, model.surface.rect)
    displayFps(fps)
  }

  ui.tracker('Concentration Points', 1, 50, 1, undefined, concentrationPoints)
  ui.tracker('Concentration Point Radius', 1, 50, 1, undefined, concentrationPointRadius)
  ui.tracker('Avg Bots Per Point', 1, 50, 1, undefined, avgBotsPerPoint)
  
  ui.button('Restart', () => {
    model = new Model(containerSize)
    model.settings.concentrationPoints = concentrationPoints.value
    model.settings.concentrationPointRadius = concentrationPointRadius.value
    model.settings.avgBotsPerPoint = avgBotsPerPoint.value
    model.create()
  })
  //ui.tracker("t", 0, 1, 0.01, v => model.t = v, 0)
  return {
    ui: ui.build(),
    dispose () { 
      viewer.remove() 
    }
  }
}
