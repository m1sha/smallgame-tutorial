import { RadioGroup, Toolbar as CToolbar, Panel, Button } from "../../../../../../components/example/code/ui/controls"
import { EditorState } from "../../editor-state"
import { loadState } from "../../editor-state/data/load"
import { save } from "../../editor-state/data/save"
import { VectorEditorTools } from "../../tools"
import { IContent } from "./content"

export class Toolbar implements IContent {
  private radioGroup: RadioGroup | null = null
  private selectedTool: string
  
  constructor (private panel: Panel, private state: EditorState) {
    this.selectedTool = state.tools.currentName

    panel.toolbar(toolbar => {
      toolbar.button('Undo', () => { state.undo() }, { icon: 'undo' })
      toolbar.button('Redo', () => { state.redo() }, { icon: 'redo' })
      toolbar.button('Save', () => { save(this.state) }, { icon: 'save' })
      toolbar.upload('Open',  file => loadState(this.state, file), { icon: 'upload' })
    })
    
    panel.radioGroup([
      { icon: 'fa fa-arrows-up-down-left-right', title: 'Select', name: 'move-shapes' },
      { icon: 'fa fa-square', title: 'Select', name: 'draw-rectangle' },
      { icon: 'fa fa-draw-polygon', title: 'Select', name: 'draw-polygon' },
    ], this.selectedTool, name => this.state.tools.changeTool(name as VectorEditorTools))
    
    //panel.expand()
    this.radioGroup = panel.getControlByType(RadioGroup)[0]
  }
  
  setVisible (value: boolean) {
    value ? this.panel.show() : this.panel.hide()
  }

  update () {
    const toolName = this.state.tools.currentName
    this.radioGroup.defaultValue = toolName
    const tools = ['move-shapes', 'draw-rectangle', 'draw-polygon']
    tools.includes(toolName) 
      ? this.panel.show() 
      : this.panel.hide()

      
    const toolbar = this.panel.getControlByType(CToolbar)[0]
    if (toolbar) {
      const [undo, redo] = toolbar.getControlByType(Button)
      if (undo) undo.disabled = !this.state.canUndo()
      if (redo) redo.disabled = !this.state.canRedo()
    }
    
  }
}