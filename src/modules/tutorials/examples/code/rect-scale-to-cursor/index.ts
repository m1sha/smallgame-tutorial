import { Viewer } from "../../../../shared"
import { displayFps } from "../../../../../utils/display-fps"
import { Icons, type ScriptModule, type ScriptSettings, TelemetryBuilder, UIBuilder } from "../../../../../components/example"
import { GMath, Point, Rect, Sketch } from "smallgame"

export default async ({ container, width, height, fps }: ScriptSettings): Promise<ScriptModule> => {
  const telemetry = new TelemetryBuilder().open()
  const curPos = telemetry.def('Cursor Position', Point.zero)
  const viewer = new Viewer({ width, height }, container, { disableContextMenu: true })

  const rect = Rect.size(300, 300)
  const rect1 = Rect.size(50, 50)
  const rect2 = Rect.size(50, 50)
  const rect3 = Rect.size(50, 50)
  const rect4 = Rect.size(50, 50)
  
  rect.absCenter = viewer.surface.rect.center
  rect1.absCenter = rect.topLeft
  rect2.absCenter = rect.topRight
  rect3.absCenter = rect.bottomLeft
  rect4.absCenter = rect.bottomRight
  let rectWork = rect.clone()
  let rectWork1 = rect1.clone()
  let rectWork2 = rect2.clone()
  let rectWork3 = rect3.clone()
  let rectWork4 = rect4.clone()

  let zoom = 1

  viewer.onInput = ev => {
    if (ev.type === 'WHEEL') {
      const dz = Math.sign(ev.deltaY) * 0.1
      zoom -= dz
      zoom = GMath.clamp(zoom, .1252, 6)
      if (zoom === 0) zoom = 1
      //console.log('a')
      rectWork = rect.scale(zoom, zoom, ev.pos)
      rectWork1 = rect1.scale(zoom, zoom, ev.pos)
      rectWork2 = rect2.scale(zoom, zoom, ev.pos)
      rectWork3 = rect3.scale(zoom, zoom, ev.pos)
      rectWork4 = rect4.scale(zoom, zoom, ev.pos)
    }

    if (ev.type === 'MOUSEMOVE') curPos.value = ev.pos
  }

  viewer.onFrameChanged = surface => {
    surface.clear()
    Sketch
      .new()
      .rect({ fill: '#3b4ba7' }, rectWork)
      .rect({ fill: '#0065c4' }, rectWork1)
      .rect({ fill: '#0065c4' }, rectWork2)
      .rect({ fill: '#0065c4' }, rectWork3)
      .rect({ fill: '#0065c4' }, rectWork4)
      .rect({ fill: '#b8781733' }, rect)
      .rect({ fill: '#bb400f33' }, rect1)
      .rect({ fill: '#bb400f33' }, rect2)
      .rect({ fill: '#bb400f33' }, rect3)
      .rect({ fill: '#bb400f33' }, rect4)
      .draw(surface)
    displayFps(fps)
  }

  const ui = new UIBuilder()
  ui.info(Icons.computerMouse + ' Use the mouse wheel to scale the object')
  return {
    ui: ui.build(),
    telemetry: telemetry.build(),
    dispose () { 
      viewer.remove() 
    }
  }
}
