import { Effect } from "./base/effect";
import { EffectPipeline } from "./base/effect-pipeline";
import vertex from './shaders/vert'
import tvColors from './shaders/tv-colors.frag'
import fragmnet4 from './shaders/frag4'
import brokenTvFrag from './shaders/broken-tv.frag'
import marcoPixel from './shaders/marco-pixel.frag'
import mblur from './shaders/mblur'

export function createEffectPipeline (width: number, hight: number) {
  return new EffectPipeline( [ 
    
    new Effect(width, hight, marcoPixel, vertex),
    
    //new Effect(width, hight, tvColors, vertex),
    new Effect(width, hight, fragmnet4, vertex), 
    new Effect(width, hight, brokenTvFrag, vertex), 
    new Effect(width, hight, mblur, vertex),
  ])
}