import { ScriptModule, ScriptSettings } from "../../../../../components/example"
import { Effect } from '../core'
import fragmnet from './shader'
import { loadImage } from "smallgame"

export default async (settings: ScriptSettings): Promise<ScriptModule> => {
  using effect = new Effect(settings)
  effect.create(fragmnet)

  const img = await loadImage('workflow.png')
  const tex = effect.gl.createTexture('u_sampler2D', img)
  effect.play()

  return {
    dispose() { tex.delete() }
  }
}