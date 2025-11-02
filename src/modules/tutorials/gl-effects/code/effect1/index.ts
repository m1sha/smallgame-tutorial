import { EffectController } from '../core'
import fragmnet from './shader'
import { ScriptModule, ScriptSettings } from "../../../../../components/example"

export default async (settings: ScriptSettings): Promise<ScriptModule> => {
  using effect = new EffectController(settings)
  effect.create(fragmnet)
  effect.play()

  return {}
}

