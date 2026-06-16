import { UIBuilder } from "../../../../../components/example"
import { Group } from "../../../../../components/example/code/ui/controls"
import { EditorState } from "../editor-state"
import { save } from "../editor-state/data/save"
import { loadState } from "../editor-state/data/load"
import { CreateShapeCommon, EditPolygon, EditRect, EditShapeCommon, IContent, Toolbar } from "./content"

export function createUI (uiBuilder: UIBuilder, state: EditorState) {
  return new UI(uiBuilder, state)
}

export class UI {
  private editorGroup: Group
  private contents: IContent[]

  constructor (uiBuilder: UIBuilder, private state: EditorState) {
    this.editorGroup = uiBuilder.group('Editor')
    this.editorGroup.expand()
    this.editorGroup.switch('Edit Mode', val =>  { state.useEditor = val; this.update() }, state.useEditor)
    const root = this.editorGroup

    this.contents = [
      new Toolbar(root.panel(() => {}), state),
      new CreateShapeCommon(root.group('Common'), state),
      new EditShapeCommon(root.group('Common'), state),
      new EditRect(root.group('Rectangle'), state),
      new EditPolygon(root.group('Polygon'), state)
    ]
 
    //this.createSavePorjectControls()
  }

  update () {
    if (!this.state.useEditor) {
      this.contents.forEach(c => c.setVisible(false))  
      return
    }
    this.contents.forEach(c => {
      c.setVisible(true)
      c.update()
    })
  }
   
  private createSavePorjectControls () {
    this.editorGroup.button('Save Project', () => saveState(this.state))
    this.editorGroup.upload('Load Project', file =>loadState(this.state, file) )
  }
}

function saveState (state: EditorState) {
  save(state)
}