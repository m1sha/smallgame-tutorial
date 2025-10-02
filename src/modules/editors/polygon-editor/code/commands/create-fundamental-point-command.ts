import type { EditorState } from "../editor-state";
import { Command } from "./command";

export class CreateFundamentalPointCommand extends Command {
  commit(state: EditorState): void {
    if (state.polygons.activePolygon)
      state.polygons.activePolygon.convertToFund()
  }
  rollback(state: EditorState): void {
    
  }
}