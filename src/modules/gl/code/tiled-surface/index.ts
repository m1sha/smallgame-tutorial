import { Game, gameloop, loadImage } from "smallgame"
import { createGLScript } from "../script"
import { displayFps } from "../../../../utils/display-fps"
import { TiledSurfaceGl } from "smallgame/src/surface-gl/tiled-surface-gl"

createGLScript('Tiled Surface', async ({ container, fps }) => {
  const w = 800
  const h = 800

  const img = await loadImage('terrain.png')

  const surface = new TiledSurfaceGl(w, h)
  surface.imageRendering = 'pixelated'
  surface.create()

  surface.addTilemaps([img])
  surface.drawTiles()

  
  const { screen } = Game.create(w, h, container)

  gameloop(() => {
    screen.fill('#92fadbff')
    screen.blit(surface, surface.rect)
    displayFps(fps)
  })
})