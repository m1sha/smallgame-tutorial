import { Game, gameloop } from "smallgame"
import { createGLScript } from "../script"
import { displayFps } from "../../../../utils/display-fps"
import ParticleSystemSurfaceGl from "smallgame/src/surface-gl/particle-system-surface-gl"

createGLScript('Particle System', async ({ container, fps }) => {
  const w = 800
  const h = 800

  const surface = new ParticleSystemSurfaceGl(w, h)
  const ctx = surface.context

  //surface.

  
  const { screen } = Game.create(w, h, container)

  gameloop(() => {
    screen.fill('#92fadbff')
    screen.blit(surface, surface.rect)
    displayFps(fps)
  })
})