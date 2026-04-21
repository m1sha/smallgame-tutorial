import { displayFps } from "../../../../../utils/display-fps"
import { type ScriptModule, type ScriptSettings } from "../../../../../components/example"
import { AssetStore } from "./asset-store"
import { Asteroids } from "./asteroids"
import { Viewer } from "../../../../shared"

export default async ({ container, containerSize, fps, builders }: ScriptSettings): Promise<ScriptModule> => {
  const viewer = new Viewer(containerSize, container)
  await new AssetStore().load()
  const asteroids = new Asteroids(containerSize)
  asteroids.add(20)

  viewer.onFixedUpdate = () => {
    asteroids.calcCollision()
  }

  viewer.onFrameChanged = surface => {
    surface.clear()
    asteroids.draw(surface)
    displayFps(fps)
  }

  const ui = builders.ui()
  return {
    ui: ui.build(),
    dispose () { 
      viewer.remove() 
    }
  }
}
