import { Size } from "smallgame"
import { Ball } from "./ball"
import { BrickMap } from "./brick-map"
import { Carrent } from "./carrent"
import { Collider } from "./collisions"
import { ArkanoidGameDefinition, createArkanoidGameDefinition } from "./game-definition"
import { World } from "./world"
import { RewardCounter } from "./reward-counter"

export class Arkanoid {
  world: World
  carrent: Carrent
  ball: Ball
  brickMap: BrickMap
  collider: Collider
  rewards: RewardCounter
  state: 'playing' | 'gameover' | 'win'

  constructor (readonly def: ArkanoidGameDefinition) {
    this.carrent = new Carrent(def.carrentPos.dup(), def.carrentVelocity.dup(), def.carrentSpeed, def.carrentSize)
    this.ball = new Ball(def.ballPos.dup(), def.ballVelocity.dup(), def.ballSpeed, def.ballRadius)
    this.world = new World(def.worldSize)
    this.brickMap = new BrickMap(def.bricksMap, def.brickSize, def.bricksOffset, def.bricksStartPos)
    this.rewards = new RewardCounter()
    this.collider = new Collider()
    this.state = 'playing'
  }

  reset () {
    const ballVelocity = this.def.ballVelocity.dup()
    //ballVelocity.x = Math.random() < .5 ? -1: 1
    this.carrent = new Carrent(this.def.carrentPos.dup(), this.def.carrentVelocity.dup(), this.def.carrentSpeed, this.def.carrentSize)
    this.ball = new Ball(this.def.ballPos.dup(), ballVelocity, this.def.ballSpeed, this.def.ballRadius)
    this.brickMap = new BrickMap(this.def.bricksMap, this.def.brickSize, this.def.bricksOffset, this.def.bricksStartPos)
    this.rewards = new RewardCounter()
    this.state = 'playing'
  }

  moveLeft () {
    if (this.state !== 'playing') return
    const tick = this.def.getDt()
    this.carrent.moveLeft(tick)
    if (this.carrent.position.x < 0 || this.carrent.position.x + this.carrent.size.width > this.world.size.width) {
      this.rewards.removeRewardForOutSide()
      this.carrent.toLeft()
    } else
    this.rewards.addRewardForMovement()
  }

  moveRight () {
    if (this.state !== 'playing') return
    const tick = this.def.getDt()
    this.carrent.moveRight(tick)
    if (this.carrent.position.x < 0 || this.carrent.position.x + this.carrent.size.width > this.world.size.width) {
      this.rewards.removeRewardForOutSide()
      this.carrent.toRight(this.world.size.width)
    } else
    this.rewards.addRewardForMovement()
  }

  action (n: number) {
    if (n < 1 || n > 2) throw new Error('An action must be 1 or 2.')
    if (n === 1) this.moveLeft()
    if (n === 2) this.moveRight()
  }

  next () {
    if (this.state !== 'playing') return
    
    if (this.brickMap.allBroken) {
      this.rewards.addRewardForWin()
      this.state = 'win'
      return
    }
    const tick = this.def.getDt()

    this.ball.move(tick)

    const bgResult = this.collider.ballCollidesWorld(this.ball, this.world)

    if (bgResult === 'GameOver') {
      this.state = 'gameover'
      
      return
    }

    if (bgResult === 'Collided') {
      return
    }

    if (this.collider.ballCollidesCarret(this.ball, this.carrent)) {
      this.rewards.addRewardForCatch()
    }

    if (this.collider.ballCollidesBricks(this.ball, this.brickMap.bricks)) {
      this.rewards.addRewardForBrokenBrick()
    }
  }

  static create (worldSize: Size, getDt: () => number) {
    return new Arkanoid(createArkanoidGameDefinition(worldSize, getDt))
  }
}