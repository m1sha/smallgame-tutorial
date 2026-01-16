import { Viewer } from "../../../../shared"
import { displayFps } from "../../../../../utils/display-fps"
import { type ScriptModule, type ScriptSettings, UIBuilder } from "../../../../../components/example"
import { Point, Random, Rect, Sketch, TPoint, TSize } from "smallgame"

export default async ({ container, width, height, fps }: ScriptSettings): Promise<ScriptModule> => {
  const viewer = new Viewer({ width, height }, container, { disableContextMenu: true })
  
  const rect = Rect.size(1600, 1600, { absCenter: viewer.viewportRect.center })
  //const tl = Rect.size(100, 100, { absCenter: rect.topLeft })

  const points = createPoints(80, rect)

  let zoom = 1

  viewer.onInput = ev => {
    if (ev.type === 'WHEEL') {
      debugger
      zoom += -Math.sign(ev.deltaY) * 0.1
      //if (zoom === 0) zoom = 0.1 * Math.sign(ev.deltaY)

     
      const xxx = (point: TPoint) =>  new DOMMatrix()
      //.translate(-ev.pos.x, -ev.pos.y)
      .scale(zoom, zoom)
      //.translate(ev.pos.x, ev.pos.y)
      .transformPoint(point)

      points.forEach(point => point.moveSelf(xxx(point)))
    }
    
  }


  viewer.onFrameChanged = surface => {
    surface.clear()

    Sketch
      .new()
      .rect({ fill: '#252257c9' }, rect)
      .dots({ fill: '#2f6e39' }, points, 4)
      .draw(surface)

    const s = Sketch.new()
    points.forEach(point => s.roundedrect({ stroke: '#5a775e' }, Rect.fromCenter(point, 20, 20), 2))
    s.draw(surface)

    displayFps(fps)
  }

  const ui = new UIBuilder()
  return {
    ui: ui.build(),
    dispose () { 
      viewer.remove() 
    }
  }
}


function createPoints (count: number, placeRect: Rect) {
  const points: Point[] = []
  for (let i = 0; i < count - 1; i++) {
    const x = Random.betweeni(placeRect.x, placeRect.width)
    const y = Random.betweeni(placeRect.y, placeRect.height)
    points.push(new Point(x, y))
  }
  return points
}