export class Node {
  G: number
  H: number
  F: number
  constructor(g: number, public current: [number, number], public target: [number, number], public parent: Node | null) {
    this.G = g
    this.H = Math.abs(target[0] - current[0]) + Math.abs(target[1] - current[1])
    this.F = this.G + this.H
  }
}