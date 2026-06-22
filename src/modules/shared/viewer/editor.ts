import { GameEvent, Keys, Surface } from "smallgame"

export interface IEditor {
  input: (ev: GameEvent) => void
  keyPressed: (keys: Keys) => void
  draw: (frame: Surface) => void
}