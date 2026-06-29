import { Viewer } from "../../../../shared"
import { displayFps } from "../../../../../utils/display-fps"
import { type ScriptSettings } from "../../../../../components/example"
import { VectorEditor } from "../../../../shared/vector-editor"
import data from "./data"
import { GMath, Point, Segment, Sketch, Time } from "smallgame"

export default async ({ container, containerSize, fps, builders, garbageCollect }: ScriptSettings): Promise<void> => {
  const telemetry = builders.telemetry()
  const arcsin = telemetry.def('BC/AB', 0, v => v + '°')
  const arcsos = telemetry.def('AC/AB', 0, v => v + '°')
  const viewer = new Viewer(containerSize, container, { disableContextMenu: true })
  const editor = new VectorEditor(viewer.surface)
  editor.useEditor(false)
  viewer.useInput(editor)
  
  const segments: Segment[] = []
  const cursor = new Point(800, 200)
  let simMode = false

  editor.onShapesChanged = shapes => {
    while (segments.pop());
    const shape = shapes[0]
    if (!shape || shape.type !== 'polygon') return
    for (let i = 1; i < shape.points.length ; i++) {
      segments.push(new Segment(shape.points[i-1], shape.points[i]))
    }
  }

  viewer.onInput = ev => {
    if (ev.type === 'MOUSEMOVE' && ev.lbc) {
      simMode = false
      cursor.shiftSelf(ev.shift)
    }
  }

  viewer.onFrameChanged = frame => {
    frame.clear()
    editor.draw(frame)
    displayFps(fps)

    if (simMode) {
      for (const segment of segments ) {
        const point = interpalateSegmentByX(segment, cursor)
        if (!point) continue
        if (point.y - cursor.y <= 0) break
        cursor.shiftYSelf(40 * Time.deltaTime)
      }
    }

    segments.forEach((segment) => {
      if (cursor.x < segment.start.x || cursor.x > segment.end.x) return
      const b = interpalateSegmentByX(segment, cursor)
      if (!b) return
      const a = segment.start.y > segment.end.y ? segment.start: segment.end
      const c = new Point(b.x, segment.start.y < segment.end.y ? segment.end.y: segment.start.y)
      arcsin.value = Math.asin(b.distance(c) / b.distance(a)) * GMath.deg
      arcsos.value = Math.asin(a.distance(c) / b.distance(a)) * GMath.deg 
      new Sketch()
        .line({ stroke: '#98a199', lineDash: [3, 5] }, cursor, b)
        .polygon({ fill: '#16b83f42' }, [a, b, c])
        .line({ stroke: '#3da813' }, segment.start, b)
        .line({ stroke: '#9ab816' }, b, segment.end)
        .circle({ fill: '#098a49' }, b, 3)
        .draw(frame)
    })

    new Sketch().circle({ fill: '#094b8a' }, cursor, 10).draw(frame)
  }

  const ui = builders.ui()
  ui.button('Simuplate Fall Down' , () => { simMode = true })
  editor.useBuilders(builders)
  editor.load(data)

  garbageCollect(() => viewer.remove())
}

export function interpalateSegmentByX(segmnet: Segment, p: Point): Point | null {
  const { start, end } = segmnet
  const minX = Math.min(start.x, end.x)
  const maxX = Math.max(start.x, end.x)

  if (p.x < minX || p.x > maxX) {
    return null
  }
    
  if (start.x === end.x) {
    const minY = Math.min(start.y, end.y)
    const maxY = Math.max(start.y, end.y)
    const yq = Math.min(Math.max(p.y, minY), maxY)
    return new Point(p.x, yq)
  }
    
  const t = (p.x - start.x) / (end.x - start.x)
  const yq = start.y + t * (end.y - start.y)
  return new Point(p.x, yq)
}

function projectPointOnLine (segmnet: Segment, point: Point) {
  const ab = segmnet.p1.shift(segmnet.p0.neg())
  const ap = point.shift(segmnet.p0.neg())
  const apabDot = ap.dot(ap)
  const abDot = ab.magnitudeSq
  if (abDot === 0) return segmnet.start
  const t =  Math.max(0, Math.min(1, apabDot / abDot))
  const p = segmnet.p0.shift(ab.scale(t))
  return p
}
