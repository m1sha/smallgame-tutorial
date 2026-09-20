import ArkanoidAgentsTrainer from './arkanoid-agents-trainer.worker?worker'
const worker = new ArkanoidAgentsTrainer()

interface IArkanoidAgentsTrainerHelper {
  onTrain: ((data: any) => void) | null
  onComplete: ((data: any) => void) | null
  train (epochs: number): void
}

const ArkanoidAgentsTrainerHelper: IArkanoidAgentsTrainerHelper = {
  onTrain: null,
  onComplete: null,
  train (epochs: number) {
    worker.postMessage({ command: 'train', epochs })
  }
}

worker.onmessage = e => {
  const command = e.data.command
  const result = e.data.result
  if (command === 'train')
    ArkanoidAgentsTrainerHelper.onTrain?.(result)
  if (command === 'complete')
    ArkanoidAgentsTrainerHelper.onComplete?.(result)
}

export { ArkanoidAgentsTrainerHelper }