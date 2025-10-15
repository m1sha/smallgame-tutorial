import type { EditorState } from "../editor-state";
import { Command } from "./command";

export class CreateFundamentalPointCommand extends Command {
  commit(state: EditorState): void {
    if (!state.polygons.activePolygon) return
    
    state.polygons.activePolygon.convertToFund()
    state.emit('select', state.polygons.activePolygon)
  }
  rollback(state: EditorState): void {
    
  }
}