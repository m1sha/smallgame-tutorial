import { Group } from "../../../../../../components/example/code/ui/controls"
import { EditorState } from "../../editor-state"
import { IContent } from "./content"

export class CreateShapeCommon implements IContent  {
  constructor (private panel: Group, private state: EditorState) {
    panel.expand()
    panel.color('Fill', val => { this.state.shapeDrawStyle.fill = val }, this.state.shapeDrawStyle.fill.toString())
    panel.color('Stroke', val => { this.state.shapeDrawStyle.stroke = val }, this.state.shapeDrawStyle.stroke.toString() )
    panel.hide()
  }
  
  update () {
    ['draw-polygon', 'draw-rectangle'].includes(this.state.currentTool.name) 
    ? this.panel.show()
    : this.panel.hide()
  }
}