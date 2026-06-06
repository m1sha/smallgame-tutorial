import { GameEvent } from "smallgame";
import { Tool } from "./tool";

export class SelectTool extends Tool {
  input (ev: GameEvent) {
    if (ev.type === 'MOUSEDOWN') {
      this.state.selectedShapes.select(ev.pos, ev.ctrlKey)
    }
  } 
}