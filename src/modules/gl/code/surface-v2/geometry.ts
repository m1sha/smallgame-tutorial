import { Point, Sketch } from "smallgame"


function main () {
  const sketch = new Sketch()
  sketch.defineStyle('s1', { fill: '#333'})
  sketch.defineStyle('s0', { fill: '#638393'})
  sketch.defineStyle('s2', { stroke: '#333'})
  sketch.defineStyle('stroke2', { stroke: '#136393'})

  const a = new Point(200, 600)
  const b = new Point(500, 100)
  const p = new Point(560, 250)

  sketch.line('s2', a, b)
  sketch.circle('s1', p, 10)

  const q = buildNormal(p, a, b)
  const xx = b.diff(a).swapAxisSelf()
  const a0 = xx.negX()
  const b0 = xx.negY()
  

  sketch.line('s2', p, q)
  sketch.line('stroke2', a0, b0)
}

function segment (a: Point, b: Point, t: number): Point {
  return a.shift(b.diff(a).scale(t))
}

// function segment2 (p: Vector, a: Vector, b: Vector, t: number) {
//   const delta = b.inverse().sub(a.inverse())
//   const diff = p.inverse().sub(delta)

//   if (a.inverse().dot(diff) > 0) {
//     const dt = delta.length

//     if (t < dt) {
//       t /= dt
//     } else {
//       t = 1
//     }
//   } else {
//     t = 0
//   }

//   return { dis: delta.scale(t).sub(p).add(a).length, t }
// }

function buildNormal (p: Point, a: Point, b: Point) {
  const ab = b.diff(a)
  const ap = p.diff(a)
  const t = ap.dot(ab) / ab.magnitudeSq
  const q = ab.scaleSelf(t).shiftSelf(a)

  return q
}
