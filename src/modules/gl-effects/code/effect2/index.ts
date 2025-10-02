import { createScript } from "../script"
import { Effect } from '../core'
import fragmnet from './shader'
import { loadImage } from "smallgame"

createScript('Effect 2', async settings => {
  const effect = new Effect(settings)
  effect.create(fragmnet)

  const img = await loadImage('workflow.png')
    effect.gl.createTexture('u_sampler2D', img)
  effect.play()
})