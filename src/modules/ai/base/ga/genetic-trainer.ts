import { Individual } from "./individual"
import { blendCrossover, uniformCrossover } from "./mate"
import { mutate } from "./mutate"
import { Population } from "./population"

export class GeneticTrainer {
  #epochs = 0
  population: Population

  constructor () {
    this.population = new Population()
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
    const eliteCount = Math.max(1, Math.floor(this.population.count * 0.05))
    const elites = this.population.top(eliteCount)
    const newGeneration = new Population()
    elites.forEach(p => newGeneration.add(p.dup()))
    
    while (newGeneration.count < this.population.count) {
      const parentA = this.population.tournamentSelect(3)
      const parentB = this.population.tournamentSelect(3)

      const brain = uniformCrossover(parentA.model.getWeights(), parentB.model.getWeights())
      mutate(brain)

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