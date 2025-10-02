import type { EditorState } from "../editor-state";
import { Command } from "./command";

export class SelectPointCommand extends Command {
  constructor () {
    super()
    this.saveInHistory = false
  }

  commit(state: EditorState): void {
    state.polygons.selectPoint()
  }
  
  rollback(_: EditorState): void {}

}