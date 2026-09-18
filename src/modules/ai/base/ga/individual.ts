import { uuidv4 } from "../../../../utils"
import { Model } from "../model"

export abstract class Individual {
  id = uuidv4()
  name: string = ''
  currentFitness = 0
  abstract readonly model: Model
  abstract fitness (): number
}