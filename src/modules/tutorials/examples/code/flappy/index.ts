import { Key } from "smallgame"
import { displayFps } from "../../../../../utils/display-fps"
import { type ScriptModule, type ScriptSettings } from "../../../../../components/example"
import { Bird } from "./bird"
import { Pillars } from "./pillars"
import { Viewer } from "../../../../shared"

export default async ({ container, width, height, fps }: ScriptSettings): Promise<ScriptModule> => {
  const viewer = new Viewer({ width, height}, container)
  const bird = new Bird({width, height})
  const pillars = new Pillars({width, height})

  bird.rect.moveSelf(300, height / 2)

  viewer.onKeyPressed = key => {
    if (key.getPressed()[Key.SPACE]){
      bird.raise()
    } else {
      bird.update()
    }
  }

  viewer.onFrameChanged = (surface => {
    surface.clear()
    surface.blit(bird.image, bird.rect)
    pillars.draw(surface)
    pillars.outsideRect(surface.rect, s => pillars.remove(s) )
    displayFps(fps)
  })

  return {
    parameters: [],
    dispose () { 
      viewer.remove() 
    }
  }
}
