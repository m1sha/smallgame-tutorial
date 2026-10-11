import { Size } from "smallgame"
import { UniqueNameGenerator } from "../../../../../utils/random"

import { createEnv } from "../../../../games/v2"
import { ArkanoidAgent } from "../arkanoid-agent"
import { GeneticTrainer, GeneticTrainerDefinition } from "../../../../../utils/ai"

const worldSize = new Size(560, 460)
const env = createEnv('arkanoid', { worldSize, dt: () => 3, gameTicks: 8000 })

const agentTrainer = new GeneticTrainer()
const names = new UniqueNameGenerator()
agentTrainer.createIndividual = (epoch, needInit) => {
    const e = epoch ? ' v.' + epoch : ''
    const name = `${names.next()}${e}`
    return new ArkanoidAgent(env, name, needInit) 
}
agentTrainer.createPopulation(300)
agentTrainer.fitnessFunc = individual => {
  const agent = individual as ArkanoidAgent
  return agent.calcFitness() 
}

self.onmessage = (e: MessageEvent) => {
  const command = e.data.command
  const epochs = e.data.epochs
  const definitions = e.data.definitions
  const cancellationToken = new Uint8Array(e.data.buffer)
  if (command === 'train') {
    train(epochs, definitions, cancellationToken)
  }

}

function train (epochs: number, definitions: GeneticTrainerDefinition, cancellationToken: Uint8Array) {
  agentTrainer.def = definitions
  
  for (let epoch = 0; epoch < epochs; epoch++ ) {
    agentTrainer.evaluate()
  
    const topone = agentTrainer.population.top(1)[0] as ArkanoidAgent
    postStatistic(epoch + 1, topone)

    if (isStopped(cancellationToken)) {
      postResult(epoch + 1, topone)
      break
    }

    if (epoch < epochs - 1) {
      agentTrainer.train()
      continue
    }

    postResult(epoch + 1, topone)
  }
}

function postStatistic (epoch: number, topone: ArkanoidAgent) {
    const meen =  agentTrainer.population.meen()
    const min =  agentTrainer.population.worst()
    const brokenBricks = topone.rewards.brokenBricks
    const catchTimes = topone.rewards.catchTimes

    self.postMessage({ 
      command: 'train', 
      result: { 
        epoch,
        max: topone.fitness,
        meen, 
        min,
        brokenBricks,
        catchTimes
      } 
    })
}

function postResult (epoch: number, topone: ArkanoidAgent) {
   const individuals: any[] = []
    for (const individual of agentTrainer.population.individuals) {
      const a = individual as ArkanoidAgent
      individuals.push({
        id: individual.id,
        name: individual.name,
        epoch,
        fitness: individual.fitness,
        brokenBricks: a.rewards.brokenBricks, 
        catchTimes: a.rewards.catchTimes, 
        moveTimes: a.rewards.moveTimes, 
        outsideTimes: a.rewards.outsideTimes, 
        timeLife: a.timeLife, 
        parentA: a.parentA, 
        parentB: a.parentB
      })
    }

    const weights = topone.model.getWeights()
    const name = topone.name
    const id = topone.id

    self.postMessage({ 
      command: 'complete',
      result: {
        individuals,
        individual: {
          id,
          name,
          weights
        }
      }
    })
}

function isStopped (cancellationToken: Uint8Array) {
  return Atomics.load(cancellationToken, 0) === 0
}