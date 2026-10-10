
import { Size, Surface } from "smallgame";
import { Discrete, Env, ResetResult, StepResult } from "../../../../utils/ai/enviroment"
import { Arkanoid } from "./game/arkanoid";
import { createArkanoidGameDefinition } from "./game-definition"
import { ArkanoidRenderer } from "./renderer"
import { RewardCounter } from "./reward-counter"

export class ArkanoidEnv extends Env {
  readonly arkanoid: Arkanoid
  readonly renderer: ArkanoidRenderer
  private ticks: number | undefined = undefined
  private steps: number = 0
  private prevRewardCounter: RewardCounter
  renderingTicks = 1

  constructor (config?: Record<string, unknown>) {
    super(config)
    const worldSize = config && config.worldSize ? config.worldSize as Size : new Size(560, 460)
    const dt =  config && config.dt ? config.dt as () => number : () => 1
    this.ticks = config && config.gameTicks ? config.gameTicks as number : undefined
    this.arkanoid = new Arkanoid(createArkanoidGameDefinition(worldSize, dt))
    this.renderer = new ArkanoidRenderer(worldSize)
    this.prevRewardCounter = this.arkanoid.rewards.dup()
  }

  reset (config?: Record<string, unknown>): ResetResult {
    this.renderingTicks = 1
    this.steps = 0
    this.arkanoid.reset()
    return {
      info: {},
      observation: this.getObservations(this.arkanoid)
    }
  }
  

  step (action: Discrete): StepResult {
    let terminated = typeof this.ticks === 'number' && this.steps++ > this.ticks
   
    if (!terminated) {
      this.arkanoid.action(action.value)

      for (let i = 0; i < this.renderingTicks; i++)
        this.arkanoid.next()
    }
    
    return {
      info: {},
      observation: this.getObservations(this.arkanoid),
      reward: this.calcReward(),
      terminated: this.arkanoid.state !== 'playing' || terminated,
      truncated: false
    }
  }

  render (): Surface {
    this.renderer.render(this.arkanoid)
    return this.renderer.image
  }

  private calcReward () {
    const diff = this.arkanoid.rewards.diff(this.prevRewardCounter)
    this.prevRewardCounter = this.arkanoid.rewards.dup()
    return diff.brokenBricks / this.arkanoid.brickMap.count + diff.win
  }

  private getObservations (arkanoid: Arkanoid) {
    const arr = new Float32Array(10)
    const size = arkanoid.world.size
    const { ball, carrent } = arkanoid
    arr[0] = (ball.position.x - carrent.position.x) / size.width
    arr[1] = (ball.position.y - carrent.position.y) / size.height
    arr[2] = ball.velocity.x
    arr[3] = ball.velocity.y
    arr[4] = 0 //this.arkanoid.ball.radius / size.height
    arr[5] = (carrent.position.x + carrent.size.width / 2) / size.width
    arr[6] = carrent.position.y / size.height
    arr[7] = carrent.velocity.x
    arr[8] = carrent.velocity.y
    arr[9] = carrent.size.width / size.width
    return arr
  }
}