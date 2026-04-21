import { Viewer } from "../../../../shared"
import { displayFps } from "../../../../../utils/display-fps"
import { type ScriptModule, type ScriptSettings } from "../../../../../components/example"
import { loadImage, Rect, Sketch } from "smallgame"

export default async ({ container, containerSize, fps, builders }: ScriptSettings): Promise<ScriptModule> => {
  const viewer = new Viewer(containerSize, container, { disableContextMenu: true })

  const img = await loadImage('istockphoto-517188688-612x612.jpg')
  const roundedrect = Sketch
    .new()
    //.roundedrect({ fill: '#000' }, Rect.size(img.width + 1, img.height+ 1), 80)
    .circle({ fill: '#000' }, Rect.size(img.width + 1, img.height+ 1).center, img.height / 2)
    .toSurface()
  img.mix('destination-in', roundedrect)
  img.rect.absCenter = viewer.viewportRect.center

  viewer.onFrameChanged = surface => {
    surface.clear()
    surface.blit(img, img.rect)
    displayFps(fps)
  }

  const ui = builders.ui()
  ui.info('Surface.mix("destination-in", MaskSurface)')
  return {
    ui: ui.build(),
    dispose () { 
      viewer.remove() 
    }
  }
}
