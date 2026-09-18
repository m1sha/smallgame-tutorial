import { AbstractGameApp } from "../../../shared/games/game-app";
import { Arkanoid } from "./arkanoid";

export class ArkanoidApp extends AbstractGameApp {

  constructor (readonly arkanoid: Arkanoid) {
    super()
  }

  actions () { return [1, 2] }

  step (action: number) {
    if (action === 1) this.arkanoid.moveLeft()
    if (action === 2) this.arkanoid.moveRight()
  }

  nextLoopIteration () {
    this.arkanoid.next()
  }
}