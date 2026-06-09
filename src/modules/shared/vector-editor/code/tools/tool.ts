import { GameEvent, Keys } from "smallgame"
import { EditorState } from "../editor-state";
import { VectorEditorTools } from "./tool-types";

export abstract class Tool {
  abstract readonly name: VectorEditorTools
  constructor (protected state: EditorState) {}
  /** @virtual */ input (_: GameEvent) {}
  /** @virtual */ keyPressed (_: Keys): boolean | void  {}
}