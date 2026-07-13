import { GameEvent, Keys, Surface } from "smallgame";
import { GameApp } from "./game-base"

export abstract class Scene {
  #isLoaded = false

  constructor (private game: GameApp) {

  }

  get isLoaded () { return this.#isLoaded }
  
  /** @virtual */ async create (): Promise<void> {
    this.#isLoaded = true
  }

  /** @virtual */ input (ev: GameEvent) { }
  /** @virtual */ keyInput (keys: Keys) { }
  
  abstract frameChanged (frame: Surface): void

  protected get size () { return this.game.resolution }
}