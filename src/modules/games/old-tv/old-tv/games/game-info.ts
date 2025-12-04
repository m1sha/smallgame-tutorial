import { IScene } from "../../games"

export type GameInfo = {
  name: string
  coverBg: string
  gameoverBg: string
  factory: (width: number, height: number, index: number) => IScene
}