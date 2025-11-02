import { ScriptModule, ScriptSettings } from "../../../../../components/example"
import { EffectController } from "../core"
import fragmnet from './shader'

export default async (settings: ScriptSettings): Promise<ScriptModule> => {
  using effect = new EffectController(settings)
  effect.create(fragmnet)
  effect.play()
  
  return {}
}