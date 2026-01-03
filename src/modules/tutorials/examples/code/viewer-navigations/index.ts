import { Viewer } from "../../../../shared"
import { displayFps } from "../../../../../utils/display-fps"
import { type ScriptModule, type ScriptSettings } from "../../../../../components/example"
import { UIBuilder } from "../../../../../components/example/code/ui"
import { TelemetryBuilder } from "../../../../../components/example/code/telemetry"
import { Point, Rect, setPoint, Sketch } from "smallgame"

export default async ({ container, width, height, fps }: ScriptSettings): Promise<ScriptModule> => {
  const telemetry = new TelemetryBuilder()
  const viewer = new Viewer({ width, height }, container, { disableContextMenu: true })
  const globalPos = telemetry.open().def('Global Cursor', setPoint(0,0))
  const localPos = telemetry.open().def('Local Cursor', setPoint(0,0))
  const targetPos = telemetry.open().def('Offset', setPoint(0,0))

  
  const obj = Sketch.new().rect({ fill: '#778891' }, Rect.size(300, 300)).toSurface()
  obj.rect.absCenter = viewer.surface.rect.center

  const obj2 = Sketch.new().rect({ fill: '#1c681cff' }, Rect.size(300, 300)).toSurface()
  obj2.rect.moveSelf(-200, 0)

  viewer.onViewportChanged = pos => {
    obj.rect.shiftSelf(pos)
    obj2.rect.shiftSelf(pos)
  }

  viewer.onInput = ev => {
    if (ev.type === 'MOUSEMOVE') {
      localPos.value = viewer.mousePosition
      targetPos.value = viewer.offset
      globalPos.value = viewer.offset.shift(viewer.mousePosition)
    }
  }

  viewer.onFrameChanged = surface => {
    surface.clear()
    surface.blit(obj, obj.rect)
    surface.blit(obj2, obj2.rect)
    displayFps(fps)
  }

  const ui = new UIBuilder()
  return {
    ui: ui.build(),
    telemetry: telemetry.build(),
    dispose () { 
      viewer.remove() 
    }
  }
}
