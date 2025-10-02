import type { EditorState } from "../editor-state"
import { Command } from "./command"

export class ZoomInCommand extends Command {
  async commit (state: EditorState) {
    state.screen.viewport.zoom  += 0.1
    if (state.screen.viewport.zoom > 5) 
      state.screen.viewport.zoom = 5
  }

  rollback (state: EditorState): void {
    if (state.screen.viewport.zoom > 1) 
      state.screen.viewport.zoom  -= 0.1
  }
}
