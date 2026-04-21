import { loadImage } from "smallgame"
import { type ScriptModule, type ScriptSettings } from "../../../../../components/example"
import { Viewer } from "../../../../shared"
import { displayFps } from "../../../../../utils/display-fps"

export default async ({ container, containerSize, fps, builders }: ScriptSettings): Promise<ScriptModule> => {
  const ui = builders.ui()
  const viewer = new Viewer(containerSize, container)

  let a = 18

  const img = await loadImage('istockphoto-517188688-612x612.jpg')
  img.rect.center = viewer.viewportRect.center

  viewer.onFrameChanged = surface => {
    surface.clear()
    surface.blit(img, img.rect, { angle: a, pivote: 'center-center' })
    displayFps(fps)
  }

  ui.info('Bliting image')
  ui.tracker('Rotate', 0, 359, 1, val => a = val, a)

  return {
    ui: ui.build(),
    dispose() {
      viewer.remove()
    },
  }
}