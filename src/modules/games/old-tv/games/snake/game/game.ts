import { createClock, Speed } from './speed'
import { Snake } from './snake'
import { Food } from './food'
import { Field } from './field'
import { GameSetting } from './game-settings'

export class Game {
  private state: 'none' | 'play' | 'pause' = 'none'
  private snakeMovementClock: (() => void) | null = null
  private foodRecreationClock: (() => void) | null = null
  private snakeMovementSpeed: Speed
  private foodRecreationSpeed: Speed
  readonly settings: GameSetting
  readonly field: Field
  readonly snake: Snake
  readonly food: Food
  onGameOver: (() => void) | null = null
  onScoreChanged: ((score: number, efficiency: number) => void) | null = null
  onMove: (() => void) | null = null
  onFruitEaten: ((row: number, col: number) => void) | null = null
  onFoodRecreation: (() => void) | null = null

  constructor (settings: GameSetting) {
    this.settings = settings
    this.field = new Field(this.settings.rows, this.settings.cols)
    this.field.onFruitEaten = (row, col) => { if (this.onFruitEaten) this.onFruitEaten(row, col) }

    this.food = new Food(this.field)
    this.food.create()

    this.snake = new Snake(this.field)
    this.snake.onGrow = len => { if (this.onScoreChanged ) this.onScoreChanged(len, this.calcEfficiency() ) }
    this.snake.onDead = () => { if (this.onGameOver) this.onGameOver() }

    this.snakeMovementSpeed = Speed.pps(1)
    this.foodRecreationSpeed = Speed.s(5)
  }

  updateSpeed (level: number) {
    this.snakeMovementSpeed = Speed.pps(1 * level)
    this.foodRecreationSpeed = Speed.s(5 / level)
    this.snakeMovementClock = createClock(this.snakeMovementSpeed, () => this.move('keep-moving'))
    this.foodRecreationClock = createClock(this.foodRecreationSpeed, () => { if (this.onFoodRecreation) this.onFoodRecreation() })
  }

  start () {
    this.snakeMovementClock = createClock(this.snakeMovementSpeed, () => this.move('keep-moving'))
    this.foodRecreationClock = createClock(this.foodRecreationSpeed, () => { if (this.onFoodRecreation) this.onFoodRecreation() })

    this.state = 'play'
    this.snake.revive(this.field.size.rows / 2, this.field.size.cols / 2)
  }

  pause () {
    this.state = 'pause'
  }

  move (v: 'keep-moving' | 'turn-left' | 'turn-right') {
    this.snake.move(v)
    if (this.onMove) this.onMove()
  }

  gameLoop () {
    if (this.state === 'pause') return
    if (this.snakeMovementClock) this.snakeMovementClock()
    if (this.foodRecreationClock) this.foodRecreationClock()
  }

  private efficiency = 0

  private calcEfficiency() {
    const e = 1 - (this.field.fruits.length / this.food.count)
    this.efficiency = this.efficiency === 0 ? e : (this.efficiency + e) / 2

    return this.efficiency
  }
}
