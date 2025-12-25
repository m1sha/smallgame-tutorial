import { ScriptModule, ScriptSettings } from "../../../../../components/example"
import { EffectController } from '../core'
import fragmnet from './shader'
import { loadImage } from "smallgame"

export default async (settings: ScriptSettings): Promise<ScriptModule> => {
  using controller = new EffectController(settings)
  controller.create(fragmnet)

  const img = await loadImage('workflow.png')
  const tex = controller.effect.gl.createTexture('u_sampler2D', img)
  controller.play()

  return {
    dispose() { tex.remove() }
  }
}