import { Viewer } from "../../../shared"
import { displayFps } from "../../../../utils/display-fps"
import { type ScriptModule, type ScriptSettings, Icons } from "../../../../components/example"
import { Rect, Sketch } from "smallgame"
import { Pivote } from "smallgame/src/pivote"

export default async ({ container, containerSize, fps, builders }: ScriptSettings): Promise<ScriptModule> => {
  const viewer = new Viewer(containerSize, container, { disableContextMenu: true })
  const telemetry = builders.telemetry()
  const rectParam = telemetry.def('Original Rect', Rect.size(100, 100))
  const scaleRectParam = telemetry.def('Displaced Rect', Rect.size(100, 100))
  const rect = rectParam.value
  rect.moveSelf(viewer.viewportRect.center, 'center-center')
  let pivote: Pivote = 'center-center'
  let shiftX = 0
  let shiftY = 0

  viewer.onFrameChanged = surface => {
    const scaleRect = rect.shift(shiftX, shiftY, pivote)
    surface.clear()
    Sketch
      .new()
      .rect({ fill: '#06a7205f'}, rect)
      .rect({ fill: '#2306a55f'}, scaleRect)
      .draw(surface)

    rectParam.value = rect
    scaleRectParam.value = scaleRect
    displayFps(fps)
  }

  const ui = builders.ui()
  ui.group(Icons.green_sq + 'Original Rect', group => group
    .open()
    .tracker('Width', 1, 800, 1, val => { 
      rect.width = val
      rect.absCenter = viewer.viewportRect.center 
    }, rect.width)
    .tracker('Height', 1, 800, 1, val => { 
      rect.height = val
      rect.absCenter = viewer.viewportRect.center 
    }, rect.height)
  )
  ui.group(Icons.blue_sq + 'Displaced Rect', group => group
    .open()
    .tracker('Horizontal', -800, 800, 1, val => shiftX = val, shiftX)
    .tracker('Vertical', -800, 800, 1, val => shiftY = val, shiftY)
    .select('Pivote', [
      'top-left', 
      'top-right', 
      'top-center', 
      'bottom-left', 
      'bottom-right', 
      'bottom-center', 
      'left-center', 
      'right-center', 
      'center-center'
    ], val => pivote = val as Pivote, 'center-center')
  )
  return {
    ui: ui.build(),
    telemetry: telemetry.build(),
    dispose () { 
      viewer.remove() 
    }
  }
}
