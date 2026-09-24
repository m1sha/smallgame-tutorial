
import { Individual, Model } from "../../../../utils/ai"
import { UniqueNameGenerator } from "../../../../utils/random"
import { Arkanoid, RewardCounter } from "../../../games/v2"
export class ArkanoidAgent extends Individual {
  model: Model
  timeLife = 0
  rewards: RewardCounter

  constructor (name: string, private needInit: boolean = false) {
    super()
    this.name = name
    const inputLegth = 10
    this.model = new Model({ 
      input: { neurons: inputLegth }, 
      hiddens: [ {neurons: 16, activation: 'tanh' }], 
      output: { neurons: 3, activation: 'softmax' }
    })
    if (needInit) this.model.initWeights(11112211)
    this.rewards = new RewardCounter()
  }

  decide (arkanoid: Arkanoid) {
    return this.model.predict(this.getObservations(arkanoid))
  }

  getObservations (arkanoid: Arkanoid) {
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

  calcFitness (arkanoid: Arkanoid) {
    arkanoid.reset()
    const gameTicks = 80000
    let tick = 0
    for (tick; tick < gameTicks; tick++) {
      const result = this.model.predict(this.getObservations(arkanoid))
      if (result === 1) arkanoid.moveLeft()
      if (result === 2) arkanoid.moveRight()
      arkanoid.next()
      if (arkanoid.state === 'gameover') break
      if (arkanoid.state === 'win') break
    }

    const ticks = gameTicks - (gameTicks - tick)
    this.timeLife = ticks
    this.rewards = arkanoid.rewards
    const longPlay = ticks /gameTicks 
    const brokens =  this.rewards.brokenBricks / arkanoid.brickMap.count
    const win = this.rewards.win
    this.fitness = brokens + win + longPlay * 0.1

    return this.fitness 
  }

  dup(): ArkanoidAgent {
    const clone = new ArkanoidAgent(this.name, this.needInit)
    clone.name = this.name
    clone.cloneCount = this.cloneCount + 1
    clone.fitness = this.fitness
    ;(clone as any).model = this.model.dup()
    return clone
  }
}

const names = new UniqueNameGenerator()
export function createAgents (count: number, needInit = true) {
  const result: ArkanoidAgent[] = []
  for (let i =0; i < count; i++) {
    const name = `${names.next()}`
    result.push(new ArkanoidAgent(name, needInit))
  }
  return result
}