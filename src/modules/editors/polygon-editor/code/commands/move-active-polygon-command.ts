import { setPoint, type TPoint } from "smallgame"
import type { EditorState } from "../editor-state"
import { Command } from "./command"

export class MoveActivePolygonCommand extends Command {
  private point: TPoint

  constructor (point: TPoint) {
    super()
    this.saveInHistory = false
    this.point = setPoint(point.x, point.y)
  }

  commit(state: EditorState): void {
    if (!state.polygons.activePolygon) return
    state.polygons.activePolygon.shiftPoints(this.point)
  }

  rollback(state: EditorState): void {}
}