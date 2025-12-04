import { GameEvents, SurfaceBase, Keys } from "smallgame"

export type CallbackAction = (name: string, data: any) => void

export interface IScene {
  nextFrame (events: GameEvents, key: Keys): SurfaceBase
  create (): Promise<void>
  onAction: CallbackAction | null
}