import { type ScriptModule, type ScriptSettings } from "../../../../components/example"
import { Effect } from '../core'
import fragmnet from './shader'

export default async (settings: ScriptSettings): Promise<ScriptModule> => {
  using effect = new Effect(settings)
  effect.create(fragmnet)
  effect.play()

  return {}
}