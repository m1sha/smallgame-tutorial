import { setPoint, type TPoint } from "smallgame"
import type { EditorState } from "../editor-state"
import { Command } from "./command"
import { Polygon } from "../objects"

export class MoveActivePolygonCommand extends Command {
  private point: TPoint

  constructor (point: TPoint) {
    super()
    this.saveInHistory = false
    this.point = setPoint(point.x, point.y)
  }

  commit(state: EditorState): void {
    const currentObject = state.objects.currentObject
    if (!currentObject) return

    if (currentObject instanceof Polygon) {
      currentObject.shiftPoints(this.point)
      state.emit('select', currentObject)
    }
  }

  rollback(state: EditorState): void {}
}