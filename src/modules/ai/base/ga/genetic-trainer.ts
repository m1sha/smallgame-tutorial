import { Individual } from "./individual"
import { uniformCrossover } from "./mate"
import { mutate } from "./mutate"
import { Population } from "./population"

export class GeneticTrainer {
  population: Population

  constructor () {
    this.population = new Population()
  }

  individualTemplate: ((epoch: number, needInit: boolean) => Individual) | null = null

  createPopulation(instanceCount: number) {
    if (!this.individualTemplate) throw Error('individualTemplate is null')
    for (let i = 0; i < instanceCount; i++) {
      this.population.add(this.individualTemplate(0, true))
    }
  }

  train (iterationNum: number) {
    const tournamentSelected = new Population()
    for (const _ of this.population.individuals) {
      const individual = this.population.tournamentSelect(2)
      if (tournamentSelected.individuals.some(p => p.name === individual.name)) continue
      tournamentSelected.add(individual)
    }

    const eliteCount =  Math.floor(tournamentSelected.count * 0.05)
    //debugger
    const elites = tournamentSelected.top(eliteCount)

    const newGeneration = new Population()
    elites.forEach(p => newGeneration.add(p))

    const bestEFitness = elites[0].currentFitness.toFixed(2)
    const worstEFitness = elites.at(-1).currentFitness.toFixed(2)
    const w = tournamentSelected.individuals.at(-1).currentFitness.toFixed(2)

    console.log(`${elites[0].name} vs. ${elites.at(-1).name} (${bestEFitness}:${worstEFitness}`)

    for (let i = 0; i < tournamentSelected.count - elites.length; i+=2) {
      const individualA = tournamentSelected.individuals[i]
      const individualB = tournamentSelected.individuals[i + 1]

      const brain = uniformCrossover(individualA.model.getWeights(), individualB.model.getWeights())
      mutate(brain, 0.8, 0.3)
      const child = this.individualTemplate(iterationNum + 1, false)
      child.model.setWeights(brain)

      newGeneration.add(child)
    }

    while ( this.population.count > newGeneration.count) {
      const x = Math.floor(Math.random() * this.population.count)
      newGeneration.add(this.population.individuals[x])
    }

    this.population.set(newGeneration)
  }
}