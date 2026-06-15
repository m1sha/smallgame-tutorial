import { Group } from "../../../../../../components/example/code/ui/controls"
import { createRefObj, RefObj } from "../../../../../../components/example/code/ui/ref-obj"
import { EditorState } from "../../editor-state"
import { IContent } from "./content"

export class EditRect implements IContent {
  private x: RefObj<string>
  private y: RefObj<string>
  private w: RefObj<string>
  private h: RefObj<string>

  constructor (private panel: Group, private state: EditorState) {
    this.x = createRefObj('0')
    this.y = createRefObj('0')
    this.w = createRefObj('0')
    this.h = createRefObj('0')
    panel.expand()
    panel.hide()
    panel.input('X', v => this.changeValue('x', +v), this.x)
    panel.input('Y', v => this.changeValue('y', +v), this.y)
    panel.input('Width', v => this.changeValue('w', +this.w.value), this.w)
    panel.input('Height', v => this.changeValue('h', +this.h.value), this.h)
  }

  update () { 
    this.checkVisible()
  }

  updateSelectedShapes () { 
    this.checkVisible()
  }

  private checkVisible () {
    const selecteds = this.state.shapes.selecteds
    if (selecteds.count > 0 && selecteds.items[0].type === 'rectangle')
    {
      this.panel.show()
      const r = selecteds.items[0].rect
      this.x.value = r.x.toFixed(0)
      this.y.value = r.y.toFixed(0)
      this.w.value = r.width.toFixed(0)
      this.h.value = r.height.toFixed(0)
      return
    }
    
    this.panel.hide()
  }

  private changeValue (type: 'x' | 'y' | 'w' | 'h', value: number) {
    const selecteds = this.state.shapes.selecteds
    selecteds.forEach(shape => {
      if (shape.type !== 'rectangle') return
      switch (type) {
        case 'x': shape.rect.x = value; break
        case 'y': shape.rect.y = value; break 
        case 'w': shape.rect.width = value; break
        case 'h': shape.rect.height = value; break
      }
      this.state.stateChanged('shapes', 'changed')
    })
  }
}