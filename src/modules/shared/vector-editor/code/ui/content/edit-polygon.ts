import { Group, RadioGroup } from "../../../../../../components/example/code/ui/controls"
import { createRefObj, RefObj } from "../../../../../../components/example/code/ui/ref-obj"
import { EditorState } from "../../editor-state"
import { IContent } from "./content"

export class EditPolygon implements IContent {
  private editPoints: RefObj<boolean>
    private radioGroup: RadioGroup | null = null

  constructor (private panel: Group, private state: EditorState) {
    this.editPoints = createRefObj(false)
    panel.expand()
    panel.switch('Edit Points', val => this.seteditPoints(val), this.editPoints)
    panel.radioGroup([
      { name: 'edit-polygon-points', title: 'Edit Vertext', icon: 'material-symbols-outlined vertex'},
      { name: 'edit-polygon-edges', title: 'Edit Edges', icon: 'material-symbols-outlined edges'}
    ], state.tools.currentName)
    panel.hide()
    this.radioGroup = panel.getControlByType(RadioGroup)[0]
  }

  update () { 
    this.checkVisible()

    const toolName = this.state.tools.currentName
    this.radioGroup.defaultValue = toolName
    //const tools = ['edit-polygon-points', 'edit-polygon-points']
    //tools.includes(toolName) 
    //  ? this.panel.show() 
    //  : this.panel.hide()
  }

  private checkVisible () {
    const selecteds = this.state.shapes.selecteds
    if (selecteds.count > 0 && selecteds.items[0].type === 'polygon')
    {
      this.editPoints.value = selecteds.items[0].editPoints
      this.panel.show()
      return
    }

    this.panel.hide()
  }

  private seteditPoints (value: boolean) {
    const selecteds = this.state.shapes.selecteds
    if (selecteds.count > 0 && selecteds.items[0].type === 'polygon'){
      this.editPoints.value = selecteds.items[0].editPoints = value
      this.state.tools.changeTool(value ? 'edit-polygon-points' : 'select')
    }
  }
}