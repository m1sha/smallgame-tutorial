import type { EditorState } from "../editor-state"
import { BaseObject } from "../objects"
import { Command } from "./command"

export class SelectObjectCommand extends Command {
  #polygon: BaseObject
  #prevObject: BaseObject | null = null

  constructor (polygon: BaseObject) {
    super()
    this.#polygon = polygon
  }
  
  commit(state: EditorState): void {
    this.#prevObject = state.objects.currentObject
    state.objects.pickObject(this.#polygon)
    state.emit('select', this.#polygon)
  }

  rollback(state: EditorState): void {
    state.objects.pickObject(this.#prevObject)
    state.emit('select', this.#prevObject)
  }
}