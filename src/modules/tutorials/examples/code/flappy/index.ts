import { Key } from "smallgame"
import { displayFps } from "../../../../../utils/display-fps"
import { type ScriptModule, type ScriptSettings } from "../../../../../components/example"
import { Bird } from "./bird"
import { Pillars } from "./pillars"
import { Viewer } from "../../../../shared"

export default async ({ container, containerSize, fps }: ScriptSettings): Promise<ScriptModule> => {
  const viewer = new Viewer(containerSize, container)
  const bird = new Bird(containerSize)
  const pillars = new Pillars(containerSize)

  bird.rect.moveSelf(300, containerSize.height / 2)

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
    dispose () { 
      viewer.remove() 
    }
  }
}
