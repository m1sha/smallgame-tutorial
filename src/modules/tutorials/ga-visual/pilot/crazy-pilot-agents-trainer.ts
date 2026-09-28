import { Size } from "smallgame"
import { GeneticTrainer, GeneticTrainerDefinition } from "../../../../utils/ai"
import { UniqueNameGenerator } from "../../../../utils/random"
import { CrazyPilotAgent } from "./crazy-pilot-agent"
import { CrazyPilotGame } from "./crazy-pilot/crazy-pilot"

export class CrazyPilotAgentsTrainer {
  private trainer: GeneticTrainer
  private game: CrazyPilotGame
  constructor(){
    this.game = new CrazyPilotGame(new Size(400, 400))
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
    this.trainer = new GeneticTrainer(definitions)
    const names = new UniqueNameGenerator()
    names.useHumanStyle()
    this.trainer.createIndividual = (epoch, needInit) => {
        const e = epoch ? ' v.' + epoch : ''
        const name = `${names.next()}${e}`
        return new CrazyPilotAgent(name, needInit) 
    }
    this.trainer.createPopulation(300)
    this.trainer.fitnessFunc = individual => {
      const agent = individual as CrazyPilotAgent
      return agent.calcFitness(this.game) 
    }
  } 

  train (epochs: number) {
    this.trainer.train(epochs, epoch => {
      const f = this.trainer.population.top(1)[0].fitness
      console.log(`epoch ${epoch} fitness ${f}`)
    })
    return this.trainer.population.top(1)[0] as CrazyPilotAgent
  }
}