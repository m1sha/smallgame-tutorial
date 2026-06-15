import { Point } from "smallgame"
import { Shape } from "../shapes"
import { removeItem } from "../../../../../games/old-tv/utils"
import { Shapes } from "../shapes/shapes"

export class SelectedShapes {
  items: Shape[] = []

  onSelectedShapes: (() => void) | null = null

  constructor (private state: { shapes: Shapes }) {

  }

  get count () { return this.items.length }

  all () {
    return this.items
  }

  select (pos: Point, accumulate = false) {
    if (!accumulate) this.items = []
    for (let i = this.state.shapes.count - 1; i >= 0; i--) {
      const shape = this.state.shapes.items[i]
      if (shape.pointIn(pos)) {
        if (this.items.some(p => p === shape)) {
          if (accumulate) {
            removeItem(this.items, p => p === shape)
          }
          continue
        }
        this.items.push(shape)
      }
    }

    this.onSelectedShapes()
  }

  attachToSelected (shape: Shape, removeExist: boolean = false) {
    if (this.items.some(p => p === shape)) {
      if (removeExist) {
        removeItem(this.items, p => p === shape)
        this.onSelectedShapes()
      }
      return
    }
    this.items.push(shape)
    this.onSelectedShapes()
  }

  forEach (callback: (shape: Shape, index: number, array: Shape[]) => boolean | void) {
    for (let i = 0; i < this.items.length; i++){
      if (callback(this.items[i], i, this.items) === false) {
        break
      }
    }
    
  }

  delete (shape: Shape)  {
    removeItem(this.items, p => p === shape)
  }
}