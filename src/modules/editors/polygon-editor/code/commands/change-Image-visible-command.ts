import type { EditorState } from "../editor-state";
import { Command } from "./command";

export class ChangeImageVisibleCommand extends Command {
  commit(state: EditorState): void {
    state.background.visible = !state.background.visible
  }
  rollback(state: EditorState): void {
    state.background.visible = !state.background.visible
  }

}