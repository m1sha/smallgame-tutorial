
import { Individual, Model } from "../../../../utils/ai"
import { Discrete, Env } from "../../../../utils/ai/enviroment"
import { Random, UniqueNameGenerator } from "../../../../utils/random"
import { RewardCounter } from "../../../games/v2"
export class ArkanoidAgent extends Individual {
  model: Model
  timeLife = 0
  rewards: RewardCounter

  constructor ( name: string, private needInit: boolean = false, seed?: number) {
    super()
    this.name = name
    const inputLegth = 10
    this.model = new Model({ 
      input: { neurons: inputLegth }, 
      hiddens: [ {neurons: 2, activation: 'tanh' }], 
      output: { neurons: 3, activation: 'softmax' }
    })
    if (needInit) this.model.initWeights(seed)
    this.rewards = new RewardCounter()
  }

  decide (observations: Float32Array) {
    return this.model.predict(observations)
  }

  calcFitness (env: Env) {
    const gameTicks = 80000
    let { observation } = env.reset({ gameTicks })
    
    let tick = 0
    let rewards = 0
    for (tick; tick < gameTicks; tick++) {
      const action = this.model.predict(observation as Float32Array)
      const result = env.step(new Discrete(action))
      observation = result.observation
      rewards += result.reward

      if (result.terminated) break
    }

    const ticks = gameTicks - (gameTicks - tick)
    const longPlay = ticks / gameTicks 
    this.timeLife = longPlay
    this.fitness = rewards

    env.stop()
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

const random = new Random(1)
const names = new UniqueNameGenerator(() => random.next())
export function createAgents (count: number, needInit = true) {
  const result: ArkanoidAgent[] = []
  for (let i =0; i < count; i++) {
    const name = `${names.next()}`
    result.push(new ArkanoidAgent(name, needInit))
  }
  return result
}