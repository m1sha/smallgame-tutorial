import { loadImage } from "smallgame"
import { ScriptModule, ScriptSettings } from "../../../../../components/example"
import { EffectController } from '../core'
import fragmnet from './shader'

export default async (settings: ScriptSettings): Promise<ScriptModule> => {
  using controller = new EffectController(settings)
  controller.create(fragmnet)
  const img = await loadImage('beautiful-fall-nature-scenery-picjumbo-com.jpeg')
  const tex = controller.effect.gl.createTexture('u_sampler2D', img)
  controller.play()

  return { dispose() { tex.delete } }
}