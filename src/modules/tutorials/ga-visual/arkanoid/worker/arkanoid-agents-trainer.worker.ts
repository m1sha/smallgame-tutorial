import { Size } from "smallgame"
import { Random, UniqueNameGenerator } from "../../../../../utils/random"
import { createEnv } from "../../../../games/v2"
import { ArkanoidAgent } from "../arkanoid-agent"
import { GeneticTrainer, GeneticTrainerDefinition } from "../../../../../utils/ai"
import { loadPopulation } from "../store/population-document"
import { GameEmulSetting } from "./worker-helper"

self.onmessage = async (e: MessageEvent) => {
  const command = e.data.command
  const epochs = e.data.epochs
  const definitions = e.data.definitions
  const gameEmulSetting = e.data.gameEmulSetting
  const populationName = e.data.populationName
  const cancellationToken = new Uint8Array(e.data.buffer)
  if (command === 'train') {
    train(populationName, epochs, definitions, gameEmulSetting, cancellationToken)
  }
}

async function train (populationName: string, epochs: number, definitions: GeneticTrainerDefinition, gameEmulSetting: GameEmulSetting, cancellationToken: Uint8Array) {
  //debugger
  const worldSize = new Size(gameEmulSetting.worldSize)
  const env = createEnv('arkanoid', { worldSize, dt: () => gameEmulSetting.dt, gameTicks: gameEmulSetting.gameTicks })
  const random = new Random(definitions.seed)
  const trainer = new GeneticTrainer(definitions, () => random.next())
  const names = new UniqueNameGenerator(() => random.next())
  
  trainer.createIndividual = (epoch, needInit) => {
    const e = epoch ? ' v.' + epoch : ''
    const name = `${names.next()}${e}`
    return new ArkanoidAgent(name, needInit, definitions.seed) 
  }

  //const { agents } = await loadPopulation(populationName)
  //agents.forEach(p => trainer.population.add(p))
  trainer.createPopulation(300)

  trainer.fitnessFunc = individual => {
    const agent = individual as ArkanoidAgent
    return agent.calcFitness(env) 
  }
  trainer.def = definitions
  
  for (let epoch = 0; epoch < epochs; epoch++) {
    trainer.evaluate()
  
    const topone = trainer.population.top(1)[0] as ArkanoidAgent
    postStatistic(trainer, epoch + 1, topone)

    if (isStopped(cancellationToken)) {
      postResult(trainer, epoch + 1, topone)
      break
    }

    if (epoch < epochs - 1) {
      trainer.train()
      continue
    }

    postResult(trainer, epoch + 1, topone)
  }
}

function postStatistic (ga: GeneticTrainer, epoch: number, topone: ArkanoidAgent) {
    const meen = ga.population.meen()
    const min = ga.population.worst()
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

function postResult (ga: GeneticTrainer, epoch: number, topone: ArkanoidAgent) {
   const individuals: any[] = []
    for (const individual of ga.population.individuals) {
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