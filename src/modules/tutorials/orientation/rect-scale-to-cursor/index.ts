import { Magnifier, Viewer } from "../../../shared"
import { displayFps } from "../../../../utils/display-fps"
import { Icons, type ScriptModule, type ScriptSettings } from "../../../../components/example"
import { Point, Rect, Sketch } from "smallgame"

export default async ({ container, containerSize, fps, builders, viewerControls }: ScriptSettings): Promise<ScriptModule> => {
  const telemetry = builders.telemetry().open()
  const zoom = telemetry.def('Zoom', 1)
  const magnifier = new Magnifier()
  const viewer = new Viewer(containerSize, container, { disableContextMenu: true, viewerControls })

  const rects = [
    Rect.size(300, 300),
    Rect.size(50, 50),
    Rect.size(50, 50),
    Rect.size(50, 50),
    Rect.size(50, 50),
    Rect.size(30, 30),
    Rect.size(30, 30),
    Rect.size(30, 30),
    Rect.size(30, 30),
    //new Rect(300, 400, 100, 100)
  ]
  
  rects[0].absCenter = viewer.surface.rect.center
  rects[1].absCenter = rects[0].topLeft
  rects[2].absCenter = rects[0].topRight
  rects[3].absCenter = rects[0].bottomLeft
  rects[4].absCenter = rects[0].bottomRight
  rects[5].absCenter = rects[0].midTop
  rects[6].absCenter = rects[0].midBottom
  rects[7].absCenter = rects[0].midLeft
  rects[8].absCenter = rects[0].midRight

  const workRects = rects.map(rect => rect.dup())

  const scaleAndShift = (current: Rect, origin: Rect, pos: Point) => {
    const p = pos
      .shift(current.topLeft.neg())
      .scale(current.size.inverse().toPoint())
      .scale(origin.size.toPoint())
      .shift(origin.topLeft)
    return origin
      .scale(zoom.value, zoom.value, p)
      .shift(pos.shift(p.neg()))
  }

  viewer.onInput = ev => {
    if (ev.type === 'WHEEL') {
      magnifier.byDelta(ev.deltaY)
      zoom.value = magnifier.zoom

      workRects.forEach((rect, index) => rect.set(scaleAndShift(rect, rects[index], ev.pos)))
    }

    if (ev.type === 'MOUSEMOVE' && ev.lbc) {
      workRects.forEach(rect => rect.shiftSelf(ev.shift))
    }
  }

  viewer.onFrameChanged = surface => {
    surface.clear()
    const sketch = Sketch.new()
    workRects.forEach(rect => sketch.rect({ fill: '#3b4ba7' }, rect))
    rects.forEach(rect => sketch.rect({ fill: '#b8781733' }, rect))
    sketch.draw(surface)
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
