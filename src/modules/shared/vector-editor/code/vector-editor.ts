import { GameEvent, Key, Keys, MemSurface, Surface } from "smallgame"
import { EntityListBuilder, UIBuilder } from "../../../../components/example"
import { EditorState } from "./editor-state"
import { Renderer } from "./renderer"
import { createUI, UI } from "./ui"
import { Entities } from "./ui/entities"
import { Shape } from "./editor-state/shapes"
import { loadState } from "./editor-state/data/load"

export class VectorEditor {
  private state: EditorState
  private renderer: Renderer
  private _ui: UI
  private _entities: Entities
  onShapesChanged: ((shapes: Shape[]) => void) | null = null

  constructor (surface: Surface) {
    this.state = new EditorState()
    this.state.offset = surface.rect.topLeft
   
    this.state.tools.changeTool('move-shapes')
    this.renderer = new Renderer(this.state, surface.rect.size)

    this.state.onStateChanged = (source, reason) => {
      this._ui?.update()
      this.renderer.update()

      if (source === 'shapes') {
        if (['created', 'deleted'].includes(reason)) {
          this._entities.update()
          this.onShapesChanged?.(this.state.shapes.items)
        }
        if (['selected'].includes(reason)) {
          this._entities.select()
        }
      }
    }
  }

  useEditor (value: boolean) {
    this.state.useEditor = value
  }

  input (ev: GameEvent) {
    if (!this.state.useEditor) return
    this.state.tools.current.input(ev)
  }
  
  keyPressed (keys: Keys) {
    if (!this.state.useEditor) return
    
    if (this.state.tools.current.keyPressed(keys) === false) {
      return
    }

    const pressed = keys.getPressed()
    
    if (pressed[Key.K_1]) {
      this.state.tools.changeTool('move-shapes')
    }
    if (pressed[Key.K_2]) {
      this.state.tools.changeTool('draw-rectangle')
    }
    if (pressed[Key.K_3]) {
      this.state.tools.changeTool('draw-polygon')
    }
  }

  draw (frame: Surface) {
    frame.blit(this.renderer.surface, this.renderer.surface.rect)
  }
  
  ui (uiBuilder: UIBuilder, entities: EntityListBuilder) {
    this._ui = createUI(uiBuilder, this.state)
    this._ui.update()
    this._entities = new Entities(entities, this.state)
  }

  async load (file: File | string) {
    await loadState(this.state, file)
  }
}