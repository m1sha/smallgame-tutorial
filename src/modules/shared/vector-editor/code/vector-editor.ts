import { GameEvent, Key, Keys, MemSurface, Surface } from "smallgame"
import { EntityListBuilder, UIBuilder } from "../../../../components/example"
import { EditorState } from "./editor-state"
import { Renderer } from "./renderer"
import { createUI, UI } from "./ui"
import { Entities } from "./ui/entities"

export class VectorEditor {
  protected useEditor: boolean = true
  private state: EditorState
  private renderer: Renderer
  private _ui: UI
  private _entities: Entities

  constructor (surface: Surface) {
    this.state = new EditorState()
    this.state.offset = surface.rect.topLeft
   
    this.state.tools.changeTool('select')
    this.renderer = new Renderer(this.state)

    this.state.onStateChanged = (source, reason) => {
      this._ui?.update()
      this.renderer.update()

      if (source === 'shapes') {
        if (['created', 'deleted'].includes(reason)) {
          this._entities.update()
        }
        if (['selected'].includes(reason)) {
          this._entities.select()
        }
      }
    }
  }

  input (ev: GameEvent) {
    this.state.tools.current.input(ev)
  }
  
  keyPressed (keys: Keys) {
    
    if (this.state.tools.current.keyPressed(keys) === false) {
      return
    }

    const pressed = keys.getPressed()
    
    if (pressed[Key.K_1]) {
      this.state.tools.changeTool('select')
    }
    if (pressed[Key.K_2]) {
      this.state.tools.changeTool('move-shapes')
    }
    if (pressed[Key.K_3]) {
      this.state.tools.changeTool('draw-rectangle')
    }
    if (pressed[Key.K_4]) {
      this.state.tools.changeTool('draw-polygon')
    }
  }

  draw (frame: Surface) {
    if (!this.renderer.surface) this.renderer.surface = new MemSurface(frame.rect.size)
    frame.blit(this.renderer.surface, this.renderer.surface.rect)
  }
  
  ui (uiBuilder: UIBuilder, entities: EntityListBuilder) {
    this._ui = createUI(uiBuilder, this.state, this as any as { useEditor: boolean })
    this._entities = new Entities(entities, this.state)
  }
}