import { EffectController } from '../core'
import fragmnet from './shader'
import { ScriptModule, ScriptSettings } from "../../../../../components/example"
import { Point } from 'smallgame'

export default async (settings: ScriptSettings): Promise<ScriptModule> => {
  using effect = new EffectController(settings)
  effect.create(fragmnet)
  effect.effect.gl.uniform('u_cellSize', 'vec2').value = new Point(64, 64).arr()
  effect.play()

  return {}
}

