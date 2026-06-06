import { Point } from "smallgame"
import { Shape } from "../shapes"
import { removeItem } from "../../../../../games/old-tv/utils"

export class SelectedShapes {
  items: Shape[] = []

  constructor (private state: { shapes: Shape[] }) {

  }

  select (pos: Point, accumulate = false) {
    if (!accumulate) this.items = []
    for (let i = this.state.shapes.length - 1; i >= 0; i--) {
      const shape = this.state.shapes[i]
      if (shape.type === 'rectangle' && shape.rect.containsPoint(pos)) {
        if (this.items.some(p => p === shape)) {
          if (accumulate) {
            removeItem(this.items, p => p === shape)
          }
          continue
        }
        this.items.push(shape)
      }
    }
  }

  attachToSelected (shape: Shape, removeExist: boolean = false) {
    if (this.items.some(p => p === shape)) {
      if (removeExist) removeItem(this.items, p => p === shape)
      return
    }
    this.items.push(shape)
  }

  forEach (callback: (shape: Shape, index: number, array: Shape[]) => boolean | void) {
    for (let i = 0; i < this.items.length; i++){
      if (callback(this.items[i], i, this.items) === false) {
        break
      }
    }
    
  }
}