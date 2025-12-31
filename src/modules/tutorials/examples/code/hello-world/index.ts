import { loadImage, Point, Time, GMath } from "smallgame"
import { displayFps } from "../../../../../utils/display-fps"
import { type ScriptModule, type ScriptSettings } from "../../../../../components/example"
import { Viewer } from "../../../../shared"

export default async ({ container, width, height, fps }: ScriptSettings): Promise<ScriptModule> => {
  const HERO_SPEED = 20
  const HERO_ACCEL = 1.5
  const viewer = new Viewer({ width, height }, container)
  const velocity = Point.zero
  const car = await loadImage('car-top-view/car.png')
  car.rect.center  = viewer.surface.rect.center

  viewer.onKeyPressed = key => {
    car.rect.shiftSelf(
      GMath.moveTowardsAccum(
        key.axises.scale(HERO_SPEED), 
        velocity, 
        HERO_ACCEL * Time.deltaTime
      )
    )
  }

  viewer.onFrameChanged = surface => {
    surface.clear()
    surface.blit(car, car.rect)
    displayFps(fps)
  }

  return {
    parameters: [],
    dispose () { 
      viewer.remove() 
    }
  }
}
