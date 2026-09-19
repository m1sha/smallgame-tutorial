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

  createPopulation(instanceCount: number) {
    if (!this.createIndividual) throw Error('individualTemplate is null')
    for (let i = 0; i < instanceCount; i++) {
      this.population.add(this.createIndividual(0, true))
    }
  }

  train (epochs: number, callback: (epoch: number) => void) {
    for (let i = 0; i < epochs; i++) {
      this.#epochs++
      this._train()
      callback(this.#epochs)
    }
  }

  private _train () {
    const tournamentSelected = new Population()
    for (const _ of this.population.individuals) {
      const individual = this.population.tournamentSelect(3)
      //if (tournamentSelected.individuals.some(p => p.id === individual.id)) continue
      tournamentSelected.add(individual)
    }

    const eliteCount =  Math.floor(tournamentSelected.count * 0.05)
    const elites = tournamentSelected.top(eliteCount)

    const newGeneration = new Population()
    elites.forEach(p => newGeneration.add(p))

    const bestEFitness = elites[0].currentFitness.toFixed(2)
    const worstEFitness = elites.at(-1).currentFitness.toFixed(2)
    console.log(`${elites[0].name} vs. ${elites.at(-1).name} (${bestEFitness}:${worstEFitness}`)

    for (let i = 0; i < tournamentSelected.count - elites.length; i+=2) {
      const individualA = tournamentSelected.individuals[i]
      const individualB = tournamentSelected.individuals[i + 1]

      const brain = blendCrossover(individualA.model.getWeights(), individualB.model.getWeights())
      mutate(brain)
      const child = this.createIndividual(this.epochs + 1, false)
      child.model.setWeights(brain)
      child.parentA = individualA.name
      child.parentB = individualB.name

       if (newGeneration.has(child)) continue
      newGeneration.add(child)
    }

    while (this.population.count > newGeneration.count) {
      const x = Math.floor(Math.random() * this.population.count)
      const individual = this.population.individuals[x]
      if (newGeneration.has(individual)) continue
      newGeneration.add(individual)
    }

    this.population.set(newGeneration)
  }
}