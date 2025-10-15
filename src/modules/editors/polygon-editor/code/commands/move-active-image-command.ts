import { setPoint, type TPoint } from "smallgame"
import type { EditorState } from "../editor-state"
import { Command } from "./command"
import { ImageObject } from "../objects"

export class MoveActiveImageCommand extends Command {
  private point: TPoint

  constructor (point: TPoint) {
    super()
    this.saveInHistory = false
    this.point = setPoint(point.x, point.y)
  }

  commit(state: EditorState): void {
    const currentObject = state.objects.currentObject
    if (!currentObject) return

    if (currentObject instanceof ImageObject) {
      currentObject.shift(this.point)
    }
  }

  rollback(state: EditorState): void {}
}