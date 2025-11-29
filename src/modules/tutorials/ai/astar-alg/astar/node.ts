export type TPoint2 = [number, number]

export class Node {
  G: number
  H: number
  F: number
  constructor(g: number, h: number, public current: TPoint2, public target: TPoint2, public parent: Node | null) {
    this.G = g
    this.H = h
    this.F = this.G + this.H
  }
}