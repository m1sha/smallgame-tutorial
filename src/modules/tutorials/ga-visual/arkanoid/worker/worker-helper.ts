import ArkanoidAgentsTrainer from './arkanoid-agents-trainer.worker?worker'
let worker = null

interface IArkanoidAgentsTrainerHelper {
  onTrain: ((data: any) => void) | null
  onComplete: ((data: any) => void) | null
  train (epochs: number, config: any): void
}

const ArkanoidAgentsTrainerHelper: IArkanoidAgentsTrainerHelper = {
  onTrain: null,
  onComplete: null,
  train (epochs: number, definitions: any) {
    worker?.terminate()
    worker = new ArkanoidAgentsTrainer()
    worker.postMessage({ command: 'train', epochs, definitions })
    worker.onmessage = e => {
    const command = e.data.command
    const result = e.data.result
    if (command === 'train')
      ArkanoidAgentsTrainerHelper.onTrain?.(result)
    if (command === 'complete')
      ArkanoidAgentsTrainerHelper.onComplete?.(result)
    }

  }
}


export { ArkanoidAgentsTrainerHelper }