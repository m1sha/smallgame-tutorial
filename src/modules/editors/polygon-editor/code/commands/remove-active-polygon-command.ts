import type { EditorState } from "../editor-state";
import type { Polygon } from "../polygon";
import { Command } from "./command";

export class RemoveActivePolygonCommand extends Command {
  private activePolygon: Polygon | undefined = undefined

  commit(state: EditorState): void {
    this.activePolygon = state.polygons.activePolygon
    state.polygons.removeActivePolygon()
  }

  rollback(state: EditorState): void {
    if (!this.activePolygon) return
    state.polygons.add(this.activePolygon)
  }
}