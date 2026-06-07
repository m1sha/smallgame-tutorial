import { Point } from "smallgame"
import { Shape } from "./shape"

export class Shapes {
  items: Shape[] = []

  getByHittest (pos: Point, onlyOne: boolean = false): Shape[] {
    const result = []
    for (let i = this.items.length - 1; i >= 0; i--) {
      const shape = this.items[i]
      if (shape.type === 'rectangle') {
        if (shape.rect.containsPoint(pos)) {
          result.push(shape)
          if (onlyOne) break
        }
      }
    }
    return result
  }

  get count () { return this.items.length }

  add (shape: Shape) {
    this.items.push(shape)
  }
}