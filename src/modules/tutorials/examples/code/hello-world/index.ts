import { loadImage, Point, Time, GMath, Surface } from "smallgame"
import { displayFps } from "../../../../../utils/display-fps"
import { type ScriptModule, type ScriptSettings } from "../../../../../components/example"
import { Viewer } from "../../../../shared"
import { UIBuilder } from "../../../../../components/example/code/ui"

export default async ({ container, width, height, fps }: ScriptSettings): Promise<ScriptModule> => {
  const viewer = new Viewer({ width, height }, container)
  const car = await loadImage('car-top-view/car.png')
  const road = await loadImage('car-top-view/roadNS.png')
  car.rect.center = viewer.surface.rect.center
  road.rect.center = viewer.surface.rect.center.shift(-30, 0)
  
  const drawRoad = (surface: Surface) => {
    const n = 32
    for (let i = -n; i < n; i++) {
      const rect = road.rect.shift(0, road.rect.height * i)
      if (viewer.surface.rect.overlaps(rect))
        surface.blit(road, rect)
    }
  }

  const velocity = Point.zero
  let accel = 2
  let speed = 0.8

  viewer.onKeyPressed = key => {
    viewer.offset = viewer.offset.shift(
      GMath.moveTowardsAccum(
        key.axises.negY().scale(accel), 
        velocity, 
        speed * Time.deltaTime
      )
    )
  }

  viewer.onViewportChanged = shift => road.rect.shiftSelf(shift.negY())

  viewer.onFrameChanged = surface => {
    surface.clear()
    drawRoad(surface)
    surface.blit(car, car.rect)
    displayFps(fps)
  }

  const ui = new UIBuilder()
  ui.tracker('Speed', 0.01, 3, 0.01, val => speed = val, speed)
  ui.tracker('Accel', 0.1, 15, 0.1, val => accel = val, accel)

  return {
    ui: ui.build(),
    dispose () { 
      viewer.remove() 
    }
  }
}
