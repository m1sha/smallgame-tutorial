import { Effect } from "./base/effect";
import { EffectPipeline } from "./base/effect-pipeline";
import vertex from './shaders/vert'
import fragmnet2 from './shaders/frag2'
import fragmnet4 from './shaders/frag4'
import brokenTvFrag from './shaders/broken-tv.frag'

export function createEffectPipeline (width: number, hight: number) {
  return new EffectPipeline( [ 
    //new Effect(width, hight, fragmnet2, vertex),
    new Effect(width, hight, fragmnet4, vertex), 
    new Effect(width, hight, brokenTvFrag, vertex), 
  ])
}