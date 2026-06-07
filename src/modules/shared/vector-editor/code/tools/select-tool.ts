import { GameEvent } from "smallgame";
import { Tool } from "./tool";
import { VectorEditorTools } from "./tool-types";

export class SelectTool extends Tool {
  readonly name: VectorEditorTools = 'select'
  input (ev: GameEvent) {
    if (ev.type === 'MOUSEDOWN') {
      this.state.selectedShapes.select(ev.pos, ev.ctrlKey)
    }
  } 
}