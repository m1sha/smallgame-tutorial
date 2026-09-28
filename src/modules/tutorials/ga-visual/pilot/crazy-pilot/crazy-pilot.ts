import { Point, Size } from "smallgame"
import { createEnemies, Enemies } from "./enemy"
import { Pilot } from "./pilot"
import { Random } from "../../../../../utils/random"

export class CrazyPilotGame {
  pilot: Pilot
  enemies: Enemies
  gameover: boolean = false
  startEnemies: boolean = false
  frame: number = 0
  canMove: boolean = false
  private random: Random

  constructor (readonly size: Size) {
    this.pilot = new Pilot(new Point(100, 100), size)
    this.random = new Random(122122)
    this.enemies = createEnemies(size, 5, this.pilot, () => this.random.next())
  }

  start (pos: Point) {
    this.canMove = this.pilot.position.inRadius(pos, this.pilot.radius * 1.1)
    this.startEnemies = true
  }

  stopMoving () {
    this.canMove = false
  }

  reset () {
    this.gameover = false
    this.frame = 0
    this.startEnemies = false
    this.pilot = new Pilot(new Point(100, 100), this.size)
    this.random = new Random(122122)
    this.enemies = createEnemies(this.size, 5, this.pilot, () => this.random.next())
  }

  next () {
    if (!this.gameover) {
      if (this.startEnemies) {
        this.enemies.enemiesMoving(() => { this.gameover = true })
        if (this.frame % 100 === 0) { this.enemies.increeseSpeed() }
        this.frame++
      }
    }
  }

  action (x: number, y: number) {
    if (!this.canMove) return
    this.pilot.move(x, y)
  }
}