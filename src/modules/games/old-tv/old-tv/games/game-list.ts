import { BricksBreaker } from "../../games/bricks-breaker/bricks-breaker"
import { SnakeGame } from "../../games/snake/snake-game"
import { StockBoy } from "../../games/stock-boy"
import { PlatformerAnimation } from "../../games/tests"
import { Tetris } from "../../games/tetrix/tetris"
import { GameInfo } from "./game-info"

class GameList {
  private list: GameInfo[]

  constructor () {
    this.list = [
      {
        name: '0001.THE SNAKE',
        factory: (w, h, index) => new SnakeGame(w, h, index),
        coverBg: 'old-tv/snake.png',
        gameoverBg: 'old-tv/snake.png'
      },
      {
        name: '0002.FOLLING BLOCKS',
        factory: (w, h, index) => new Tetris(w, h, index),
        coverBg: 'old-tv/falling-blocks.png',
        gameoverBg: 'old-tv/falling-blocks.png'
      },
      {
        name: '0003.BREAKER BRICKS',
        factory: (w, h, index) => new BricksBreaker(w, h, index),
        coverBg: 'old-tv/brick-breaker.png',
        gameoverBg: 'old-tv/brick-breaker.png'
      },
      {
        name: '0004.STOCK BOY',
        factory: (w, h, index) => new StockBoy(w, h, index),
        coverBg: 'old-tv/stock-boy2.png',
        gameoverBg: 'old-tv/stock-boy2.png'
      },
      {
        name: '0005.PLATFROMER ANIMATION',
        factory: (w, h, index) => new PlatformerAnimation(w, h, index),
        coverBg: 'old-tv/platformer-animation.png',
        gameoverBg: 'old-tv/platformer-animation.png'
      }
    ]
  }

  get names () {
    return this.list.map(p => p.name)
  }

  setGame (index: number) {
    const game = this.list[index]
    if (!game) throw new Error(`Can't find a game by index ${index}.`)
    return game.factory
  }

  getCoverBg (index: number) {
    const game = this.list[index]
    if (!game) throw new Error(`Can't find a game by index ${index}.`)
    return game.coverBg
  }

  getGameoverBg (index: number) {
    const game = this.list[index]
    if (!game) throw new Error(`Can't find a game by index ${index}.`)
    return game.gameoverBg
  }
}

export default new GameList()