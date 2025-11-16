import { Game, gameloop, Key, setSize } from "smallgame"
import { displayFps } from "../../../../../utils/display-fps"
import { createButton, createSelect, createTracker, type ScriptModule, type ScriptSettings } from "../../../../../components/example"
import { Shooter } from "./shooter"
import { setDebounce } from "smallgame/src/time"
import { Missiles } from "./missiles"
import { Asteroids } from "./asteroids"
import { asteroidsSettings } from "./asteroid-setting"
import { World } from "./world"

export default async ({ container, width, height, fps }: ScriptSettings): Promise<ScriptModule> => {
  const { game, screen } = Game.create(width, height, container)

  const world = new World(setSize(800, screen.size.height))
  await world.create()
  world.rect.center = screen.rect.center
  
  const shooter = new Shooter()  
  await shooter.create()
  const missiles = new Missiles()
  await missiles.create()
  shooter.setPos(screen.rect.center.shiftY(screen.size.height * 0.42))
  shooter.setMissile(missiles)

  const fireTrigger = setDebounce(() => shooter.fire(), 250)

  const asteroids = new Asteroids(screen.size, asteroidsSettings)
  
  

  gameloop(() => {
    shooter.move(game.key.horizontalAxis)

    if (game.key.getPressed()[Key.SPACE]) {
      fireTrigger()
    }

    screen.fill('#7c7c7cff')
    world.draw(screen)
    
    missiles.draw(screen as any)
    asteroids.draw(screen as any)
    shooter.draw(screen)
    displayFps(fps)

    missiles.collideGroup(asteroids, (m, a) => {
      missiles.remove(m)
      asteroids.remove(a)
    })
  })


  const shooterSpeedParam = createTracker('Shooter Speed', 0.1, 10, 0.1, v => shooter.movementSpeed = v, shooter.movementSpeed)
  const shooterAccelParam = createTracker('Shooter Accel', 0.1, 10, 0.1, v => shooter.movementAccel = v, shooter.movementAccel)

  const missileTypeParam = createSelect('Type', ['Type 1', 'Type 2'], v => missiles.type = v === 'Type 1' ? 1:2, 'Type 1', 'Missiles')
  const missilePerShootParam = createSelect('Missiles Per Shoot', ['1', '2', '3'], v => missiles.missilePerShoot = +v, '1', 'Missiles')
  const missileSpeedParam = createTracker('Speed', 0.1, 3, 0.1, v => missiles.speed = v, missiles.speed, 'Missiles')

  const genTime0Param = createTracker('Gen Time', 1000, 20000, 100, v => asteroidsSettings[0].genTime = v, asteroidsSettings[0].genTime, 'Asteroid Type 1')
  const speed0Param = createTracker('Speed', 0.1, 4, 0.01, v => asteroidsSettings[0].speed = v, asteroidsSettings[0].speed, 'Asteroid Type 1')
  const angularSpeed0Param = createTracker('Angular Speed', 1, 20, 1, v => asteroidsSettings[0].angularSpeed = v, asteroidsSettings[0].angularSpeed, 'Asteroid Type 1')
  const maxCountd0Param = createTracker('Max Count', 0, 10, 1, v => asteroidsSettings[0].maxCount = v, asteroidsSettings[0].maxCount, 'Asteroid Type 1')

  const genTime1Param = createTracker('Gen Time', 1000, 20000, 100, v => asteroidsSettings[1].genTime = v, asteroidsSettings[1].genTime, 'Asteroid Type 2')
  const speed1Param = createTracker('Speed', 0.1, 4, 0.01, v => asteroidsSettings[1].speed = v, asteroidsSettings[1].speed, 'Asteroid Type 2')
  const angularSpeed1Param = createTracker('Angular Speed', 1, 20, 1, v => asteroidsSettings[1].angularSpeed = v, asteroidsSettings[1].angularSpeed, 'Asteroid Type 2')
  const maxCountd1Param = createTracker('Max Count', 0, 10, 1, v => asteroidsSettings[1].maxCount = v, asteroidsSettings[1].maxCount, 'Asteroid Type 2')

  const genTime2Param = createTracker('Gen Time', 1000, 20000, 100, v => asteroidsSettings[2].genTime = v, asteroidsSettings[2].genTime, 'Asteroid Type 3')
  const speed2Param = createTracker('Speed', 0.1, 4, 0.01, v => asteroidsSettings[2].speed = v, asteroidsSettings[2].speed, 'Asteroid Type 3')
  const angularSpeed2Param = createTracker('Angular Speed', 1, 20, 1, v => asteroidsSettings[2].angularSpeed = v, asteroidsSettings[2].angularSpeed, 'Asteroid Type 3')
  const maxCountd2Param = createTracker('Max Count', 0, 10, 1, v => asteroidsSettings[2].maxCount = v, asteroidsSettings[2].maxCount, 'Asteroid Type 3')

  const genTime3Param = createTracker('Gen Time', 1000, 20000, 100, v => asteroidsSettings[3].genTime = v, asteroidsSettings[3].genTime, 'Asteroid Type 4')
  const speed3Param = createTracker('Speed', 0.1, 4, 0.01, v => asteroidsSettings[3].speed = v, asteroidsSettings[3].speed, 'Asteroid Type 4')
  const angularSpeed3Param = createTracker('Angular Speed', 1, 20, 1, v => asteroidsSettings[3].angularSpeed = v, asteroidsSettings[3].angularSpeed, 'Asteroid Type 4')
  const maxCountd3Param = createTracker('Max Count', 0, 10, 1, v => asteroidsSettings[3].maxCount = v, asteroidsSettings[3].maxCount, 'Asteroid Type 4')

  const genTime4Param = createTracker('Gen Time', 1000, 20000, 100, v => asteroidsSettings[4].genTime = v, asteroidsSettings[4].genTime, 'Asteroid Type 5')
  const speed4Param = createTracker('Speed', 0.1, 4, 0.01, v => asteroidsSettings[4].speed = v, asteroidsSettings[4].speed, 'Asteroid Type 5')
  const angularSpeed4Param = createTracker('Angular Speed', 1, 20, 1, v => asteroidsSettings[4].angularSpeed = v, asteroidsSettings[4].angularSpeed, 'Asteroid Type 5')
  const maxCountd4Param = createTracker('Max Count', 0, 10, 1, v => asteroidsSettings[4].maxCount = v, asteroidsSettings[4].maxCount, 'Asteroid Type 5')

  const genTime5Param = createTracker('Gen Time', 1000, 20000, 100, v => asteroidsSettings[5].genTime = v, asteroidsSettings[5].genTime, 'Asteroid Type 6')
  const speed5Param = createTracker('Speed', 0.1, 4, 0.01, v => asteroidsSettings[5].speed = v, asteroidsSettings[5].speed, 'Asteroid Type 6')
  const angularSpeed5Param = createTracker('Angular Speed', 1, 20, 1, v => asteroidsSettings[5].angularSpeed = v, asteroidsSettings[5].angularSpeed, 'Asteroid Type 6')
  const maxCountd5Param = createTracker('Max Count', 0, 10, 1, v => asteroidsSettings[5].maxCount = v, asteroidsSettings[5].maxCount, 'Asteroid Type 6')


  const removeAllBtn = createButton('Clear All Asteroids', () => asteroids.removeAll())

  return {
    parameters: [
      shooterSpeedParam, 
      shooterAccelParam,
      removeAllBtn,

      missileTypeParam,
      missilePerShootParam,
      missileSpeedParam,

      genTime0Param,
      speed0Param,
      angularSpeed0Param,
      maxCountd0Param,

      genTime1Param,
      speed1Param,
      angularSpeed1Param,
      maxCountd1Param,

      genTime2Param,
      speed2Param,
      angularSpeed2Param,
      maxCountd2Param,

      genTime3Param,
      speed3Param,
      angularSpeed3Param,
      maxCountd3Param,

      genTime4Param,
      speed4Param,
      angularSpeed4Param,
      maxCountd4Param,

      genTime5Param,
      speed5Param,
      angularSpeed5Param,
      maxCountd5Param,
    ],
    dispose () { 
      game.kill() 
    }
  }
}
