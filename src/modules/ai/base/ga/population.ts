import { Individual } from "./individual";

export class Population {
  individuals: Individual[] = []

  tournamentSelect(k: number = 3): Individual {
    let best = this.individuals[Math.floor(Math.random() * this.individuals.length)]
    for (let i = 1; i < k; i++) {
      const candidate = this.individuals[Math.floor(Math.random() * this.individuals.length)]
      const e = candidate.fitness() > best.fitness()
      if (e) best = candidate
      //console.log(`Agent ${best.name} Vs. Agent ${candidate.name} ` + (e ? candidate.name + ' is Win': best.name + ' is Win'))
    }
    return best
  }

  get (id: string) {
    return this.individuals.find(p => p.id === id)
  }

  add (individual: Individual) {
    this.individuals.push(individual)
  }

  set (population: Population) {
    while(this.individuals.pop());
    population.individuals.forEach(p => this.add(p))
  }

  top (count) {
    return this.individuals.sort((a, b) => b.currentFitness - a.currentFitness).slice(0, count)
  }

  has (individual: Individual) {
    return this.individuals.some(p => p.id === individual.id)
  }

  get count () { return this.individuals.length }
}