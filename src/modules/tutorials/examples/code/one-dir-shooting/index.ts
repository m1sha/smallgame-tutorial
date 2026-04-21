import { Key, setSize } from "smallgame"
import { displayFps } from "../../../../../utils/display-fps"
import { type ScriptModule, type ScriptSettings } from "../../../../../components/example"
import { Shooter } from "./shooter"
import { setDebounce } from "smallgame/src/time"
import { Missiles } from "./missiles"
import { Asteroids } from "./asteroids"
import { asteroidsSettings } from "./asteroid-setting"
import { World } from "./world"
import { Viewer } from "../../../../shared"

export default async ({ container, containerSize, fps, builders }: ScriptSettings): Promise<ScriptModule> => {
  const viewer = new Viewer(containerSize, container)

  const world = new World(setSize(800, viewer.surface.rect.height))
  await world.create()
  world.rect.center = viewer.surface.rect.center
  
  const shooter = new Shooter()  
  await shooter.create()
  const missiles = new Missiles()
  await missiles.create()
  shooter.setPos(viewer.surface.rect.center.shiftY(viewer.surface.rect.height * 0.42))
  shooter.setMissile(missiles)

  const fireTrigger = setDebounce(() => shooter.fire(), 250)

  const asteroids = new Asteroids(viewer.surface.rect, asteroidsSettings)
  
  viewer.onKeyPressed = key => {
    shooter.move(key.horizontalAxis)
    if (key.getPressed()[Key.SPACE]) {
      fireTrigger()
    }
  }

  viewer.onFrameChanged = (surface => {
    
    surface.clear()
    world.draw(surface)
    
    missiles.draw(surface)
    asteroids.draw(surface)
    shooter.draw(surface)
    displayFps(fps)

    missiles.collideGroup(asteroids, (m, a) => {
      missiles.remove(m)
      asteroids.remove(a)
    })
  })

  const ui = builders.ui()

  ui.tracker('Shooter Speed', 0.1, 10, 0.1, v => shooter.movementSpeed = v, shooter.movementSpeed)
  ui.tracker('Shooter Accel', 0.1, 10, 0.1, v => shooter.movementAccel = v, shooter.movementAccel)

  ui.group('Missiles', gr => gr.open()
    .select('Type', ['Type 1', 'Type 2'], v => missiles.type = v === 'Type 1' ? 1:2, 'Type 1')
    .select('Missiles Per Shoot', ['1', '2', '3'], v => missiles.missilePerShoot = +v, '1')
    .tracker('Speed', 0.1, 3, 0.1, v => missiles.speed = v, missiles.speed)
  )

  for (let i = 0; i < 6; i++)
    ui.group('Asteroid Type ' + (i + 1), gr => gr
      .tracker('Gen Time', 1000, 20000, 100, v => asteroidsSettings[i].genTime = v, asteroidsSettings[i].genTime)
      .tracker('Speed', 0.1, 4, 0.01, v => asteroidsSettings[i].speed = v, asteroidsSettings[i].speed)
      .tracker('Angular Speed', 1, 20, 1, v => asteroidsSettings[i].angularSpeed = v, asteroidsSettings[i].angularSpeed)
      .tracker('Max Count', 0, 10, 1, v => asteroidsSettings[i].maxCount = v, asteroidsSettings[i].maxCount)
    )

  ui.button('Clear All Asteroids', () => asteroids.removeAll())

  return {
    ui: ui.build(),
    dispose () { 
      viewer.remove() 
    }
  }
}
