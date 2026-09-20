import { Point } from "smallgame";
import { Panel } from "../../../../../../components/example/code/panels";
import AgentTrainer from "./components/agent-trainer.vue";
import { createReactiveData } from "../../../../../../components/example/index.ts";
import { AgentsTrainerData } from "./agent-trainer-data.ts";

export class AgentTrainerPanel extends Panel<AgentsTrainerData> {
  constructor () {
    super('Agents Trainer', AgentTrainer, new Point(1500, 10))
    this.data = createReactiveData({ epoch: 0, epochs: 0, log: [] })
    this.action = (actionName) => {
      if (actionName === 'train') {
        this.onStartTrain?.(this.data.epoch, this.data.epochs)
      }
    }
  }

  get epoch () { return this.data.epoch }
  set epoch (value: number) { this.data.epoch = value }
  get epochs () { return this.data.epochs }
  set epochs (value: number) { this.data.epochs = value }

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

  onStartTrain: ((epoch: number, epochs: number) => void) | null = null
} 