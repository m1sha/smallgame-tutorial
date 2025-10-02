import type { TPoint } from "smallgame";
import type { EditorState } from "../editor-state";
import { Command } from "./command";
import { Polygon } from "../polygon";

export class CreatePolygonCommand extends Command {
  pos: TPoint
  polygon: Polygon

  constructor (pos: TPoint) {
    super()
    this.pos = pos
    this.polygon = new Polygon(this.pos)
  }
  
  commit(state: EditorState): void {
    state.polygons.add(this.polygon)
  }

  rollback(state: EditorState): void {
    state.polygons.removePolygon(this.polygon)
  }

}
