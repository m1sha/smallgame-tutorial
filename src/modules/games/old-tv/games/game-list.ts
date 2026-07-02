import { GameConstructor } from "../station"
import { BricksBreakerGame } from "./bricks-breaker/bricks-breaker-game"
import { SnakeGame } from "./snake/snake-game"

export default [
  new GameConstructor('Snake',  SnakeGame),
  new GameConstructor('Bricks Breaker',  BricksBreakerGame)
]
