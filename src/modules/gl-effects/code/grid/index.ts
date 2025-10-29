import { createScript } from "../script"
import { Effect } from "../core"
import fragmnet from './shader'

createScript('Grid', async settings => {
  const effect = new Effect(settings)
  effect.create(fragmnet)
  effect.play()
})