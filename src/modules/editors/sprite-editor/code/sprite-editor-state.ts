import { DisplayObject } from "./display-objects"

export interface ISpriteEditorState {
  currentObject: DisplayObject | null
  objects: DisplayObject[]
}