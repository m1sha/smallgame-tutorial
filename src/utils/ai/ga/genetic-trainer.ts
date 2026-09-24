import { Individual } from "./individual"
import { blendCrossover, uniformCrossover } from "./mate"
import { mutate } from "./mutate"
import { Population } from "./population"
import { GeneticTrainerDefinition } from './genetic-trainer-definitions'

export class GeneticTrainer {
  #epochs = 0
  population: Population

  constructor (readonly def: GeneticTrainerDefinition, population?: Population) {
    this.population = population ? population : new Population()
  }

  get epochs () { return this.#epochs }

  createIndividual: ((epoch: number, needInit: boolean) => Individual) | null = null
  fitnessFunc: ((individual: Individual) => number) | null = null

  createPopulation(instanceCount: number) {
    if (!this.createIndividual) throw Error('individualTemplate is null')
    for (let i = 0; i < instanceCount; i++) {
      this.population.add(this.createIndividual(0, true))
    }
  }

  train (epochs: number, callback: (epoch: number) => void) {
    for (let i = 0; i < epochs; i++) {
      this.#epochs++
      this._evaluate()
      callback(this.#epochs)
      this._train()
    }
  }

  private _train () {
    const def = this.def
    const eliteCount = Math.max(1, Math.floor(this.population.count * def.elitePercent * 0.01))
    const elites = this.population.top(eliteCount)
    const newGeneration = new Population()
    elites.forEach(p => newGeneration.add(p.dup()))
    
    const reproduction = def.reproduction
    while (newGeneration.count < this.population.count) {
      const parentA = this.population.tournamentSelect(reproduction.tournamentCount)
      const parentB = this.population.tournamentSelect(reproduction.tournamentCount)

      let brain = null
      if (reproduction.crossover.type === 'UniformCrossover') {
        brain = uniformCrossover(parentA.model.getWeights(), parentB.model.getWeights())
      }
      if (reproduction.crossover.type === 'BlendCrossover') {
        brain = blendCrossover(parentA.model.getWeights(), parentB.model.getWeights(), reproduction.crossover.alpha)
      }

      if (!brain) throw new Error('brain is null')
       
      mutate(brain, def.mutation.rate, def.mutation.strength)

      const child = this.createIndividual(this.epochs + 1, false)
      child.model.setWeights(brain)
      child.parentA = parentA.name
      child.parentB = parentB.name
      newGeneration.add(child)
    }

    this.population.set(newGeneration)
  }

  private _evaluate() {
    for (const individual of this.population.individuals) {
      const fitness = this.fitnessFunc(individual)
      individual.fitness = fitness
    }
  }
}