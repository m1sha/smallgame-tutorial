import { Individual } from "./individual"
import { blendCrossover, uniformCrossover } from "./mate"
import { mutate } from "./mutate"
import { Population } from "./population"
import { defualtGeneticTrainerDefinition, GeneticTrainerDefinition } from './genetic-trainer-definitions'
import { Random } from "../../random"

export class GeneticTrainer {
  #epochs = 0
  population: Population
  random: Random

  constructor (public def: GeneticTrainerDefinition = defualtGeneticTrainerDefinition(), population?: Population) {
    this.population = population ? population : new Population()
    this.random = new Random(def.seed)
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

  evaluate () {
    this._evaluate()
  }

  train () {
    this.#epochs++
    this._train()
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
       
      mutate(brain, def.mutation.rate, def.mutation.strength, () => this.random.next())

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