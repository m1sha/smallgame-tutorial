import { Point, setPoint, Sketch, Splines, TPoint } from "smallgame"
import { displayFps } from "../../../../../utils/display-fps"
import { type ScriptModule, type ScriptSettings } from "../../../../../components/example"
import { UIBuilder } from "../../../../../components/example/code/ui"
import { Viewer } from "../../../../shared"
import { ContextMenuBuilder } from "../../../../../components/example/code/context-menu"
import { TelemetryBuilder } from "../../../../../components/example/code/telemetry"

class SmoothFunc {
  funcName = 'Chaikin'
  sigma = 1
  tension = 1
  samplesPerSegment = 2
  samples: number = 2
  degree = 3
  alpha = 0.25
  k = 1

  calc (points: TPoint[]): TPoint[] {
    if (this.funcName === 'Chaikin') return Splines.chaikin(points, this.k, this.alpha)
    if (this.funcName === 'CatmullRom') return Splines.catmullRom(points, this.samplesPerSegment, this.tension)
    if (this.funcName === 'B-Spline') return Splines.bspline(points, this.samples, this.degree)
    if (this.funcName === 'Gaussian Smooth') return Splines.gaussianSmooth(points, this.sigma)
    return []
  }
}

class Path {
  points: TPoint[] = []
  smoothPoints: TPoint[] = []
  constructor (private func: SmoothFunc) {}
  addSegment (point: TPoint) {
    this.points.push(point)
  }

  deleteSegment() {
    this.points.pop()
  }

  setSmooth () {
    this.smoothPoints = this.func.calc(this.points)
    this.smoothPoints.pop()
  }

  cleanSmoothPoint () {
    this.smoothPoints = []
  }
}

export default async ({ container, width, height, fps }: ScriptSettings): Promise<ScriptModule> => {
  const telemetry = new TelemetryBuilder()
  const contextMenu = new ContextMenuBuilder()
  const viewer = new Viewer({ width, height }, container, { disableContextMenu: true })
  const func = new SmoothFunc()
  const path = new Path(func)

  const cursorPos = telemetry.def('Cursor', Point.zero)
  
  //viewer.onContextMenuClick = pos => contextMenu.open(pos)
  viewer.onInput = ev => {
    if (ev.type === 'MOUSEMOVE') {
      cursorPos.value = Point.from(ev.pos)
    }
    if (ev.type === 'MOUSEDOWN') {
      for (const point of path.points) {
        if (Point.from(point).inRadius(ev.pos, 8)) {
          contextMenu.open(ev.pos)
          return
        }
      }
    }
    if (ev.type === 'MOUSEDOWN') {
      if (ev.lbc && !ev.cmdKey) path.addSegment(ev.pos)
      if (ev.rbc && !ev.cmdKey) path.deleteSegment()
    }
  }

  viewer.onFrameChanged = surface => {
    surface.clear()
    Sketch
      .new()
      .polygon({ stroke: '#1f704aff', lineWidth: 3 }, path.points)
      .polygon({ stroke: '#d68711ff', lineWidth: 2 }, path.smoothPoints)
      .dots({ stroke: '#1f704aff', fill: '#05cc6fff' }, path.points, 5)
      .dots({ stroke: '#d68711ff', fill: '#bbd1c7ff' }, path.smoothPoints, 4)
      .draw(surface)
    displayFps(fps)
  }
 
  const ui = new UIBuilder()
  const panels: Map<string, { hidden: boolean }> = new Map()
  ui.select('Smooth method', ['Chaikin', 'CatmullRom', 'B-Spline', 'Gaussian Smooth'], val => { 
    [...panels.values()].forEach(p => p.hidden = true)
    panels.get(val).hidden = false
    func.funcName = val
  }, 'Chaikin')
  panels.set('Chaikin', ui.panel(panel => panel
    .tracker('k', 1, 6, 1, val => func.k = val, func.k)
    .tracker('alpha', 0, 1, 0.05, val => func.alpha = val, func.alpha)
  ))
  panels.set('CatmullRom', ui.panel(panel => panel
    .tracker('samplesPerSegment', 1, 6, 1, val => func.samplesPerSegment = val, func.samplesPerSegment)
    .tracker('tension', -1, 1, 0.1, val => func.tension = val, func.tension)
    .hide()
  ))
  panels.set('B-Spline', ui.panel(panel => panel
    .tracker('samples', 1, 6, 1, val => func.samples = val, func.samples)
    .tracker('degree', 1, 6, 1, val => func.degree = val, func.degree)
    .hide()
  ))
  panels.set('Gaussian Smooth', ui.panel(panel => panel
    .tracker('sigma', 0.1, 6, 0.1, val => func.sigma = val, func.sigma)
    .hide()
  ))
  ui.button('Smooth Line', () => path.setSmooth())
  ui.button('Remove Smooth', () => path.cleanSmoothPoint())
  ui.info('Use Mouse for draw line. LBC start new segment. RBC to delete the last line segment.')

  contextMenu.addItem('Item 1', () => alert('Hello 1'))
  contextMenu.addItem('Item 2', () => alert('Hello 2'))
  contextMenu.addItem('Item 3', () => alert('Hello 3'))
  
  return {
    ui: ui.build(),
    telemetry: telemetry.build(),
    contextMenu: contextMenu.build(),
    dispose () { 
      viewer.remove() 
    }
  }
}
