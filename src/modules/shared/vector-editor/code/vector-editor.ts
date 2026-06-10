import { GameEvent, Key, Keys, MemSurface, Surface } from "smallgame"
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
      this.renderer.update()
    }

    this.state.onToolChanged = () => {
      this._ui?.update()
      this.renderer.update()
    }

    this.state.onStateChanged = () => {
      this._ui?.update()
      this.renderer.update()
    }
  }

  input (ev: GameEvent) {
    this.state.currentTool.input(ev)
  }
  
  keyPressed (keys: Keys) {
    
    if (this.state.currentTool.keyPressed(keys) === false) {
      return
    }

    const pressed = keys.getPressed()
    
    if (pressed[Key.K_1]) {
      this.state.changeTool('select')
    }
    if (pressed[Key.K_2]) {
      this.state.changeTool('move-shapes')
    }
    if (pressed[Key.K_3]) {
      debugger
      this.state.changeTool('draw-rectangle')
    }
    if (pressed[Key.K_4]) {
      this.state.changeTool('draw-polygon')
    }
  }

  draw (frame: Surface) {
    if (!this.renderer.surface) this.renderer.surface = new MemSurface(frame.rect.size)
    frame.blit(this.renderer.surface, this.renderer.surface.rect)
  }
  
  ui (uiBuilder: UIBuilder) {
    this._ui = createUI(uiBuilder, this.state, this as any as { useEditor: boolean })
  }
}