import { Viewer } from "../../../shared"
import { displayFps } from "../../../../utils/display-fps"
import { type ScriptModule, type ScriptSettings } from "../../../../components/example"
import { MemSurface, Segment, Size, Sketch } from "smallgame"

export default async ({ container, containerSize, fps, builders }: ScriptSettings): Promise<ScriptModule> => {
  const viewer = new Viewer(containerSize, container, { disableContextMenu: true })
  const ui = builders.ui()

  const len = 300
  const radius = len / 2 - 1
  const surface = new MemSurface(new Size(len + 100, len + 100))
  surface.rect.center = viewer.viewportRect.center

  const z_a = ui.var(-90)
  const y_a = ui.var(z_a.value + 155.1)
  const x_a = ui.var(y_a.value + 106.1)

  viewer.onFrameChanged = frame => {
    const point = surface.rect.center
    const x_axis = point.rotate(x_a.value, radius)
    const y_axis = point.rotate(y_a.value, radius)
    const z_axis = point.rotate(z_a.value, radius)

    surface.clear()
    Sketch.new()
      .circle({ stroke: '#757575', fill: '#777' }, point, radius)
      .arrow({ stroke: '#72031b', lineWidth: 3 }, point, x_axis, { end: { arrowAngle: 60, arrowRadius: 25 }})
      .arrow({ stroke: '#037251', lineWidth: 3 }, point, y_axis, { end: { arrowAngle: 60, arrowRadius: 25 }})
      .arrow({ stroke: '#050372', lineWidth: 3 }, point, z_axis, { end: { arrowAngle: 60, arrowRadius: 25 }})
      .text({ fontSize: '18px', color: '#fff' }, 'x', new Segment(point, x_axis).extrapolateEnd(20).end)
      .text({ fontSize: '18px', color: '#fff' }, 'y', new Segment(point, y_axis).extrapolateEnd(20).end)
      .text({ fontSize: '18px', color: '#fff' }, 'z', new Segment(point, z_axis).extrapolateEnd(20).end)
      .draw(surface)

    frame.clear()
    frame.blit(surface, surface.rect)

    displayFps(fps)
  }

  ui.tracker('x', 0, 360, 1, undefined, x_a)
  ui.tracker('x', 0, 360, 1, undefined, y_a)
  ui.tracker('x', 0, 360, 1, undefined, z_a)
  
  return {
    ui: ui.build(),
    dispose () { 
      viewer.remove() 
    }
  }
}
