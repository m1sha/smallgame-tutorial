import { Surface, Text, TTextStyle } from "smallgame"
import { Game } from "../game"

export class GameState {
  score: number = 0
  level: number = 1
  #surface: Surface
  constructor (private width: number, height: number, private game: Game) {
    this.#surface = new Surface(width, height)
  }

  get surface () {
    this.#surface.clear()
    const textStyle: TTextStyle = { color: '#fff', fontSize: '20px' }
     const text1 = new Text('level ' + this.level, textStyle)
     text1.pos = { x: this.width / 2, y: 20 }
     text1.draw(this.#surface)
     const text2 = new Text('score ' + this.score, textStyle)
     text2.pos = { x: this.width / 2, y: 50 }
     text2.draw(this.#surface)
    return this.#surface
  }
}