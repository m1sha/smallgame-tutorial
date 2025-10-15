
import type { EditorState } from "../editor-state"
import { BaseObject } from "../objects"
import type { Polygon } from "../objects/polygons/polygon"
import { Command } from "./command"

export class SelectPolygonCommand extends Command {
  #polygon: Polygon
  #prevObject: BaseObject | null = null

  constructor (polygon: Polygon) {
    super()
    this.#polygon = polygon
  }
  
  commit(state: EditorState): void {
    this.#prevObject = state.objects.currentObject
    state.objects.pickObject(this.#polygon)
    state.polygons.selectPolygon(this.#polygon)
    state.emit('select', this.#polygon)
  }

  rollback(state: EditorState): void {
    state.objects.pickObject(this.#prevObject)
    state.polygons.unselectPolygon()
    state.emit('select', null)
  }

}