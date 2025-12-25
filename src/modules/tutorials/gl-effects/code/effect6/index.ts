import { loadImage } from "smallgame"
import { ScriptModule, ScriptSettings } from "../../../../../components/example"
import { EffectController } from '../core'
import fragmnet from './shader'

export default async (settings: ScriptSettings): Promise<ScriptModule> => {
  using controller = new EffectController(settings)
  controller.create(fragmnet)
  const img = await loadImage('istockphoto-517188688-612x612.jpg')
  const tex = controller.effect.gl.createTexture('u_sampler2D', img)
  controller.play()

  return { dispose() { tex.remove } }
}