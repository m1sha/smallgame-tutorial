
import type { EditorState } from "../editor-state";
import type { Polygon } from "../objects/polygons/polygon";
import { Command } from "./command";

export class SelectPolygonCommand extends Command {
  polygon: Polygon

  constructor (polygon: Polygon) {
    super()
    this.polygon = polygon
  }
  
  commit(state: EditorState): void {
    state.polygons.selectPolygon(this.polygon)
    state.onObjectChanged?.('selectd', this.polygon)
    state.onObjectedSelected?.(this.polygon)
  }

  rollback(state: EditorState): void {
    
  }

}