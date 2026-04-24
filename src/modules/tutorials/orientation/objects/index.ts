import { Magnifier, Viewer } from "../../../shared"
import { displayFps } from "../../../../utils/display-fps"
import { type ScriptModule, type ScriptSettings } from "../../../../components/example"
import { Point, setPoint, Sketch } from "smallgame"

interface ICircle { x: number, y: number, r: number, c: string }

export default async ({ container, containerSize, fps, builders, viewerControls }: ScriptSettings): Promise<ScriptModule> => {
  const magnifier = new Magnifier()
  const viewer = new Viewer(containerSize, container, { disableContextMenu: true, viewerControls })

  //viewerControls.background = viewer.ui.background.solid('#991141')
  //viewerControls.updateChanges()


  const objects: ICircle[] = [
    { x: 10, y: 10, r: 20, c: '#188991' },
    { x: 310, y: 410, r: 30, c: '#2b2a6b' },
    { x: -110, y: 110, r: 30, c: '#791668' },
    { x: 410, y: 410, r: 30, c: '#17a31e' },
    { x: 1310, y: 410, r: 30, c: '#98a716' },
  ]

  viewer.onInput = ev => {
    if (ev.type === 'MOUSEMOVE' && ev.lbc) {
      viewer.viewport.panBy(ev.shift.scaleSelf(1 / magnifier.zoom))
    }

    if (ev.type === 'WHEEL') {
      magnifier.byDelta(ev.deltaY)
      //viewer.viewport.zoomTo(magnifier.zoom, ev.pos)
    }
  }
  

  viewer.onFrameChanged = surface => {
    surface.clear()

    const s = Sketch.new()

    for (const obj of objects) {
      const { x, y, r, c } = obj
      const center = new Point(x, y).shiftSelf(viewer.viewport.offset).scaleSelf(magnifier.zoom)
      const radius = r * magnifier.zoom
      s.circle({ fill: c }, center, radius)
    }

    s.draw(surface)

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
