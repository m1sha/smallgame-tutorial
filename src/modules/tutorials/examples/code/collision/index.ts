import { Game, gameloop, MemSurface } from "smallgame"
import { displayFps } from "../../../../../utils/display-fps"
import { type ScriptModule, type ScriptSettings } from "../../../../../components/example"
import { UIBuilder } from "../../../../../components/example/code/ui"
import { AssetStore } from "./asset-store"
import { Asteroids } from "./asteroids"

export default async ({ container, width, height, fps }: ScriptSettings): Promise<ScriptModule> => {
  const { game, screen } = Game.create(width, height, container)
  const surface = new MemSurface({ width, height })

  await new AssetStore().load()
  const asteroids = new Asteroids({ width, height })
  asteroids.add(20)
  

  gameloop(() => {
    surface.fill("#212121")
    asteroids.calcCollision()
    asteroids.draw(surface)
    screen.blit(surface, surface.rect)

    displayFps(fps)
  })

  const ui = new UIBuilder()
  return {
    ui: ui.build(),
    dispose () { 
      game.kill() 
    }
  }
}
