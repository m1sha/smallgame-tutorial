import { gameloop, type TPoint } from "smallgame"
import { Controller } from "./controller"
import { EditorState } from "./editor-state"
import { SetBackgroundCommand } from "./commands/set-background-command"
import { CreatePolygonCommand } from "./commands/create-polygon-command"
import { ZoomOutCommand } from "./commands/zoom-out-coomand"
import { ZoomInCommand } from "./commands/zoom-in-coomand"
import { Viewer } from "./rasterization"

const SCREEN_WIDTH = 1200
const SCREEN_HEIGHT = 800

export class Editor {
  #controller: Controller | null = null
  #editorState: EditorState | null = null
  #viewer: Viewer | null = null

  get editorState (): EditorState {
    if (!this.#editorState) throw Error('Editor state is null')
    return this.#editorState
  }

  get viewer (): Viewer {
    if (!this.#viewer) throw Error('Editor state is null')
    return this.#viewer
  }

  init (root: HTMLDivElement) {
    this.#editorState = new EditorState(SCREEN_WIDTH, SCREEN_HEIGHT)
    this.#viewer = new Viewer(SCREEN_WIDTH, SCREEN_HEIGHT, root, this.#editorState)
    
    this.#controller = new Controller(this.editorState, this.#viewer)
    gameloop(() => {
      this.#controller!.checkInput(ev => {} /*this.#viewer?.effect.input(ev)*/)
      this.#viewer!.nextFrame()
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
}
