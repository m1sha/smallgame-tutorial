import { GameEvent, Surface } from "smallgame"
import { UIBuilder } from "../../../../components/example"
import { EditorState } from "./editor-state"
import { Renderer } from "./renderer"
import { createUI, UI } from "./ui"

export class VectorEditor {
  protected useEditor: boolean = true
  private state: EditorState
  private renderer: Renderer
  private _ui: UI

  constructor () {
    this.state = new EditorState()
   
    this.state.changeTool('select')
    this.renderer = new Renderer(this.state)

    this.state.onSelectedShapes = () => {
      this._ui?.update()
    }

    this.state.onToolChanged = () => {
      this._ui?.update()
    }

    this.state.onStateChanged = () => {
      this._ui?.update()
    }
  }

  input (ev: GameEvent) {
    this.state.currentTool.input(ev)
  }

  draw (frame: Surface) {
    this.renderer.render(frame)
  }
  
  ui (uiBuilder: UIBuilder) {
    this._ui = createUI(uiBuilder, this.state, this as any as { useEditor: boolean })
  }
}