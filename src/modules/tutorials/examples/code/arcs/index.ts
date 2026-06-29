import { Viewer } from "../../../../shared"
import { displayFps } from "../../../../../utils/display-fps"
import { Icons, type ScriptModule, type ScriptSettings } from "../../../../../components/example"
import { Point, Sketch } from "smallgame"

export default async ({ container, containerSize, fps, builders }: ScriptSettings): Promise<ScriptModule> => {
  const viewer = new Viewer(containerSize, container, { disableContextMenu: true })
  const ui = builders.ui()
  const p0 = ui.var(new Point(636, 100))
  const p1 = ui.var(new Point(417, 291))
  const p2 = ui.var(new Point(800, 597))
  let arcToRadius = 88
  let activeDot: 'p0' | 'p1' | 'p2' | 'none' = 'none'

  viewer.onInput = ev => {
    if (ev.type === 'MOUSEDOWN') {
      activeDot = 'none'
      if (p0.value.inRadius(ev.pos, 15)) activeDot = 'p0'
      if (p1.value.inRadius(ev.pos, 15)) activeDot = 'p1'
      if (p2.value.inRadius(ev.pos, 15)) activeDot = 'p2'
    }

    if (ev.type === 'MOUSEMOVE' && ev.lbc)  {
      if (activeDot === 'p0') p0.value = p0.value.shiftSelf(ev.shift)
      if (activeDot === 'p1') p1.value = p1.value.shiftSelf(ev.shift)
      if (activeDot === 'p2') p2.value = p2.value.shiftSelf(ev.shift)
    }

    if (ev.type === 'MOUSEUP' || ev.type === 'MOUSELEAVE') {
      activeDot = 'none'
    }
  }

  viewer.onFrameChanged = frame => {
    frame.clear()
    new Sketch()
      .polygon({ stroke: '#999', lineDash: [3,5] }, [p0.value, p1.value, p2.value, p0.value])
      .arcTo({ stroke: '#ebebeb', lineWidth: 4 }, p0.value, p1.value, p2.value, arcToRadius)
      .circle({ fill: '#911' }, p0.value, 5)
      .circle({ fill: '#191' }, p1.value, 5)
      .circle({ fill: '#119' }, p2.value, 5)
    .draw(frame)
    displayFps(fps)
  }

  ui.group('Arc To', gr => gr
    .expand()
    .point(Icons.red_sq + ' P₀', p0)
    .point(Icons.green_sq + ' P₁', p1)
    .point(Icons.blue_sq + ' P₂', p2)
    .tracker('Radius', 0, 1200, 1, v => arcToRadius = v, arcToRadius)
  )

  return {
    ui: ui.build(),
    dispose () { 
      viewer.remove() 
    }
  }
}
