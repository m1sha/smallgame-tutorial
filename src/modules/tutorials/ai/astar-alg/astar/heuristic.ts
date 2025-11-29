import { TPoint2 } from "./node"

export function manhattanHeuristic(a: TPoint2, b: TPoint2): number {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}


export function euclideanHeuristic(a: TPoint2, b: TPoint2): number {
  const dx = a[0] - b[0];
  const dy = a[1] - b[1];
  return Math.sqrt(dx * dx + dy * dy);
}


export function octileHeuristic(a: TPoint2, b: TPoint2): number {
  const dx = Math.abs(a[0] - b[0]);
  const dy = Math.abs(a[1] - b[1]);
  const f = Math.SQRT2 - 1;
  return (dx < dy) ? f * dx + dy : f * dy + dx;
}