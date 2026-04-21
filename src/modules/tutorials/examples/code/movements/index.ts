import { displayFps } from "../../../../../utils/display-fps"
import { Time } from "smallgame"
import { easeOutBounce, funcMap } from "./func"
import { type ScriptSettings, type ScriptModule } from "../../../../../components/example"
import { Ball, Markers, Path } from './objects'
import { Viewer } from "../../../../shared"

export default async ({ container, containerSize, fps, builders }: ScriptSettings): Promise<ScriptModule> => {
  const telemetry = builders.telemetry()
  const viewer = new Viewer(containerSize, container)
  let t  = 0
  let speed = 0.2
  let func = easeOutBounce
  const { topLeft, bottomRight} = viewer.surface.rect.outline(300)
  const startPoint = topLeft
  const endPoint = bottomRight
  const ball = new Ball()
  const path = new Path(startPoint, endPoint, viewer.surface.rect)
  const markers = new Markers(startPoint, endPoint)
  let currSpeed = 0
  let s = false

  viewer.onInput = event => {
    if (event.type === 'MOUSEDOWN') {
      markers.setActive(event.pos)
    }
    if (event.type === 'MOUSEMOVE') {
      markers.hittest(event.pos)
      if (event.lbc) {
        markers.shiftActive(event.shift)
      }
    }
    if (event.type === 'MOUSEUP') {
      markers.releaseActive()
    }
  }

  viewer.onFrameChanged = surface => {
    const oldPos = ball.rect.topLeft
    surface.clear()
    path.draw(surface)
    markers.draw(surface)
    if (!markers.hasActive)
      ball.draw(surface)

    if (t < 1) t +=  Time.deltaTime * speed

    ball.setPath(startPoint, endPoint, func(t))
    path.setPath(startPoint, endPoint)
    displayFps(fps)
    telemetry.tick()

    if (s)
    currSpeed = ball.rect.topLeft.shift(oldPos.neg()).length / Time.deltaTime
    s = true
    if (isNaN(currSpeed)) currSpeed = 0
  }

  const ui = builders.ui()
  ui.select('Curve Type', [...funcMap.keys()], val => {
    t = 0
    func = funcMap.get(val)!
    telemetry.resetAuto() 
  }, 'easeOutBounce')

  ui.select('Speed', ['Slow', 'Noraml', 'Fast'], val => {
    if (val === 'Slow') speed = 0.05
    if (val === 'Noraml') speed = 0.2
    if (val === 'Fast') speed = 0.5
  }, 'Noraml')

  ui.button('Reset', () => { 
    t = 0; 
    telemetry.resetAuto() 
  })
  
  telemetry.open()
  telemetry.openChart()
  telemetry.param('Distance', () => ball.rect.topLeft.length.toFixed(4))
  telemetry.param('Speed', () => currSpeed.toFixed(4))
  telemetry.auto(() => t > 0, () => t > 1)

  return {
    ui: ui.build(),
    telemetry: telemetry.build(),
    dispose () {
      viewer.remove()
    }
  }
}


