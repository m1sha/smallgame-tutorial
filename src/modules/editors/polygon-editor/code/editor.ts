import { gameloop, type TPoint } from "smallgame"
import { Controller } from "./controller"
import { EditorState } from "./editor-state"
import { SetBackgroundCommand } from "./commands/set-background-command"
import { CreatePolygonCommand } from "./commands/create-polygon-command"
import { ZoomOutCommand } from "./commands/zoom-out-coomand"
import { ZoomInCommand } from "./commands/zoom-in-coomand"

const SCREEN_WIDTH = 800
const SCREEN_HEIGHT = 800

export class Editor {
  #controller: Controller | null = null
  #editorState: EditorState | null = null

  get editorState (): EditorState {
    if (!this.#editorState) throw Error('Editor state is null')
    return this.#editorState
  }

  init (root: HTMLDivElement) {
    this.#editorState = new EditorState(SCREEN_WIDTH, SCREEN_HEIGHT, root)
    
    //this.editorState.polygons.add(new Polygon({ x: SCREEN_WIDTH / 2, y: SCREEN_HEIGHT / 2 }))
    
    this.#controller = new Controller(this.editorState)
    gameloop(() => {
      this.#controller!.checkInput()
      this.draw()
    })
  }

  async addImage (file: File) {
    this.editorState.sendCommand(new SetBackgroundCommand(file))
  }

  addPolygon (pos: TPoint) {
    this.editorState.sendCommand(new CreatePolygonCommand(pos))
  }

  zoomMinus () {
    this.editorState.sendCommand(new ZoomOutCommand())
  }

  zoomPlus () {
    this.editorState.sendCommand(new ZoomInCommand())
  }

  private draw () {
    const { screen, grid, polygons, images } = this.editorState
    
    screen.fill(0xFFFFFF00)

    images.draw(screen as any)
    grid.draw(screen as any)
    polygons.draw(screen as any)
  }
}
