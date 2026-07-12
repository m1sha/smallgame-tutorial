import { Viewer } from "../../../shared"
import { displayFps } from "../../../../utils/display-fps"
import { type ScriptModule, type ScriptSettings } from "../../../../components/example"
import { loadImage, Rect, setPoint, Sketch } from "smallgame"

export default async ({ container, containerSize, fps, builders, viewerControls }: ScriptSettings): Promise<ScriptModule> => {
  const telemetry = builders.telemetry()
  const viewer = new Viewer(containerSize, container, { disableContextMenu: true, viewerControls })
  const globalPos = telemetry.open().def('Global Cursor', setPoint(0,0))
  const localPos = telemetry.open().def('Local Cursor', setPoint(0,0))
  const targetPos = telemetry.open().def('Offset', setPoint(0,0))

  const pattern = (await loadImage('patterns/chess-tex.jpg')).toPattern('repeat')
  const zoom = 2
  const pattern2 = (await loadImage('patterns/cross-dec-tex.bmp', { useSmooth: false })).scaleSelf(zoom, zoom).toPattern('repeat')
  pattern2.setTransform(new DOMMatrix().translateSelf(-10 * zoom,-10 * zoom))
  

  const obj = Sketch.new().roundedrect({ fill: pattern }, Rect.size(300, 300), 8).toSurface()
  obj.rect.absCenter = viewer.surface.rect.center

  const obj2 = Sketch.new().rect({ fill: pattern2 }, Rect.size(1428, 656)).toSurface()
  obj2.rect.moveSelf(300, 300)

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
    surface.blit(obj2, obj2.rect)
    surface.blit(obj, obj.rect)
    displayFps(fps)
  }

  const ui = builders.ui()
  return {
    ui: ui.build(),
    telemetry: telemetry.build(),
    dispose () { 
      viewer.remove() 
    }
  }
}
