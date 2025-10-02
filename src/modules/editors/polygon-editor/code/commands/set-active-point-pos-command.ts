import type { TPoint } from "smallgame";
import type { EditorState } from "../editor-state";
import { Command } from "./command";

export class SetActivePointPosCommand extends Command {
  private src: TPoint
  private startPos: TPoint
  private endPos: TPoint

  constructor (src: TPoint, startPos: TPoint, endPos: TPoint) {
    super()
    this.src = src
    this.startPos = startPos
    this.endPos = endPos
  }
  
  commit(_: EditorState): void {
    this.src.x = this.endPos.x
    this.src.y = this.endPos.y
  }

  rollback(_: EditorState): void {
    this.src.x = this.startPos.x
    this.src.y = this.startPos.y
  }
}
