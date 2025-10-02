import { Game, Screen, Surface } from "smallgame"
import { Grid } from "./grid"
import { Polygons } from "./polygons"
import type { Command } from "./commands/command"
import { CommandHistory } from "./commands/command-history"
import { Background } from "./background"

export class EditorState {
  #commandHistory: CommandHistory
  readonly screen: Screen
  readonly game: Game
  readonly polygons: Polygons
  readonly grid: Grid
  readonly width: number
  readonly height: number
  readonly background: Background

  constructor (width: number, height: number, root: HTMLDivElement) {
    this.#commandHistory = new CommandHistory(this)
    this.width = width
    this.height = height
    const { game, screen } = Game.create(width, height, root, { viewportType: 'css' })
    
    screen.imageRendering = 'pixelated'
    this.screen = screen
    this.game = game
    this.background = new Background(width, height)
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
