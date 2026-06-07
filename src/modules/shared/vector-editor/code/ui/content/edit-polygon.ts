import { Group } from "../../../../../../components/example/code/ui/controls"
import { createRefObj, RefObj } from "../../../../../../components/example/code/ui/ref-obj"
import { EditorState } from "../../editor-state"
import { IContent } from "./content"

export class EditPolygon implements IContent {
  private editPoints: RefObj<boolean>

  constructor (private panel: Group, private state: EditorState) {
    this.editPoints = createRefObj(false)
    panel.expand()
    panel.switch('Edit', val => this.seteditPoints(val), this.editPoints)
    panel.hide()
  }

  update () { 
    this.checkVisible()
  }

  private checkVisible () {
    const selecteds = this.state.selectedShapes
    if (selecteds.count > 0 && selecteds.items[0].type === 'polygon')
    {
      this.editPoints.value = selecteds.items[0].editPoints
      this.panel.show()
      return
    }

    this.panel.hide()
  }

  private seteditPoints (value: boolean) {
    const selecteds = this.state.selectedShapes
    if (selecteds.count > 0 && selecteds.items[0].type === 'polygon'){
      this.editPoints.value = selecteds.items[0].editPoints = value
      this.state.changeTool('edit-polygon-points')
    }
  }
}