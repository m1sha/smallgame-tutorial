import { Size } from "smallgame"
import { UniqueNameGenerator } from "../../../../../utils/random"

import { Arkanoid } from "../../../../games/v2"
import { ArkanoidAgent } from "../arkanoid-agent"
import { GeneticTrainer, GeneticTrainerDefinition } from "../../../../../utils/ai"

const worldSize = new Size(560, 460)
const arkanoid = Arkanoid.create(worldSize, () => 1)
const definitions: GeneticTrainerDefinition = {
  elitePercent: 5,
  reproduction: {
    tournamentCount: 3,
    crossover: { type: 'UniformCrossover' },
  },
  mutation: {
    rate: 0.1,
    strength: 0.2
  }
}
const agentTrainer = new GeneticTrainer(definitions)
const names = new UniqueNameGenerator()
agentTrainer.createIndividual = (epoch, needInit) => {
    const e = epoch ? ' v.' + epoch : ''
    const name = `${names.next()}${e}`
    return new ArkanoidAgent(arkanoid, name, needInit) 
}
agentTrainer.createPopulation(300)
agentTrainer.fitnessFunc = individual => {
  const agent = individual as ArkanoidAgent
  return agent.calcFitness() 
}

self.onmessage = (e: MessageEvent) => {
  const command = e.data.command
  const epochs = e.data.epochs
  if (command === 'train') {
    train(epochs)
  }
  
}

function train (epochs: number) {
  agentTrainer.train(epochs, epoch => {
    const topone = agentTrainer.population.top(1)[0] as ArkanoidAgent
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

    if (epoch < epochs - 1) return

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
  })

}