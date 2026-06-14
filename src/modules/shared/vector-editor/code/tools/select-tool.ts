import { GameEvent } from "smallgame";
import { Tool } from "./tool";
import { VectorEditorTools } from "./tool-types";

export class SelectTool extends Tool {
  readonly name: VectorEditorTools = 'select'
  input (ev: GameEvent) {
    if (ev.type === 'MOUSEDOWN') {
      const pos = this.toLocalPoint(ev.pos)
      this.state.selectedShapes.select(pos, ev.ctrlKey)
    }
  } 
}