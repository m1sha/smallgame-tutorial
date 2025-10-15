import { TPoint } from "smallgame"
import type { EditorState } from "../editor-state"
import { Command } from "./command"

export class SelectPointCommand extends Command {
  constructor (private point: TPoint) {
    super()
    this.saveInHistory = false
  }

  commit(state: EditorState): void {
    state.objects.pickMarkerPoint(this.point)
  }
  
  rollback(_: EditorState): void {}

}