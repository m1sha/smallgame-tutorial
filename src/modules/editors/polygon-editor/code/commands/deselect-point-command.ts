import type { EditorState } from "../editor-state";
import { Command } from "./command";

export class DeselectPointCommand extends Command {
  constructor () {
    super()
    this.saveInHistory = false
  }
  commit(state: EditorState): void {
    state.polygons.deselectActivePoint()
  }
  rollback(state: EditorState): void {
  
  }
}