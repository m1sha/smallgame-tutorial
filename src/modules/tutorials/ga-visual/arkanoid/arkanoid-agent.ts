
import { Individual, Model } from "../../../../utils/ai"
import { Discrete, Env } from "../../../../utils/ai/enviroment"
import { UniqueNameGenerator } from "../../../../utils/random"
import { Arkanoid, RewardCounter } from "../../../games/v2"
export class ArkanoidAgent extends Individual {
  model: Model
  timeLife = 0
  rewards: RewardCounter

  constructor (private env: Env, name: string, private needInit: boolean = false) {
    super()
    this.name = name
    const inputLegth = 10
    this.model = new Model({ 
      input: { neurons: inputLegth }, 
      hiddens: [ {neurons: 2, activation: 'tanh' }], 
      output: { neurons: 3, activation: 'softmax' }
    })
    if (needInit) this.model.initWeights(11112211)
    this.rewards = new RewardCounter()
  }

  decide (observations: Float32Array) {
    return this.model.predict(observations)
  }

  calcFitness () {
    const gameTicks = 80000
    let { observation } = this.env.reset({ gameTicks })
    
    let tick = 0
    let rewards = 0
    for (tick; tick < gameTicks; tick++) {
      const action = this.model.predict(observation as Float32Array)
      const result = this.env.step(new Discrete(action))
      observation = result.observation
      rewards += result.reward

      if (result.terminated) break
    }

    const ticks = gameTicks - (gameTicks - tick)
    const longPlay = ticks /gameTicks 
    this.timeLife = longPlay
    this.fitness = rewards + longPlay * 0.1

    return this.fitness 
  }

  dup(): ArkanoidAgent {
    const clone = new ArkanoidAgent(this.env, this.name, this.needInit)
    clone.name = this.name
    clone.cloneCount = this.cloneCount + 1
    clone.fitness = this.fitness
    ;(clone as any).model = this.model.dup()
    return clone
  }
}

const names = new UniqueNameGenerator()
export function createAgents (env: Env, count: number, needInit = true) {
  const result: ArkanoidAgent[] = []
  for (let i =0; i < count; i++) {
    const name = `${names.next()}`
    result.push(new ArkanoidAgent(env, name, needInit))
  }
  return result
}