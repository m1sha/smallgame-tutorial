import { GameEvent } from "smallgame"
import { EditorState } from "../editor-state";

export class Tool {
  constructor (protected state: EditorState) {}
  /** @virtual */ input (_: GameEvent) {}
}