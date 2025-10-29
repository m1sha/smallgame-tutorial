import { setPoint, Point, type TPoint } from "smallgame"
import type { EditorState } from "../editor-state"
import { Command } from "./command"
import { BaseObject } from "../objects"


export class MoveObjectCommand extends Command {
  private point: TPoint
  private startPoint: Point | null = null
  private obj: BaseObject | null = null
  useMerge = true

  constructor (point: TPoint, private finished: boolean = false) {
    super()
    
    this.point = setPoint(point.x, point.y)
  }

  commit (state: EditorState): void {
    const currentObject = state.objects.currentObject
    if (!currentObject) return

    this.obj = currentObject
    currentObject.shift(this.point)
    state.emit('select', currentObject)

    if (!this.startPoint) {
      this.startPoint = new Point(this.point.x, this.point.y)
    }
  }

  merge (command: MoveObjectCommand): void {
    this.point = setPoint(command.point.x, command.point.y)
    if (this.obj) this.obj.shift(this.point)
    if (this.startPoint) this.startPoint.shiftSelf(this.point)
    
    if (command.finished) this.useMerge = false
  }

  rollback (state: EditorState): void {
    if (!this.obj || !this.startPoint) return
    this.obj.shift(this.startPoint.neg())
    state.emit('select', this.obj)
  }
}