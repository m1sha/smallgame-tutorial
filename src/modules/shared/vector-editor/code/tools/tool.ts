import { GameEvent } from "smallgame"
import { EditorState } from "../editor-state";
import { VectorEditorTools } from "./tool-types";

export abstract class Tool {
  abstract readonly name: VectorEditorTools
  constructor (protected state: EditorState) {}
  /** @virtual */ input (_: GameEvent) {}
}