import type { EditorState } from "../editor-state";
import { Command } from "./command";

export class ChangeGridVisibleCommand extends Command {
  
  commit(state: EditorState): void {
    state.grid.visible = !state.grid.visible
  }

  rollback(state: EditorState): void {
    state.grid.visible = !state.grid.visible
  }

}