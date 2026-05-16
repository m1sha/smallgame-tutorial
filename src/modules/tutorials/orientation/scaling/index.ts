import { Magnifier, Viewer } from "../../../shared"
import { displayFps } from "../../../../utils/display-fps"
import { type ScriptModule, type ScriptSettings } from "../../../../components/example"
import { GMath, Point, Rect, Sketch } from "smallgame"

type TDot = { center: Point, radius: number }

export default async ({ container, containerSize, fps, builders, viewerControls }: ScriptSettings): Promise<ScriptModule> => {
  const viewer = new Viewer(containerSize, container, { disableContextMenu: true, viewerControls })
  const ui = builders.ui()
  const scrCenter = containerSize.toPoint().scaleSelf(0.5)

  const magnifier = new Magnifier()
  const zoom = ui.var(1)
  const prevZoom = ui.var(1)
  const offset = ui.var(Point.zero)
  const mouse = ui.var(Point.zero)

  const dots: TDot[] = [
    { center: scrCenter.shiftX(-300), radius: 10 },
    { center: scrCenter.shiftY(-200), radius: 10 },
    { center: scrCenter.shiftX(-100), radius: 10 },
    { center: scrCenter.shiftY(-100), radius: 10 },
    { center: scrCenter.shiftX(300), radius: 10 },
    { center: scrCenter.shiftX(100), radius: 10 },
    { center: scrCenter.shiftY(300), radius: 10 },
    { center: scrCenter.shiftY(200), radius: 10 },
    { center: new Point(400, 300), radius: 10 },
  ]

  viewer.onInput = ev => {
    if (ev.type === 'MOUSEMOVE' && ev.lbc) {
      offset.value = offset.value.shift(ev.shift)
    }

    if (ev.type === 'WHEEL') {
      mouse.value = ev.pos//.scale(magnifier.zoom)
      magnifier.byDelta(ev.deltaY)
      prevZoom.value = zoom.value
      zoom.value = parseFloat(magnifier.zoom.toFixed(2))
      
    }
  }

  viewer.onFrameChanged = surface => {
    surface.clear()

    const newDots: TDot[] = []
    dots.forEach(dot => {
      const target = mouse.value.scale(1 / prevZoom.value)
      newDots.push({ 
        center: dot.center.shift(target.neg()).scale(zoom.value).shift(mouse.value).shift(offset.value), 
        radius: dot.radius * zoom.value 
      })
    })

    const minX = GMath.minX(newDots.map(p => p.center.shift(-p.radius)))
    const minY = GMath.minY(newDots.map(p => p.center.shift(-p.radius)))
    const maxX = GMath.maxX(newDots.map(p => p.center.shift(p.radius)))
    const maxY = GMath.maxY(newDots.map(p => p.center.shift(p.radius)))

    const sketch = Sketch.new()
    sketch.rect({ stroke: '#005188',  lineWidth: 3 }, new Rect(minX, minY, maxX - minX, maxY - minY))

    newDots.forEach(dot => sketch.circle({ fill: 'white' }, dot.center, dot.radius ))
    sketch.draw(surface)
    displayFps(fps)
  }

  ui.tracker('zoom', 0.125, 4, 0.05, undefined, zoom)
  
  return {
    ui: ui.build(),
    dispose () { 
      viewer.remove() 
    }
  }
}
