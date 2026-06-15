import { Group } from "../../../../../../components/example/code/ui/controls"
import { EditorState } from "../../editor-state"
import { IContent } from "./content"

export class CreateShapeCommon implements IContent  {
  constructor (private panel: Group, private state: EditorState) {
    panel.expand()
    panel.color('Fill', val => { this.drawStyle.fill = val }, this.drawStyle.fill.toString())
    panel.color('Stroke', val => { this.drawStyle.stroke = val }, this.drawStyle.stroke.toString() )
    panel.hide()
  }
  
  update () {
    ['draw-polygon', 'draw-rectangle'].includes(this.state.tools.currentName) 
    ? this.panel.show()
    : this.panel.hide()
  }

  private get drawStyle () { return this.state.shapes.drawStyle }
}