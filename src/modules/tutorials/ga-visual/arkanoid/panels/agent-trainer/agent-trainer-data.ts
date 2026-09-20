export type AgentsTrainerData = {
  epoch: number
  epochs: number
  log: TrainLogRecord[]
}

export type TrainLogRecord = {
  epoch: number
  max: number
  mean: number
  min: number
  brockenBricks: number
  catchTimes: number
}