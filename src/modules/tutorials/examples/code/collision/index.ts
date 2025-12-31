import { displayFps } from "../../../../../utils/display-fps"
import { type ScriptModule, type ScriptSettings } from "../../../../../components/example"
import { UIBuilder } from "../../../../../components/example/code/ui"
import { AssetStore } from "./asset-store"
import { Asteroids } from "./asteroids"
import { Viewer } from "../../../../shared"

export default async ({ container, width, height, fps }: ScriptSettings): Promise<ScriptModule> => {
  const viewer = new Viewer({ width, height}, container)
  await new AssetStore().load()
  const asteroids = new Asteroids({ width, height })
  asteroids.add(20)

  viewer.onFrameChanged = surface => {
    surface.clear()
    asteroids.calcCollision()
    asteroids.draw(surface)
    displayFps(fps)
  }

  const ui = new UIBuilder()
  return {
    ui: ui.build(),
    dispose () { 
      viewer.remove() 
    }
  }
}
