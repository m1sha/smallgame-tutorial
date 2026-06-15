import { EditorState } from "../editor-state"
import { Tool } from "./tool"
import { ToolFactory } from "./tool-factory"
import { VectorEditorTools } from "./tool-types"

export class Tools {
  current: Tool
  private toolFactory: ToolFactory

  constructor (private state: EditorState) {
    this.toolFactory = new ToolFactory(state)
  }

  get currentName () { return this.current.name }

  changeTool (name: VectorEditorTools) {
    this.current = this.toolFactory.create(name)
    this.state.stateChanged()
  }
}