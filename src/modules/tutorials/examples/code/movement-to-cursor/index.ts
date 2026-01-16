import { Viewer } from "../../../../shared"
import { displayFps } from "../../../../../utils/display-fps"
import { type ScriptModule, type ScriptSettings, UIBuilder } from "../../../../../components/example"
import { GMath, Point, Random, Rect, Sketch, Time, TPoint, TSize } from "smallgame"

export default async ({ container, width, height, fps }: ScriptSettings): Promise<ScriptModule> => {
  const viewer = new Viewer({ width, height }, container, { disableContextMenu: true })
  
  const rect = Rect.size(700, 700, { absCenter: viewer.viewportRect.center })
  //const tl = Rect.size(100, 100, { absCenter: rect.topLeft })

  const points = createPoints(80, rect)

  //let zoom = 1
  const step = 5
  let dir = 1
  const pos = Point.zero

  viewer.onInput = ev => {
    if (ev.type === 'MOUSEMOVE') {
      pos.moveSelf(ev.pos)
    }
    if (ev.type === 'WHEEL') {
      debugger
      dir = -Math.sign(ev.deltaY)
    //  points.forEach(point => point.moveSelf(GMath.moveTowards(ev.pos, point, Time.deltaTime)))
      points.forEach((point, i) => point.moveSelf(GMath.moveTowardsAccum(pos, point, step * dir )))
    }
    
  }


  viewer.onFrameChanged = surface => {
    //surface.clear()

    Sketch
      .new()
      //.rect({ fill: '#25e797d7' }, rect)
      .dots({ fill: '#254231' }, points, 4)
      .draw(surface)

    const s = Sketch.new()
    points.forEach(point => s.roundedrect({ stroke: '#72857c' }, Rect.fromCenter(point, 20, 20), 2))
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