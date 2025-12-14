import { loadImage, Sprite } from "smallgame";

export class AssetStore {
  static #asteroid: Sprite | null = null
  static get asteroid () { return this.#asteroid! }

  async load () {
    AssetStore.#asteroid = new Sprite(await loadImage('space-striker/asteroids/Asteroid_1.png'))
  }
}