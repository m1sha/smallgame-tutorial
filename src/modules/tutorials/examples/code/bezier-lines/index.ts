import { MouseButton, Point, Sketch, Splines, Time, TPoint } from "smallgame"
import { displayFps } from "../../../../../utils/display-fps"
import { type ScriptModule, type ScriptSettings } from "../../../../../components/example"
import { UIBuilder } from "../../../../../components/example/code/ui"
// import { easeInOutQuad, easeInQuad, easeOutBounce } from "../movements/func"
import { Viewer } from "../../../../shared"

type Segment = {
  a: Point
  b: Point
  cp1: Point
  cp2: Point
}

class BezierLine {
  segments: Segment[] = []

  firstSegemnt(a: Point, b: Point, cp1: Point, cp2: Point) {
    this.segments.push({ a, b, cp1, cp2 })
  }

  nextSegemnt(b: Point, cp1: Point, cp2: Point) {
    const a = this.segments[this.segments.length - 1].b
    this.segments.push({ a, b, cp1, cp2 })
  }

  movePoint (pos: TPoint, shift: TPoint) {
    for (const s of this.segments) {
      if (s.a.inRadius(pos, 20)) s.a.shiftSelf(shift)
      if (s.b.inRadius(pos, 20)) s.b.shiftSelf(shift)
      if (s.cp1.inRadius(pos, 20)) s.cp1.shiftSelf(shift)
      if (s.cp2.inRadius(pos, 20)) s.cp2.shiftSelf(shift)
    }
  }
}

export default async ({ container, width, height, fps }: ScriptSettings): Promise<ScriptModule> => {
  const viewer = new Viewer({ width, height}, container)
  const curve = new BezierLine()
  curve.firstSegemnt(new Point(400, 100), new Point(800, 400), new Point(500, 500), new Point(1300, 700))
  curve.nextSegemnt(new Point(1000, 800), new Point(1300, 100), new Point(900, 800))
  curve.nextSegemnt(new Point(600, 400), new Point(700, 200), new Point(300, 600))
  curve.nextSegemnt(new Point(400, 200), new Point(300, 200), new Point(300, 100))
  curve.nextSegemnt(new Point(900, 800), new Point(1200, 200), new Point(1000, 800))
  curve.nextSegemnt(new Point(400, 100), new Point(1100, 500), new Point(1000, 700))

  viewer.onInput = ev => {
    if (ev.type === 'MOUSEMOVE' && ev.button === MouseButton.LEFT) {
      curve.movePoint(ev.pos, ev.shift)
    }
  }
  
  let t = 0
  viewer.onFrameChanged = (surface => {
    const ind = 0 | t
    const seg = curve.segments[ind]
    const c = Splines.cubicBezier(seg.a, seg.b, seg.cp1, seg.cp2, (t - ind))
    
    if (t < curve.segments.length) {
      t += 0.4 * Time.deltaTime
    } else {
      
    }

    if (t >= curve.segments.length) t = 0

    surface.clear()

    for (const seg of curve.segments) {
      Sketch.new()
       .cubicBezier({ stroke: '#6b6c70ff', lineWidth: 4 }, seg.a, seg.b, seg.cp1, seg.cp2)
       .circle({ fill: '#834009ff' }, seg.a, 6)
       .circle({ fill: '#834009ff' }, seg.b, 6)
       .circle({ fill: '#70758aff' }, seg.cp1, 5)
       .circle({ fill: '#70758aff' }, seg.cp2, 5)
       .circle({ fill: '#20745fff' }, c, 20)
      .draw(surface)
    }

    // Sketch.new()
    //   .cubicBezier({ stroke: '#07294bff', lineWidth: 4 }, a, b, cp1, cp2)
    //   .cubicBezier({ stroke: '#07294bff', lineWidth: 4 }, b, b2, cp21, cp22)
    //   ///.circle({ fill: '#834009ff' }, a, 10)
    //   .circle({ fill: '#076b31ff' }, b, 10)
    //   ///.circle({ fill: '#122b9cff' }, cp1, 10)
    //   ///.circle({ fill: '#122b9cff' }, cp2, 10)
    //   .circle({ fill: '#20745fff' }, c, 20)
    //   .draw(screen.surface)
    displayFps(fps)
  })

  const ui = new UIBuilder()
  ui.button('Restart', () => t = 0)
  return {
    ui: ui.build(),
    dispose () { 
      viewer.remove() 
    }
  }
}
