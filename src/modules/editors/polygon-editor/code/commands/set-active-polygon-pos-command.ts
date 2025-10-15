import type { TPoint } from "smallgame"
import type { EditorState } from "../editor-state"
import { Command } from "./command"
import { Polygon } from "../objects"

export class SetActivePolygonPosCommand extends Command {
  private startPos: TPoint[]
  private endPos: TPoint[]

  constructor ( startPos: TPoint[], endPos: TPoint[]) {
    super()
    this.startPos = startPos
    this.endPos = endPos
  }

  commit(state: EditorState): void {
    const currentObject = state.objects.currentObject
    if (!currentObject) return
    if (currentObject instanceof Polygon) {
      currentObject.setPoints(this.endPos)
    }
    

    state.emit('select', currentObject)
  }

  rollback(state: EditorState): void {
    const currentObject = state.objects.currentObject
    if (!currentObject) return
    if (currentObject instanceof Polygon) {
      currentObject.setPoints(this.startPos)
    }
  }
}