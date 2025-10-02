import { setPoint, type TPoint } from "smallgame";
import type { EditorState } from "../editor-state";
import { Command } from "./command";

export class MoveActivePointCommand extends Command {
  point: TPoint

  constructor (point: TPoint) {
    super()
    this.saveInHistory = false
    this.point = setPoint(point.x, point.y)
  }
  
  commit (state: EditorState): void {
    state.polygons.changeActivePointPos(this.point)
  }

  rollback (state: EditorState): void {}
}