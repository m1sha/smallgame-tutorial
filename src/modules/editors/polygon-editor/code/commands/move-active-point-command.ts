import { setPoint, type TPoint } from "smallgame"
import type { EditorState } from "../editor-state"
import { Command } from "./command"


export class MoveActivePointCommand extends Command {
  point: TPoint

  constructor (point: TPoint) {
    super()
    this.saveInHistory = false
    this.point = setPoint(point.x, point.y)
  }
  
  commit (state: EditorState): void {
    state.objects.changeMarkerPoint(this.point)
    state.emit('select', state.objects.currentObject)
  }

  rollback (state: EditorState): void {}
}