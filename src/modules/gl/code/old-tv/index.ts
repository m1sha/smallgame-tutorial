import { Game, loadImage, gameloop, Rect, Time, Sketch } from 'smallgame'
import { createGLScript, GLScriptSettings } from '../script'
import { Tetris } from '../../../tetrix/tetris'
import { createOldTVEffect } from './old-tv'

createGLScript('Old TV', async setting => {
  await main(setting)
})


async function main (setting: GLScriptSettings) {
  const w = 1024 
  const h = 768
  const bgColor = "#111111"
  const { game, screen } = Game.create(w, h, setting.container)
  
  const tetris = new Tetris(w, h) 

  const oldTVEffect = createOldTVEffect(w, h)

  const tvLayout = await loadImage('tv.png')
  tvLayout.resize(w, h)
  const border = createBorder(bgColor, w, h, 50)
  
  screen.fill(bgColor)
  let i = 0.0

  gameloop(() => {
    setting.fps.textContent = Time.fps.toFixed(0)
    
    const surface = tetris.nextFrame(game.event, game.key)
    oldTVEffect.applyEffect(surface)
   
    screen.fill(bgColor)

    if (setting.useShaders)
      screen.blit(oldTVEffect.surface, oldTVEffect.surface.rect)
    else 
     screen.blit(surface, surface.rect)

    screen.blit(border, border.rect)
    screen.blit(tvLayout, tvLayout.rect)
    
    i += 0.01
    oldTVEffect.tick(i)
  })
}

function createBorder (color: string, w: number, h: number, radius: number) {
  const sketch = new Sketch()
  sketch.rect({ stroke: color, lineWidth: radius }, new Rect(0, 0, w, h))
  return sketch.toSurface()
}