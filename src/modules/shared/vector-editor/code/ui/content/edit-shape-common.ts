import { Group } from "../../../../../../components/example/code/ui/controls"
import { createRefObj, RefObj } from "../../../../../../components/example/code/ui/ref-obj"
import { EditorState } from "../../editor-state"
import { IContent } from "./content"

export class EditShapeCommon implements IContent  {
  private shapeStyleFill: RefObj<string>
  private shapeStyleStroke: RefObj<string>
  
  constructor (private panel: Group, private state: EditorState) {
    this.shapeStyleFill = createRefObj('#333')
    this.shapeStyleStroke = createRefObj('#333')

    panel.expand()
    panel.color('Fill',  val => { this.shapeStyleFill.value = val; this.changeFill(val) }, this.shapeStyleFill )
    panel.color('Stroke', val => { this.shapeStyleStroke.value = val; this.changeStroke(val) }, this.shapeStyleStroke )
    panel.hide()
  }
  
  update () {
    this.checkPanelVisible()
  }
  
  updateSelectedShapes () {
    this.checkPanelVisible()
  }

  private changeFill (color: string) {
    for (const shape of this.state.shapes.selecteds.all()) {
      shape.style.fill = color
    }
    this.state.stateChanged('shapes', 'changed-style')
  }

  private changeStroke (color: string) {
    for (const shape of this.state.shapes.selecteds.all()) {
      shape.style.stroke = color
    }
    this.state.stateChanged('shapes', 'changed-style')
  }

  private checkPanelVisible () {
    if (this.state.tools.currentName === 'select') {
      if (this.state.shapes.selecteds.count > 0) {
        const style = this.state.shapes.selecteds.all()[0].style
        this.shapeStyleStroke.value = style.stroke.toString()
        this.shapeStyleFill.value = style.fill.toString()
        this.panel.show()
        return
      }
    }

    this.panel.hide()
  }
}