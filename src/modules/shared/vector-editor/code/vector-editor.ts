import { GameEvent, Surface } from "smallgame"
import { UIBuilder } from "../../../../components/example"
import { EditorState } from "./editor-state"
import { Renderer } from "./renderer"
import { ToolFactory, Tool } from "./tools"
import { Button, Group } from "../../../../components/example/code/ui/controls"
import { download } from "../../../../utils"

export class VectorEditor {
  private editMode: boolean = true
  private state: EditorState
  private currentTool: Tool
  private toolFactory: ToolFactory
  private renderer: Renderer

  constructor () {
    this.state = new EditorState()
    this.toolFactory = new ToolFactory(this.state)
    this.changeTool('select')
    this.renderer = new Renderer(this.state)
  }

  input (ev: GameEvent) {
    this.currentTool.input(ev)
  }

  draw (frame: Surface) {
    this.renderer.render(frame)
  }
  
  ui (uiBuilder: UIBuilder) {
    let rectangleGroup: Group | null = null

    const onToolChoose = (btn: Button) => {
      this.changeTool(btn.name); btn.selected = true
      btn.name == 'draw-rectangle' ? rectangleGroup.show() : rectangleGroup.hide()
    }

    uiBuilder.group('Editor', editorGroup => {
      editorGroup.open()
      editorGroup.switch('Edit Mode', val => this.editMode = val, this.editMode)

      editorGroup.group('Tools', group => group
        .open()
        .toolbar(toolbar => toolbar
          .button('Select', btn => onToolChoose(btn), { icon: 'arrow-pointer', selected: true, name: 'select' })
          .button('Move', btn => onToolChoose(btn), { icon: 'arrows-up-down-left-right', name: 'move-shapes' })
          .button('Rect', btn => onToolChoose(btn), { icon: 'square' , name: 'draw-rectangle'  })
          .button('Rect', btn => onToolChoose(btn), { icon: 'draw-polygon', name: 'draw-polygon'  })
        )
      )

      rectangleGroup = editorGroup.group('Rectangle', _ => {
        _.open()
        _.color('Fill', () => {}, '#333')
        _.color('Stroke', val => { this.state.shapeDrawStyle.stroke = val }, this.state.shapeDrawStyle.stroke.toString() )
      })
      rectangleGroup.hide()

      editorGroup.button('Save Project', () => {
        let data = '@ve_1.0\n'
        for (const shape of this.state.shapes) {
          if (shape.type === 'rectangle') {
            data += `Rect(${Math.round(shape.rect.x)}, ${Math.round(shape.rect.y)}, ${Math.round(shape.rect.width)}, ${Math.round(shape.rect.height)})\n`
          }
        }
        download('file.txt', data)
      })
    })
  }

  private changeTool (name: string) {
    this.currentTool = this.toolFactory.create(name)
  }
}