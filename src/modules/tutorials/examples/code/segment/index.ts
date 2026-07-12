import { MemSurface, Point, Segment, Sketch } from "smallgame"
import { PointsMovementHandler, type ScriptSettings, Viewer, displayFps } from "../../../core"

export default async ({ container, containerSize, fps, builders, garbageCollect, viewerControls }: ScriptSettings): Promise<void> => {
  const viewer = new Viewer(containerSize, container, { disableContextMenu: true, garbageCollect, viewerControls })
  const ui = builders.ui()
  const showTri = ui.var(true)
  const a = new Point(600, 200)
  const b = new Point(800, 300)
  const c = new Point(700, 400)
  const d = new Point(1200, 400)
  const segment = new Segment(a, b)
  const segment2 = new Segment(c, d)
  const surface = new MemSurface(containerSize)
  const render = () => {
    surface.clear()
    const sketch = Sketch.new()
    const ray = segment.ray(segment2)
    const intersect = ['intersect', 'start-reached', 'end-reached'].includes(ray.intersect)

    sketch
      .line({ stroke: '#999' }, segment)
      .line({ stroke: intersect ? '#31da56' : '#999' }, segment2)
      .circle({ fill: '#aaa' }, segment.start, 5)
      .circle({ fill: '#aaa' }, segment.end, 5)
      .circle({ fill: intersect ? '#31da56' : '#aaa' }, segment2.start, 5)
      .circle({ fill: intersect ? '#31da56' : '#aaa' }, segment2.end, 5)
      .text({ color: '#ccc', fontSize: '22px' }, 'A', segment.extrapolateStart(30).start, { pivote: 'center-center' })
      .text({ color: '#ccc', fontSize: '22px' }, 'B', segment.extrapolateEnd(30).end, { pivote: 'center-center' } )
      .text({ color: '#ccc', fontSize: '22px' }, 'C', segment2.extrapolateStart(30).start, { pivote: 'center-center' })
      .text({ color: '#ccc', fontSize: '22px' }, 'D', segment2.extrapolateEnd(30).end, { pivote: 'center-center' } )
   
    if (ray.point) {
      const epDistance = segment.end.distance(ray.point)
      const spDistance = segment.start.distance(ray.point)
      const min = epDistance < spDistance ? segment.end : segment.start
      const max = epDistance < spDistance ? segment.start : segment.end
      
      if (showTri.value) 
        sketch
        .line({ stroke: intersect ? '#b4b4b4' : 'transparent', lineDash: [8, 5] }, segment2.start, max)
        .line({ stroke: intersect ? '#b4b4b4' : 'transparent', lineDash: [8, 5] }, segment2.end, max)
      
      sketch.line({ stroke: '#f13e1e', lineDash: [8, 4] }, min, ray.point)
      sketch.circle({ fill: '#f13e1e' }, ray.point, 5)
    }
      
    sketch.draw(surface)
  }
  viewer.useInput(new PointsMovementHandler([a, b, c, d], 15, render))

  render()
  viewer.onFrameChanged = frame => {
    frame.clear()
    frame.blit(surface, surface.rect)
    displayFps(fps)
  }

  ui.switch('Show Triangle', render, showTri)
}
