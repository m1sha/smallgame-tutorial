import { EditorState } from "../../editor-state"
import { Command } from "../base"

export class CreatePolygonCommand extends Command {
  execute (state: EditorState): void {
    state.shapes.applyDrawingShape()
  }
  
  rollback (state: EditorState): void {

  }
}