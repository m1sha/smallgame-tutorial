import { TSize } from 'smallgame'
import ArkanoidAgentsTrainer from './arkanoid-agents-trainer.worker?worker'
let worker = null

interface IArkanoidAgentsTrainerHelper {
  onTrain: ((data: any) => void) | null
  onComplete: ((data: any) => void) | null
  train (populationName: string, epochs: number, config: any, gameEmulSetting: GameEmulSetting): void
  cancellationToken: Uint8Array
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
  cancellationToken: new Uint8Array(new SharedArrayBuffer(4)),
  //running: false,
  train (populationName: string, epochs: number, definitions: any, gameEmulSetting: GameEmulSetting) {
    const self = ArkanoidAgentsTrainerHelper
    Atomics.store(self.cancellationToken, 0, 1)

    worker?.terminate()
    worker = new ArkanoidAgentsTrainer()
    worker.postMessage({ command: 'train', populationName, epochs, definitions, gameEmulSetting, buffer: self.cancellationToken.buffer })
    worker.onmessage = e => {
    const command = e.data.command
    const result = e.data.result
    if (command === 'train')
      ArkanoidAgentsTrainerHelper.onTrain?.(result)
    if (command === 'complete')
      ArkanoidAgentsTrainerHelper.onComplete?.(result)
    }

  },
  stop () {
    const self = ArkanoidAgentsTrainerHelper
    Atomics.store(self.cancellationToken, 0, 0)
  }
}


export { ArkanoidAgentsTrainerHelper }