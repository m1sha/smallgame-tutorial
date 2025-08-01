import { displayFps } from '../../../../utils/display-fps'
import { Game, loadImage, gameloop, Rect, Sketch, Surface, GlSurface } from 'smallgame'
import { createGLScript, GLScriptSettings } from '../script'
import { Tetris } from '../../../tetrix/tetris'
import { Effect } from './base/effect'
import vertex from './shaders/vert'
import fragmnet from './shaders/frag'
import fragmnet2 from './shaders/frag2'
import fragmnet3 from './shaders/frag3'
import fragmnet4 from './shaders/frag4'
import brokenTvFrag from './shaders/broken-tv.frag'
import { EffectPipeline } from './base/effect-pipeline'

createGLScript('Old TV', async setting => new App(setting, 768, 768).create())

class App {
  private bgColor = "#333"
  private tetris: Tetris
  private effectPipeline: EffectPipeline
  private shift_w = 166
  private shift_h = 340
  constructor (
    private setting: GLScriptSettings,
    public width: number, 
    public hight: number
  ) {
    const { shift_w, shift_h }  = this

    this.tetris = new Tetris(width - shift_w, hight - shift_h)
    
    this.effectPipeline = new EffectPipeline( [ 
      new Effect(width - shift_w, hight - shift_h, fragmnet2, vertex),
      //new Effect(width - shift_w, hight - shift_h, fragmnet3, vertex), // Pixel Filter 
      new Effect(width - shift_w, hight - shift_h, fragmnet4, vertex), 
      //new Effect(width , hight, fragmnet, vertex),   // Old TV Effect 
      new Effect(width - shift_w + 1, hight - shift_h + 10, brokenTvFrag, vertex), 
    ])
  }

  async create () {
    const { width, hight, shift_w, shift_h, setting, bgColor, tetris, effectPipeline } = this
    const { game, screen } = Game.create(width, hight, setting.container)
    const tvLayout = await loadImage('tv2.png')
    tvLayout.resize(width, hight)

    const viewport = new Rect(0, 0, width, hight)

    const border = this.createBorder(bgColor, width, hight, 80)
    const border2 = this.createBorder2('#000', 90, 84, width - shift_w, hight - shift_h, 20)

    gameloop(() => {
      let surface: Surface | GlSurface = tetris.nextFrame(game.event, game.key)

      if (setting.useShaders)
        surface = effectPipeline.build(surface)

      
      screen.fill(bgColor)
      //screen.blit(border2, border2.rect)
      //screen.blit(border, border.rect)
      screen.blit(surface, surface.rect.moveSelf(81, 86))
      
      screen.blit(tvLayout, tvLayout.rect)
      displayFps(setting.fps)
    })
  }

  private createBorder (color: string, w: number, h: number, radius: number) {
    const sketch = new Sketch()
    sketch.rect({ stroke: color, lineWidth: radius }, new Rect(0, 0, w, h))
    return sketch.toSurface()
  }

  private createBorder2 (color: string, x: number, y: number, w: number, h: number, radius: number) {
    const sketch = new Sketch()
    sketch.rect({ stroke: color, lineWidth: radius }, new Rect(x, y, w, h))
    return sketch.toSurface()
  }

}


