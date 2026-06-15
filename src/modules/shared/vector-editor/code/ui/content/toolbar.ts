import { RadioGroup, Group } from "../../../../../../components/example/code/ui/controls"
import { EditorState } from "../../editor-state"
import { VectorEditorTools } from "../../tools"
import { IContent } from "./content"

export class Toolbar implements IContent {
  private radioGroup: RadioGroup | null = null
  private selectedTool: string
  
  constructor (private panel: Group, private state: EditorState) {
    this.selectedTool = state.tools.currentName
    
    panel.radioGroup([
      { icon: 'fa fa-arrow-pointer', title: 'Select', name: 'select' },
      { icon: 'fa fa-arrows-up-down-left-right', title: 'Select', name: 'move-shapes' },
      { icon: 'fa fa-square', title: 'Select', name: 'draw-rectangle' },
      { icon: 'fa fa-draw-polygon', title: 'Select', name: 'draw-polygon' },
    ], this.selectedTool, name => this.state.tools.changeTool(name as VectorEditorTools))
    
    panel.expand()
    this.radioGroup = panel.getControlByType(RadioGroup)[0]
  }

  update () {
    const toolName = this.state.tools.currentName
    this.radioGroup.defaultValue = toolName
    const tools = ['select', 'move-shapes', 'draw-rectangle', 'draw-polygon']
    tools.includes(toolName) 
      ? this.panel.show() 
      : this.panel.hide()
  }
}