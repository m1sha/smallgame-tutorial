import type { EditorState } from "../editor-state"
import { Polygon } from "../objects"
import { Command } from "./command"

export class CreateFundamentalPointCommand extends Command {
  commit(state: EditorState): void {
    const curr = state.objects.currentObject
    if (!curr || !(curr instanceof Polygon)) return
    
    curr.convertToFund()
    state.emit('select', curr)
  }
  rollback(state: EditorState): void {
    
  }
}