import { GameEvent, Keys, Point } from "smallgame"
import { EditorState } from "../editor-state";
import { VectorEditorTools } from "./tool-types";

export abstract class Tool {
  abstract readonly name: VectorEditorTools
  constructor (protected state: EditorState) {}
  /** @virtual */ input (_: GameEvent) {}
  /** @virtual */ keyPressed (_: Keys): boolean | void  {}

  protected toLocalPoint (point: Point) {
    return point.shift(this.state.offset.neg())
  }
}