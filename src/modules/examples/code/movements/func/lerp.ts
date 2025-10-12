import { TPoint } from "smallgame"

export function lerp (p0: TPoint, p1: TPoint, t: number): TPoint {
  const l = (a: number, b: number) => a + (b - a) * t
  return {
    x: l(p0.x, p1.x),
    y: l(p0.y, p1.y),
  }
}