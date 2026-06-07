import { Button, Group } from "../../../../../../components/example/code/ui/controls"
import { EditorState } from "../../editor-state"
import { VectorEditorTools } from "../../tools"
import { IContent } from "./content"

export class Toolbar implements IContent {
  constructor (panel: Group, private state: EditorState) {
    const onToolChoose = (btn: Button) => {
      btn.selected = true
      this.state.changeTool(btn.name as VectorEditorTools)
    }

    
    panel.expand()
    const toolbar = panel.toolbar()
    toolbar.button('Select', btn => onToolChoose(btn), { icon: 'arrow-pointer', selected: true, name: 'select' })
    toolbar.button('Move', btn => onToolChoose(btn), { icon: 'arrows-up-down-left-right', name: 'move-shapes' })
    toolbar.button('Rect', btn => onToolChoose(btn), { icon: 'square' , name: 'draw-rectangle'  })
    toolbar.button('Rect', btn => onToolChoose(btn), { icon: 'draw-polygon', name: 'draw-polygon'  })
  }

  update () {}
  updateSelectedShapes () {}
}