import { Group } from "../../../../../../components/example/code/ui/controls"
import { EditorState } from "../../editor-state"
import { IContent } from "./content"

export class EditPolygon implements IContent {
  constructor (private panel: Group, private state: EditorState) {
    panel.expand()
    panel.switch('Edit', () => {})
    panel.hide()
  }

  update () { 
    this.checkVisible()
  }

  private checkVisible () {
    const selecteds = this.state.selectedShapes
    selecteds.count > 0 && selecteds.items[0].type === 'polygon'
    ? this.panel.show()
    : this.panel.hide()
  }
}