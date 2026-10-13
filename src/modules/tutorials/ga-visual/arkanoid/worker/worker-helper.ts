import { TSize } from 'smallgame'
import ArkanoidAgentsTrainer from './arkanoid-agents-trainer.worker?worker'
import { CancellationToken } from '../../../../../utils/workers'
let worker = null

interface IArkanoidAgentsTrainerHelper {
  onTrain: ((data: any) => void) | null
  onComplete: ((data: any) => void) | null
  train (populationName: string, epochs: number, config: any, gameEmulSetting: GameEmulSetting): void
  cancellationToken: CancellationToken
  stop (): void
  //running: boolean
}

export type GameEmulSetting = {
  gameTicks: number
  dt: number
  worldSize: TSize
}

const ArkanoidAgentsTrainerHelper: IArkanoidAgentsTrainerHelper = {
  onTrain: null,
  onComplete: null,
  cancellationToken: new CancellationToken(),
  //running: false,
  train (populationName: string, epochs: number, definitions: any, gameEmulSetting: GameEmulSetting) {
    const self = ArkanoidAgentsTrainerHelper
    self.cancellationToken.reset()

    worker?.terminate()
    worker = new ArkanoidAgentsTrainer()
    worker.postMessage({ command: 'train', populationName, epochs, definitions, gameEmulSetting, buffer: self.cancellationToken.token.buffer })
    worker.onmessage = e => {
    const command = e.data.command
    const result = e.data.result
    if (command === 'train')
      self.onTrain?.(result)
    if (command === 'complete')
      self.onComplete?.(result)
    }

  },
  stop () {
    ArkanoidAgentsTrainerHelper.cancellationToken.cancel()
  }
}


export { ArkanoidAgentsTrainerHelper }