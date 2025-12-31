import { Point, Sketch, Splines, Time } from "smallgame"
import { displayFps } from "../../../../../utils/display-fps"
import { type ScriptModule, type ScriptSettings } from "../../../../../components/example"
import { UIBuilder } from "../../../../../components/example/code/ui"
import { easeOutBounce } from "../movements/func"
import { Viewer } from "../../../../shared"

export default async ({ container, width, height, fps }: ScriptSettings): Promise<ScriptModule> => {
  const viewer = new Viewer({ width, height}, container)
  const a = new Point(400, 100)
  const b = new Point(800, 400)
  const cp1 = new Point(500, 500)
  const cp2 = new Point(600, 700)
  let t = 0

  viewer.onInput = ev => {
    if (ev.type === 'MOUSEMOVE' && ev.lbc) {
      if (a.inRadius(ev.pos, 20)) a.shiftSelf(ev.shift)
      if (b.inRadius(ev.pos, 20)) b.shiftSelf(ev.shift)
      if (cp1.inRadius(ev.pos, 20)) cp1.shiftSelf(ev.shift)
      if (cp2.inRadius(ev.pos, 20)) cp2.shiftSelf(ev.shift)
    }
  }
  viewer.onFrameChanged = (surface => {
    const c = Splines.cubicBezier(a, b, cp1, cp2, easeOutBounce(t))
    
    if (t < 1) {
      t += 0.2 * Time.deltaTime
    }

    surface.clear()
    Sketch.new()
      .cubicBezier({ stroke: '#07294bff', lineWidth: 4 }, a, b, cp1, cp2)
      .circle({ fill: '#834009ff' }, a, 10)
      .circle({ fill: '#076b31ff' }, b, 10)
      .circle({ fill: '#122b9cff' }, cp1, 10)
      .circle({ fill: '#122b9cff' }, cp2, 10)
      .circle({ fill: '#20745fff' }, c, 20)
      .draw(surface)
    displayFps(fps)
  })

  const ui = new UIBuilder()
  ui.button('Restart', () => t = 0)
  return {
    ui: ui.build(),
    dispose () { 
      viewer.remove() 
    }
  }
}
