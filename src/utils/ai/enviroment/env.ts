import { Surface } from "smallgame"

export type Box = Float32Array
export class Discrete { 
  #value: number 
  constructor(value: number) { this.value = value }
  get value () { return this.#value }
  set value (value: number) { 
    if (!Number.isInteger(value) || value < 0) throw new Error('Value must be integer and positive value.')
    this.#value = value
  }
}

export type Observation = Box | Discrete
export type Action = Box | Discrete

export type ResetResult = {
  observation: Observation
  info: Record<string, unknown>
}

export type StepResult = ResetResult & {
  reward: number
  terminated: boolean
  truncated: boolean
}

export abstract class Env /*<TAction extends Action, TObservation extends Observation>*/ {
  constructor (config?: Record<string, unknown>) {}
  abstract reset (config?: Record<string, unknown>): ResetResult
  abstract step (action: Action): StepResult
  abstract render (): Surface
}