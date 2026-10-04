import { BoundingBox } from "./helpers"

export class Box implements BoundingBox {
  x: number
  y: number
  width: number
  height: number
  selected: boolean

  constructor (box: BoundingBox) {
    this.x = box.x
    this.y = box.y
    this.width = box.width
    this.height = box.height
    this.selected = false
  }
}

export type SpriteAtlasEditPanelData = {
  boxes: Box[]
  editor: {
    mode: 'detection' | 'edit-rect' | 'move-sprite' | 'export'
  },
  detection: {
    alphaThreshold: number
    connectivity: number
    minSize: number
    threshold: number
  }
}