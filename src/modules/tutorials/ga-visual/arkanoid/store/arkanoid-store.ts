import { Space } from "../../../../../utils"
import { PopulationInfo } from "./types"

export class ArkanoidStore {
  private space: Space | null = null

  populationList: PopulationInfo[] = []

  async load () {
    this.space = await Space.getOrCreate('Arkanoid-RL')
    this.populationList = await this.space.getOrCreateDocument('Arkanoid-RL.population-list', [])
  }
}