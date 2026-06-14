import { Point } from "smallgame"
import { Shape } from "./shape"
import { removeItem } from "smallgame/src/utils"

export class Shapes {
  items: Shape[] = []

  onShapesChanged:  (() => void) | null = null

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

  delete (shape: Shape) {
    removeItem(this.items, p => p === shape)
    this.onShapesChanged?.()
  }

  get count () { return this.items.length }

  add (shape: Shape) {
    this.items.push(shape)
    this.onShapesChanged?.()
  }
}