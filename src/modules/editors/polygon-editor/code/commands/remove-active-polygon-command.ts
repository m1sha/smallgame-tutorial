import type { EditorState } from "../editor-state";
import type { Polygon } from "../objects/polygons/polygon";
import { Command } from "./command";

export class RemoveActivePolygonCommand extends Command {
  private activePolygon: Polygon | undefined = undefined

  commit(state: EditorState): void {
    this.activePolygon = state.objects.currentObject as Polygon
    state.objects.remove(this.activePolygon)
  }

  rollback(state: EditorState): void {
    if (!this.activePolygon) return
    state.objects.add(this.activePolygon)
  }
}