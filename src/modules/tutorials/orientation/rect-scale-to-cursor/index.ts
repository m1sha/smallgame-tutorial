import { Viewer } from "../../../shared"
import { displayFps } from "../../../../utils/display-fps"
import { Icons, type ScriptModule, type ScriptSettings } from "../../../../components/example"
import { GMath, Point, Rect, Sketch } from "smallgame"

export default async ({ container, containerSize, fps, builders }: ScriptSettings): Promise<ScriptModule> => {
  const telemetry = builders.telemetry().open()
  const curPos = telemetry.def('Cursor Position', Point.zero)
  const zoom = telemetry.def('Zoom', 1)
  const viewer = new Viewer(containerSize, container, { disableContextMenu: true })

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
  let rectWork = rect.dup()
  let rectWork1 = rect1.dup()
  let rectWork2 = rect2.dup()
  let rectWork3 = rect3.dup()
  let rectWork4 = rect4.dup()

  zoom.value = 1
  let step = 1

  const scale = (r: Rect, pos: Point) => r.scale(zoom.value, zoom.value, pos)

  viewer.onInput = ev => {
    if (ev.type === 'WHEEL') {
      step -= Math.sign(ev.deltaY)
      GMath.clamp(step, 0, 14)
      zoom.value = GMath.logZoom(step, 14, 1, 2)
      
      //console.log('a')
      rectWork =  scale(rect, ev.pos)
      rectWork1 = scale(rect1, ev.pos)
      rectWork2 = scale(rect2, ev.pos)
      rectWork3 = scale(rect3, ev.pos)
      rectWork4 = scale(rect4, ev.pos)
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

  const ui = builders.ui()
  ui.info(Icons.computerMouse + ' Use the mouse wheel to scale the object')
  return {
    ui: ui.build(),
    telemetry: telemetry.build(),
    dispose () { 
      viewer.remove() 
    }
  }
}
