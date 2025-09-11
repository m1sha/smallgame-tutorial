import { Game, SurfaceGL, Rect, loadImage, gameloop } from 'smallgame'
import { createGLScript } from '../script'
import { displayFps } from '../../../../utils/display-fps'
import { createCrossSurface } from './helpers'

createGLScript('SurfaceGL v2', async ({ container, fps }) => {
  const tilemap = await loadImage('terrain.png')
  const maskDude = await loadImage('maskDude.png')
  
  const w = 800
  const h = 800

  // const surface = new SurfaceGL(w, h, { coordinateSystem: 'screen' })
  
  // surface.imageRendering = 'pixelated'
  // surface.create()

  const s = 32
  const d = 128
  const { screen } = Game.create(w, h, container)
  const cross = createCrossSurface(w, h)
  let x = 0
  let i = 0

  const tv = await loadImage('tv.png')
  const surface2 = new SurfaceGL(w, h, { coordinateSystem: 'screen' })
  surface2.create()
  

  // gameloop(() => {
    screen.fill('#d4d1fcff')
    //surface.clear()
    //surface.blit(tilemap, tilemap.rect)
  //   surface.blita(0.8, maskDude, new Rect(0, 0, d , d), new Rect(x, 0,  s, s))
    surface2.clear()
    surface2.blit(tv, tv.rect)
    screen.blit(surface2, surface2.rect)
    //screen.blit(surface, surface.rect)
  //   screen.blit(cross, cross.rect)
  //   displayFps(fps)

  //   i += 0.1
  //   x = s * (0 | i)
  //   if (i > 10) i = 0
  // })
})
