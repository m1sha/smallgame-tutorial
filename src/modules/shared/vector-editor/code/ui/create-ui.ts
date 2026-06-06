import { UIBuilder } from "../../../../../components/example"
import { Button, Group } from "../../../../../components/example/code/ui/controls"
import { RefObj } from "../../../../../components/example/code/ui/ref-obj"
import { download } from "../../../../../utils"
import { EditorState } from "../editor-state"

export function createUI (uiBuilder: UIBuilder, state: EditorState, editor: { useEditor: boolean }) {
  return new UI(uiBuilder, state, editor)
}

export class UI {
  private selectedTool: RefObj<string>
  private editorGroup: Group

  constructor (uiBuilder: UIBuilder, private state: EditorState, private editor: { useEditor: boolean }) {
    this.selectedTool = uiBuilder.var('select')
    this.editorGroup = uiBuilder.group('Editor')
    this.editorGroup.open()
    this.editorGroup.switch('Edit Mode', val =>  editor.useEditor = val, editor.useEditor)

    this.createToolbar()
    this.createOnCreateShapeCommonControls()
    this.selectedPolygonControls()
    this.createSavePorjectControls()
  }

  changeTool (name: string) {
    this.state.changeTool(name)
    this.selectedTool.value = name 
  }

  private createToolbar () {
    const onToolChoose = (btn: Button) => {
      btn.selected = true
      this.changeTool(btn.name)
    }

    const tools = this.editorGroup.group('Tools')
    tools.open()
    const toolbar = tools.toolbar()
    toolbar.button('Select', btn => onToolChoose(btn), { icon: 'arrow-pointer', selected: true, name: 'select' })
    toolbar.button('Move', btn => onToolChoose(btn), { icon: 'arrows-up-down-left-right', name: 'move-shapes' })
    toolbar.button('Rect', btn => onToolChoose(btn), { icon: 'square' , name: 'draw-rectangle'  })
    toolbar.button('Rect', btn => onToolChoose(btn), { icon: 'draw-polygon', name: 'draw-polygon'  })
  }

  private createOnCreateShapeCommonControls () {
    const common = this.editorGroup.group('Common')
    common.open()
    common.color('Fill', () => {}, '#333')
    common.color('Stroke', val => { this.state.shapeDrawStyle.stroke = val }, this.state.shapeDrawStyle.stroke.toString() )
    common.hiddenif(() => !['draw-polygon', 'draw-rectangle'].includes(this.selectedTool.value))
  }

  private selectedPolygonControls () { 
    const polygon = this.editorGroup.group ('Polygon')
    polygon.open()
    polygon.switch('Edit', () => {})
    polygon.hiddenif(() => !this.state.selectedShapes.count)
  }

  private createSavePorjectControls () {
    this.editorGroup.button('Save Project', () => {
      let data = '@ve_1.0\n'
      for (const shape of this.state.shapes) {
        if (shape.type === 'rectangle') {
          data += `Rect(${Math.round(shape.rect.x)}, ${Math.round(shape.rect.y)}, ${Math.round(shape.rect.width)}, ${Math.round(shape.rect.height)})\n`
        }
      }
      download('file.txt', data)
    })
  }
}