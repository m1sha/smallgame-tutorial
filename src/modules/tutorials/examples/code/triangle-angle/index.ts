import { GMath, Point, Segment, Sketch } from "smallgame"
import { type ScriptSettings, Viewer, displayFps, PointsMovementHandler } from "../../../core"

export default async ({ container, containerSize, fps, builders, garbageCollect }: ScriptSettings): Promise<void> => {
  const viewer = new Viewer(containerSize, container, { disableContextMenu: true, garbageCollect })
  const ui = builders.ui()
  const showNorm = ui.var(false)
  const showHeight = ui.var(false)
  const showMedian = ui.var(false)
  const showBisector = ui.var(true)
  ui.switch('Show Normals', () => {}, showNorm)
  ui.switch('Show Heights', () => {}, showHeight)
  ui.switch('Show Medians', () => {}, showMedian)
  ui.switch('Show Bisectors', () => {}, showBisector)

  const a = new Point(700, 300)
  const b = new Point(700, 700)
  const c = new Point(1400, 300)
  const points = [a, b, c]
  const segA = new Segment(a, b)
  const segB = new Segment(b, c)
  const segC = new Segment(c, a)

  const an = builders.telemetry().def('a', 0)
  const an1 = builders.telemetry().def('a1 Blue', 0)
  const an2 = builders.telemetry().def('a2 Green', 0)

  const movementHandler = new PointsMovementHandler(points)
  viewer.useInput(movementHandler)

  viewer.onFrameChanged = frame => {
    frame.clear()

    const a1 = b.atan2(a)
    const a2 = c.atan2(a)
    const max = Math.max(a1, a2)
    const min = Math.min(a1, a2)

    an.value = (max - min)  * GMath.deg
    an1.value = a1 * GMath.deg
    an2.value = a2 * GMath.deg

    const midAngle = ((max - min) / 2 + min) * GMath.deg
    const bisP = a.rotate(midAngle , 1)

    const tp = a.rotate(an.value + (90 - min), 50)
    const medianA = new Segment(c.shift(b).scale(0.5), a)
    const medianB = new Segment(c.shift(a).scale(0.5), b)
    const medianC= new Segment(a.shift(b).scale(0.5), c)
    const heightA = new Segment(new Segment(b, c).getPointOnSegment(a, 1000) ?? Point.zero, a)
    const heightB = new Segment(new Segment(b, a).getPointOnSegment(c, 1000) ?? Point.zero, c)
    const heightC = new Segment(new Segment(c, a).getPointOnSegment(b, 1000) ?? Point.zero, b)
    const bisA =new Segment(projectPointOnLine(segB, bisP), bisP) //new Segment(bisP, a) // segA.bisector('start', bisP) //new Segment(bisP, a)

    const sketch = new Sketch()
      .line({ stroke: '#fff' }, segA)
      .line({ stroke: '#fff', lineDash: [3, 5] }, segB)
      .line({ stroke: '#fff' }, segC)
    if (showMedian.value)
      sketch.line({ stroke: '#ab8b8b', lineDash: [1, 3, 7] }, medianA)
      .line({ stroke: '#8bab8b', lineDash: [1, 3, 7] }, medianB)
      .line({ stroke: '#8b8bcb', lineDash: [1, 3, 7] }, medianC)
    if (showHeight.value) 
      sketch
        .line({ stroke: '#8a2e24', lineDash: [7, 5], lineWidth: 2 }, heightA)
        .line({ stroke: '#2a8e24', lineDash: [7, 5], lineWidth: 2 }, heightB)
        .line({ stroke: '#2a2e84', lineDash: [7, 5], lineWidth: 2 }, heightC)
    if (showBisector.value) 
      sketch.line({ stroke: '#da421c', lineDash: [2, 1, 3] }, bisA)
    if (showNorm.value) 
      sketch.line({ stroke: '#a0707058' }, segA.normals()[0])
      .line({ stroke: '#70a07058' }, segB.normals()[0])
      .line({ stroke: '#7070b058' }, segC.normals()[0])
      .line({ stroke: '#907070' }, segA.normals()[1])
      .line({ stroke: '#709070' }, segB.normals()[1])
      .line({ stroke: '#707090' }, segC.normals()[1])
    
      sketch
      .pie({ stroke: '#dadada', fill: '#dadada40', lineWidth: 2 }, a, 30, min, max)
      .pie({ stroke: '#dadada', lineWidth: 2 }, a, 20, min, max)
      .circle({ fill: '#911'}, a, 5)
      .circle({ fill: '#191'}, b, 5)
      .circle({ fill: '#11b'}, c, 5)
      
      
      .text({ color: '#aaa' }, an.value.toFixed(0), a.rotate(midAngle, 50))

      .text({ color: '#aaa', fontSize: '34px' }, 'A', segA.extrapolateStart(50).start)
      .text({ color: '#aaa', fontSize: '34px' }, 'B', segB.extrapolateStart(50).start)
      .text({ color: '#aaa', fontSize: '34px' }, 'C', segC.extrapolateStart(50).start)
    
    sketch.draw(frame)
    displayFps(fps)
  }
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

