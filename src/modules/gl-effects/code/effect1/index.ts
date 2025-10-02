import { createScript } from "../script"
import { Effect } from '../core'
import fragmnet from './shader'

createScript('Effect 1', async settings => {
  const effect = new Effect(settings)
  effect.create(fragmnet)
  effect.play()
})