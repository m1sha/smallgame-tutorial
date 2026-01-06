import { Viewer } from "../../../../shared"
import { displayFps } from "../../../../../utils/display-fps"
import { TelemetryBuilder, type ScriptModule, type ScriptSettings, Icons, UIBuilder } from "../../../../../components/example"
import { Rect, Sketch } from "smallgame"
import { Pivote } from "smallgame/src/pivote"

export default async ({ container, width, height, fps }: ScriptSettings): Promise<ScriptModule> => {
  const viewer = new Viewer({ width, height }, container, { disableContextMenu: true })
  const telemetry = new TelemetryBuilder()
  const rectParam = telemetry.def('Original Rect', Rect.size(100, 100))
  const scaleRectParam = telemetry.def('Scaled Rect', Rect.size(100, 100))
  const rect = rectParam.value
  rect.absCenter = viewer.viewportRect.center
  let pivote: Pivote = 'center-center'
  let scaleX = 2
  let scaleY = 2

  viewer.onFrameChanged = surface => {
    const scaleRect = rect.scale(scaleX, scaleY, pivote)
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

  const ui = new UIBuilder()
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
  ui.group(Icons.blue_sq + 'Scaled Rect', group => group
    .open()
    .tracker('Horizontal', 0.1, 8, 0.1, val => scaleX = val, scaleX)
    .tracker('Vertical', 0.1, 8, 0.1, val => scaleY = val, scaleY)
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
