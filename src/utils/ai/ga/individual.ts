
import { uuidv4 } from "../../uuidv4"
import { Model } from "../dnn"

export abstract class Individual {
  id = uuidv4()
  name: string = ''
  fitness = 0
  parentA: string = ''
  parentB: string = ''
  abstract readonly model: Model
  cloneCount = 0

  abstract dup (): Individual 

  load (weights: Float32Array) {
    this.model.setWeights(weights)
  }
}