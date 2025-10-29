
import type { EditorState } from "../editor-state"
import { BaseObject, ImageObject } from "../objects"
import { Command } from "./command"

export class SelectImageObjectCommand extends Command {
  imageObject: ImageObject
  #prevObject: BaseObject | null = null

  constructor (polygon: ImageObject) {
    super()
    this.imageObject = polygon
  }
  
  commit(state: EditorState): void {
    this.#prevObject = state.objects.currentObject
    state.objects.pickObject(this.imageObject)
    state.emit('select', this.imageObject)
  }

  rollback(state: EditorState): void {
    state.objects.pickObject(this.#prevObject)
    state.emit('select', null)
  }
}