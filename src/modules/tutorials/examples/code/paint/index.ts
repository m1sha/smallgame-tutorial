import { Viewer } from "../../../../shared"
import { displayFps } from "../../../../../utils/display-fps"
import { type ScriptModule, type ScriptSettings } from "../../../../../components/example"
import { MemSurface, Point, Sketch, Splines } from "smallgame"

export default async ({ container, containerSize, fps, builders }: ScriptSettings): Promise<ScriptModule> => {
  const viewer = new Viewer(containerSize, container, { disableContextMenu: true })
  viewer.surface.imageRendering = 'pixelated'
  const canvasSurface = new MemSurface(containerSize)
  const activeSurface = new MemSurface(containerSize)
  canvasSurface.imageRendering = 'pixelated'
  activeSurface.imageRendering = 'pixelated'
  let points: Point[] = []
  let drawStarted = false
  viewer.onInput = ev => {
    if (ev.type === 'MOUSEDOWN') {
      drawStarted = true
    }

    if (ev.type === 'MOUSEMOVE') {
      if (!drawStarted) return
      points.push(ev.pos)

      //const x = ev.origin.getCoalescedEvents() as MouseEvent[]
      //x.forEach(e => points.push(new Point(e.offsetX, e.offsetY)))
    }

    if (ev.type === 'MOUSEUP' || ev.type === 'MOUSELEAVE') {
      drawStarted = false
      const arr: Point[] = []
      points.forEach((p, i) => {
        if (i % 12 === 0) arr.push(p)
      })
      arr.push(points[points.length - 1])
      const n = Splines.chaikin(arr, 2)
      n.pop()
      n.pop()

      n.pop()
      n.pop()
      n.pop()
      n.pop()

       Sketch
      .new()
      .polygon({ stroke: '#070', lineJoin: 'miter', lineCap: 'butt', lineWidth: 1 }, arr)
      .draw(canvasSurface)
      //canvasSurface.blit(activeSurface, activeSurface.rect)
      points = []
    }
  }

  viewer.onFrameChanged = surface => {
    surface.clear()
    activeSurface.clear()
    Sketch
      .new()
      .polygon({ stroke: '#f00' }, points)
      .draw(activeSurface)
    surface.blit(canvasSurface, canvasSurface.rect)
    surface.blit(activeSurface, activeSurface.rect)
    displayFps(fps)
  }

  const ui = builders.ui()
  return {
    ui: ui.build(),
    dispose () { 
      viewer.remove() 
    }
  }
}
