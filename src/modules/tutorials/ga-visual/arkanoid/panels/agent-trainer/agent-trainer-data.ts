import { GeneticTrainerDefinition } from "../../../../../../utils/ai"

export type AgentsTrainerData = {
  training: {
    epoch: number
    epochs: number
  }
  log: TrainLogRecord[]
  definition: GeneticTrainerDefinition
}

export type TrainLogRecord = {
  epoch: number
  max: number
  mean: number
  min: number
  brockenBricks: number
  catchTimes: number
}