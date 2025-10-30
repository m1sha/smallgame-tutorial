import { Game, gameloop } from "smallgame"
import { type ScriptModule, type ScriptSettings } from "../../../../components/example"
import { displayFps } from "../../../../utils/display-fps"
import ParticleSystemSurfaceGl from "smallgame/src/surface-gl/particle-system-surface-gl"

export default async ({ container, width, height, fps }: ScriptSettings): Promise<ScriptModule> => {
  const surface = new ParticleSystemSurfaceGl(width, height)
  const ctx = surface.context

  //surface.

  
  const { screen } = Game.create(width, height, container)

  gameloop(() => {
    screen.fill('#92fadbff')
    screen.blit(surface, surface.rect)
    displayFps(fps)
  })

  return {}
}