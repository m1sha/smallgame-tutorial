import { GameEvent, Key, loadImage, Point, Rect, Sketch, Surface } from "smallgame";
import { Scene } from "../../station/base/scene";
import { GameField } from "./graphics/game-field";
import { GameSnake } from "./graphics/game-snake";
import { GameFood } from "./graphics/game-food";
import { GameState } from "./graphics/game-state";
import { Game } from "./game";

export class SnakeGameScene extends Scene {
  private img: Surface | null = null
  private field: GameField = new GameField(16, 16, 16)
  private snake: GameSnake
  private food: GameFood
  private state: GameState
  private snakeGame: Game
  private cellSize = 16
  private position: Point
  
  async create (): Promise<void> {
    const { width, height } = this.size
    this.snakeGame = new Game({ cols: 16, rows: 16 })
    const { rows, cols } = this.snakeGame.field.size
    this.field = new GameField(rows, cols, this.cellSize)
    this.snake = new GameSnake(this.snakeGame, this.cellSize)
    this.food = new GameFood(width, height, this.snakeGame, this.cellSize)
    this.state = new GameState(width, height, this.snakeGame)
    
    this.position = new Point(width / 2 - cols * this.cellSize / 2, height / 2 - rows * this.cellSize / 2 + 30)

    this.snakeGame.onGameOver = () => {
      //if (this.onAction) this.onAction('gameover', { index: this.index })
    }
    this.snakeGame.onScoreChanged = s => {
      this.state.score = s * 10
      this.state.level = 0 | s / 10 + 1
      this.food.setLevel(this.state.level)
    }
    this.snakeGame.start()

    this.img = await loadImage('nature-3082832_1280.jpg')
    await super.create()
  }

  frameChanged (frame: Surface): void {
    if (this.img) {
      frame.blit(this.img, frame.rect)
    }
    
    const rect = this.field.surface.rect.move(this.position)
    frame.blit(this.field.surface, rect)

    const foodSurface = this.food.surface
    const foodRect = foodSurface.rect.move(this.position)
    frame.blit(foodSurface, foodRect)
    
    const snakeSurface = this.snake.surface
    const rect2 = snakeSurface.rect.move(this.position)
    frame.blit(snakeSurface, rect2)

    const stateSurface = this.state.surface
    const stateRect = stateSurface.rect.move(this.position)
    frame.blit(stateSurface, stateRect)
    
    this.snakeGame.gameLoop()

    //this.field.surface.rect.absCenter = frame.rect.absCenter
    //frame.blit(this.field.surface, this.field.surface.rect)
    
  }

  

  input (event: GameEvent): void {
    if (event.type === 'KEYDOWN') {
      if (event.key === Key.LEFT) this.snakeGame.snake.move('turn-left')
      if (event.key === Key.RIGHT) this.snakeGame.snake.move('turn-right')
    }
  }
}