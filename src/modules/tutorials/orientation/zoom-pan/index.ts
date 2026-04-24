import { Viewer } from "../../../shared"
import { displayFps } from "../../../../utils/display-fps"
import { type ScriptModule, type ScriptSettings } from "../../../../components/example"
import { GMath, Point, Rect, Sketch } from "smallgame"

export default async ({ container, containerSize, fps, builders, viewerControls }: ScriptSettings): Promise<ScriptModule> => {
  const telemetry  = builders.telemetry().open().noLegend()
  const topleftParam = telemetry.def('Screen Zero Shift', Point.zero)
  const worldOffsetParam = telemetry.def('World Offset', Point.zero)
  const worldZoomParam = telemetry.def('World Zoom', 1)
  const cursorParam = telemetry.def('Cursor', Point.zero)
  const worldCursorParam = telemetry.def('World Cursor', Point.zero)
  
  const viewer = new Viewer(containerSize, container, { disableContextMenu: true, viewerControls })
  viewer.ui.setCellSize(24, 24)
  
  const viewport = viewer.viewport
  const objects: Rect[] = []
  
  let step = 1
  let createObjectMode = false
  viewer.onInput = ev => {
    if (ev.type === 'MOUSEDOWN') {
      if (ev.lbc && createObjectMode) {
        objects.push(Rect.fromCenter(ev.pos.shift(viewport.offset.neg()), 100, 100))
        createObjectMode = false
      }
    }
    if (ev.type === 'MOUSEMOVE') {
      if (ev.lbc) {
        viewport.panBy(ev.shift)
      }

      cursorParam.value = ev.pos
      worldCursorParam.value = ev.pos.shift(viewer.offset.neg())
    }

    if (ev.type === 'WHEEL') {
      step -= Math.sign(ev.deltaY)
      GMath.clamp(step, 0, 9)
      let zoom = GMath.logZoom(step, 4, 1, 2)
      zoom = GMath.clamp(zoom, 0.1, 8)
      
      viewport.zoomTo(zoom, ev.pos)
      
      worldOffsetParam.value = Point.from(viewport.offset)
      worldZoomParam.value = viewport.zoom
    }
  }

  const rect = new Rect(0, 0,  500, 500)
  const rect2 = new Rect(0, 800,  400, 400)
  const dot = new Point(500, 500)
  const dot2 = new Point(0, 0)
  const dot3 = rect.absCenter

  const dot4 =  new Point(1200, 500)

  viewer.onFrameChanged = surface => {
    surface.clear()

    const r = rect.scale(viewport.zoom).shift(viewport.offset)
    const r2 = rect2.scale(viewport.zoom).shift(viewport.offset)
    const p = dot.scale(viewport.zoom).shift(viewport.offset)
    const p2 = dot2.scale(viewport.zoom).shift(viewport.offset)
    const p3 = dot3.scale(viewport.zoom).shift(viewport.offset)

    //const p4 = dot4.scale(viewport.zoom).shift(viewport.offset)
    
    topleftParam.value = r.topLeft
    
    Sketch
      .new()
      .rect({ fill: '#78889918' }, r)
      .rect({ fill: '#ac0a4dce' }, r2)
      .circle({ fill: '#667797' }, p, 10 * viewport.zoom)
      .circle({ fill: '#466d36' }, p2, 20 * viewport.zoom)
      .circle({ fill: '#91172b' }, p3, 20 * viewport.zoom)
      .circle({ stroke: '#6b1423', lineWidth: viewport.zoom  }, p3, 30 * viewport.zoom)

      .circle({ fill: '#826faf' }, dot4.scale(viewport.zoom).shift(viewport.offset), 40 * viewport.zoom)
      .draw(surface)

    const s = Sketch.new()
    for (const obj of objects) {
      s.rect({ fill: '#34ce8eef' }, obj.scale(viewport.zoom).shift(viewport.offset))
    }
    s.draw(surface)
      
    displayFps(fps)
  }

  const ui = builders.ui()
  ui.button('Add Object', () => createObjectMode = true )
  return {
    ui: ui.build(),
    telemetry: telemetry.build(),
    dispose () { 
      viewer.remove() 
    }
  }
}
