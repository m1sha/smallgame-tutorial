import { Point, Sketch } from "smallgame";

export function createCrossSurface (w: number, h: number) {
  const sketch = new Sketch()
  sketch.line({ stroke: '#aaaaaa' }, new Point(0, h / 2), new Point(w, h / 2))
  sketch.line({ stroke: '#aaaaaa' }, new Point(w / 2, 0), new Point(w / 2, h))
  return sketch.toSurface(w, h)
}