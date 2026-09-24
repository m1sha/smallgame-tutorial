import { Point } from "smallgame"
import { Panel } from "../../../../../../components/example/code/panels"
import AgentTrainer from "./components/agent-trainer.vue"
import { createReactiveData } from "../../../../../../components/example"
import { AgentsTrainerData } from "./agent-trainer-data.ts"
import { GeneticTrainerDefinition } from "../../../../../../utils/ai"

export class AgentTrainerPanel extends Panel<AgentsTrainerData> {
  constructor () {
    super('Agents Trainer', AgentTrainer, new Point(1500, 10))

    
  const definition: GeneticTrainerDefinition = {
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

    this.data = createReactiveData({ training: { epoch: 0, epochs: 0 }, log: [], definition })
    this.action = (actionName) => {
      if (actionName === 'train') {
        this.onStartTrain?.(this.data.training.epoch, this.data.training.epochs, this.data.definition)
      }
    }
  }

  get epoch () { return this.data.training.epoch }
  set epoch (value: number) { this.data.training.epoch = value }
  get epochs () { return this.data.training.epochs }
  set epochs (value: number) { this.data.training.epochs = value }

  addLog (epoch: number, max: number, mean: number, min: number, brockenBricks: number, catchTimes: number) {
    this.data.log.push({ 
      epoch,
      max,
      mean,
      min,
      brockenBricks,
      catchTimes
    })

    this.data.log.sort((a, b) => b.epoch - a.epoch)
  }

  onStartTrain: ((epoch: number, epochs: number, definition: GeneticTrainerDefinition) => void) | null = null
} 