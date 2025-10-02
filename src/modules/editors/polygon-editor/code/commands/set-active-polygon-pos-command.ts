import type { TPoint } from "smallgame";
import type { EditorState } from "../editor-state";
import { Command } from "./command";

export class SetActivePolygonPosCommand extends Command {
  private startPos: TPoint[]
  private endPos: TPoint[]

  constructor ( startPos: TPoint[], endPos: TPoint[]) {
    super()
    this.startPos = startPos
    this.endPos = endPos
  }

  commit(state: EditorState): void {
    if (!state.polygons.activePolygon) return
    state.polygons.activePolygon.setPoints(this.endPos)
  }

  rollback(state: EditorState): void {
    if (!state.polygons.activePolygon) return
    state.polygons.activePolygon.setPoints(this.startPos)
  }
}