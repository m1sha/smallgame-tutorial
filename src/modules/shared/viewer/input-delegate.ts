import { GameEvent, Keys } from "smallgame"

export interface IInputDelegate  {
  input: (ev: GameEvent, owner: { cursor: string }) => void
  keyPressed: (keys: Keys) => void
}