import { Game, Screen } from "smallgame"
import { Grid } from "./grid"
import { Polygons, Images, BaseObject } from "./objects"
import type { Command } from "./commands/command"
import { CommandHistory } from "./commands/command-history"

export class EditorState {
  #commandHistory: CommandHistory
  readonly screen: Screen
  readonly game: Game
  readonly polygons: Polygons
  readonly grid: Grid
  readonly width: number
  readonly height: number
  readonly images: Images
  onObjectChanged: ((action: 'created' | 'edited' | 'deleted' | 'selectd', obj: BaseObject) => void) | null = null
  onObjectedSelected: ((obj: BaseObject) => void) | null = null

  constructor (width: number, height: number, root: HTMLDivElement) {
    this.#commandHistory = new CommandHistory(this)
    this.width = width
    this.height = height
    const { game, screen } = Game.create(width, height, root, { viewportType: 'css' })
    
    screen.imageRendering = 'pixelated'
    this.screen = screen
    this.game = game
    this.images = new Images({ width, height })
    this.polygons = new Polygons()
    this.grid = new Grid(width, height)
    this.grid.visible = false
  }

  sendCommand (command: Command) {
    this.#commandHistory.add(command)
  }

  undo () { this.#commandHistory.undo() }
  
  redo () { this.#commandHistory.redo() }

  
}
