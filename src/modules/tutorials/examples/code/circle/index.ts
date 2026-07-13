import { GameEvent, GMath, MemSurface, Point, Segment, Size, Sketch, Surface } from "smallgame"
import { type ScriptSettings, Viewer, createPattern, displayFps } from "../../../core"

type Cursor = { name: string, seg: Segment, a: number }

class Cursors {
  private cursors: Cursor[]
  private cursor: Cursor | null
  constructor (readonly center: Point, readonly radius, segmentA: Segment, segmentB: Segment, segmentC: Segment) {
    this.cursors  = [
    {
      name: 'A',
      seg: segmentA,
      a: 0
    },
    {
      name: 'B',
      seg: segmentB,
      a: 30
    },
    {
      name: 'C',
      seg: segmentC,
      a: 90
    }
    ]
  }

  get segA () { return this.cursors[0].seg }
  get segB () { return this.cursors[1].seg }
  get segC () { return this.cursors[2].seg }

  get angleA () { return this.cursors[0].a }
  get angleB () { return this.cursors[1].a }
  get angleC () { return this.cursors[2].a }

  input (ev: GameEvent) {
    if (ev.type === 'MOUSEDOWN') {
      this.cursor = this.cursors.find(p => p.seg.end.inRadius(ev.pos, 15))
    }
    if (ev.type === 'MOUSEMOVE') {
      if (this.cursor && ev.lbc) {
        const a = 0 | (ev.pos.atan2(this.center) * GMath.deg)
        const angle = a < 0 ? 360 + a : a
        if (this.cursor.name === 'B') {
          console.log(`angleB: ${angle} angleC: ${this.angleC} angleA: ${this.angleA}`)

          const aB = angle > 180 ? angle - 360 : angle 
          const aA = this.angleA > 180 ? this.angleA - 360 : this.angleA
          const aC = this.angleC > 180 ? this.angleC - 360 : this.angleC

          if (aB > aC) return
          if (aB < aA) return
        }
        this.cursor.seg.end.moveSelf(this.center.rotate(a, this.radius))
        this.cursor.a = angle
        return true
      }
    }
    if (ev.type === 'MOUSEUP' || ev.type === 'MOUSELEAVE') {
      this.cursor = null
    }

    return false
  }
}

class Renderer {
  readonly surface: Surface
  radius = 250
  dotRadius = 5

  constructor (readonly size: Size, private cursors: Cursors, private segments: Segment[], private pattern: CanvasPattern) {
    this.surface = new MemSurface(size)
  }

  render () {
    this.surface.clear()
    this.surface.fill(this.pattern, new Point(0, 5))
    const center = this.surface.rect.center
    
    const sketch = Sketch.new()
    sketch
      //.polygon({ stroke: '#b6b6b6', lineDash: [7, 5] }, [...this.segments.map(s => s.end), this.segments[0].end])
      .circle({ stroke: '#ececec', lineDash: [7, 5] }, center, this.radius)
    
    sketch
      .pie({ stroke: '#46e7a4aa', lineWidth: 2, fill: '#46e7a425' }, center, this.radius / 2, this.cursors.segA.atan2(), this.cursors.segC.atan2())
      .pie({ stroke: '#29f0f7aa', lineWidth: 2, fill: '#29f0f725' }, center, this.radius / 3, this.cursors.segB.atan2(), this.cursors.segC.atan2())
      .pie({ stroke: '#f09b1daa', lineWidth: 2, fill: '#f09b1d25' }, center, this.radius / 3, this.cursors.segA.atan2(), this.cursors.segB.atan2())

    let i = 0
    for (const segment of this.segments) {
      sketch
        .line({ stroke: '#b6b6b6', lineDash: [10, 5] }, segment)
        .circle({ fill: '#868686' }, segment.end, this.dotRadius)
        .text({ color: '#aaa' }, ((360 / this.segments.length) * i).toFixed(), segment.extrapolateEnd(30).end, { pivote: 'center-center' })
        i++
    }

    sketch
        .line({ stroke: '#f37d7d', lineWidth: 2 }, this.cursors.segA)
        .circle({ fill: '#f37d7d' }, this.cursors.segA.end, this.dotRadius)
        .text({ color: '#f37d7d', fontSize: '18px' }, 'A ' + (this.cursors.angleA).toFixed(), this.cursors.segA.extrapolateEnd(60).end, { pivote: 'center-center' })
        
        .line({ stroke: '#7d7dfd', lineWidth: 2 }, this.cursors.segC)
        .circle({ fill: '#7d7dfd' }, this.cursors.segC.end, this.dotRadius)
        .text({ color: '#7d7dfd', fontSize: '18px' }, 'C ' + (this.cursors.angleC).toFixed(), this.cursors.segC.extrapolateEnd(60).end, { pivote: 'center-center' })

        .line({ stroke: '#7df37d', lineWidth: 2 }, this.cursors.segB)
        .circle({ fill: '#7df37d' }, this.cursors.segB.end, this.dotRadius)
        .text({ color: '#7df37d', fontSize: '18px' }, 'B ' + (this.cursors.angleB).toFixed(), this.cursors.segB.extrapolateEnd(60).end, { pivote: 'center-center' })

    sketch.circle({ fill: '#bbb' }, center, this.dotRadius)
    sketch.draw(this.surface)
  }
}

export default async ({ container, containerSize, fps, builders, garbageCollect, viewerControls }: ScriptSettings): Promise<void> => {
  const ui = builders.ui()
  const viewer = new Viewer(containerSize, container, { disableContextMenu: true, garbageCollect, viewerControls })
  const { pattern } = await createPattern('cross-dec-tex.bmp', 'repeat')
  const center = viewer.viewportRect.center
  const radius = 320
  const dotRadius = 5
  const segments: Segment[] = []
  let cursors: Cursors | null = null
  const n = ui.var(24)
  const createModel = () => {
    for (let i = 0; i < n.value; i++)
      segments.push(new Segment(center, center.rotate((360 / n.value) * i, radius)))

    cursors = new Cursors(
      center,
      radius,
      segments[0].dup(),
      segments[2].dup(),
      segments[6].dup(),
    )
  }
  createModel()

  const renderer = new Renderer(viewer.viewportRect.size, cursors, segments, pattern)
  let needRenderer = true
  
  viewer.onInput = ev => {
    needRenderer = cursors.input(ev)
  }
  
  viewer.onFrameChanged = frame => {
    if (needRenderer) {
      renderer.render()
      needRenderer = false
    }
    frame.clear()
    frame.blit(renderer.surface, renderer.surface.rect)
    displayFps(fps)
  }

  ui.tracker('Rays', 8, 24, 1, () => {
    createModel()
    needRenderer = true
  }, n)
}
