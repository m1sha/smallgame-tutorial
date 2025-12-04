import { GameEvents, Keys, Surface, SurfaceBase, Sketch, Rect, Key, Point } from "smallgame"
import { CallbackAction, IScene } from "../scene"
import { Game } from "./game"
import { GameField } from "./graphics/game-field"
import { GameSnake } from "./graphics/game-snake"
import { GameFood } from "./graphics/game-food"
import { GameState } from "./graphics/game-state"

export class SnakeGame implements IScene {
  private screen: Surface
  private field: GameField
  private snake: GameSnake
  private food: GameFood
  private state: GameState
  private game: Game
  private cellSize = 16
  private position: Point

  constructor (private width: number, private height: number, private index: number) {
    this.screen = new Surface(width, height)
    this.game = new Game({ cols: 16, rows: 16 })
    const { rows, cols } = this.game.field.size
    this.field = new GameField(rows, cols, this.cellSize)
    this.snake = new GameSnake(this.game, this.cellSize)
    this.food = new GameFood(width, height, this.game, this.cellSize)
    this.state = new GameState(width, height, this.game)
    
    this.position = new Point(this.width / 2 - cols * this.cellSize / 2, this.height / 2 - rows * this.cellSize / 2 + 30)
  }
  
  nextFrame(events: GameEvents, _: Keys): SurfaceBase {
    this.input(events)
    this.screen.fill('#444')
    
    const rect = this.field.surface.rect.move(this.position)
    this.screen.blit(this.field.surface, rect)

    const foodSurface = this.food.surface
    const foodRect = foodSurface.rect.move(this.position)
    this.screen.blit(foodSurface, foodRect)
    
    const snakeSurface = this.snake.surface
    const rect2 = snakeSurface.rect.move(this.position)
    this.screen.blit(snakeSurface, rect2)

    const stateSurface = this.state.surface
    const stateRect = stateSurface.rect.move(this.position)
    this.screen.blit(stateSurface, stateRect)
    
    this.game.gameLoop()
    return this.screen
  }

  async create(): Promise<void> {
    this.game.onGameOver = () => {
      if (this.onAction) this.onAction('gameover', { index: this.index })
    }
    this.game.onScoreChanged = s => {
      this.state.score = s * 10
      this.state.level = 0 | s / 10 + 1
      this.food.setLevel(this.state.level)
    }
    this.game.start()
  }

  onAction: CallbackAction | null = null

  private input (events: GameEvents) {
    for (const event of events.get()) {
      if (event.type !== 'KEYDOWN') continue
      if (event.key === Key.LEFT) this.game.snake.move('turn-left')
      if (event.key === Key.RIGHT) this.game.snake.move('turn-right')
    }
  }
  
}