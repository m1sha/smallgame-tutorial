import { Game, gameloop, Screen, Time, Surface, GameEvents } from "smallgame"
import { Tetris } from "./tetris"
import type { Keys } from "smallgame/src/keys/keys"

export class TetrisGame {
  private tetris: Tetris = new Tetris()
  //private screen?: Screen
  //private game?: Game
  private width: number = 0
  private height: number = 0
  private action: ((event: GameEvents, key: Keys) => Surface) | null = null

  init (width: number, height: number, root: HTMLDivElement, fps: HTMLDivElement) {
    this.width = width
    this.height = height
    const { game, screen } = Game.create(width, height, root)
    //this.game = game
    //this.screen = screen

    gameloop(() => {
      fps.textContent = Time.fps.toFixed(0)
      if (!this.action) return

      const surface = this.action(game.event, game.key)
      screen.blit(surface, surface.rect)
    })
  }

  startGame () {
    this.tetris!.create(this.width, this.height, action => {
      this.action = action
    })
  }
}