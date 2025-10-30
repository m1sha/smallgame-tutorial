import { Game, gameloop, loadImage } from "smallgame"
import { type ScriptModule, type ScriptSettings } from "../../../../components/example"
import { displayFps } from "../../../../utils/display-fps"
import { TiledSurfaceGl } from "smallgame/src/surface-gl/tiled-surface-gl"

export default async ({ container, width, height, fps }: ScriptSettings): Promise<ScriptModule> => {
  const img = await loadImage('terrain.png')

  const surface = new TiledSurfaceGl(width, height)
  surface.imageRendering = 'pixelated'
  surface.create()

  surface.addTilemaps([img])
  surface.drawTiles()

  
  const { screen } = Game.create(width, height, container)

  gameloop(() => {
    screen.fill('#92fadbff')
    screen.blit(surface, surface.rect)
    displayFps(fps)
  })
  return {}
}