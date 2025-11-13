import { loadImage, Point, Game, gameloop, Time, GMath } from "smallgame"
import { displayFps } from "../../../../../utils/display-fps"
import { type ScriptModule, type ScriptSettings } from "../../../../../components/example"

export default async ({ container, width, height, fps }: ScriptSettings): Promise<ScriptModule> => {
  const HERO_SPEED       = 20
  const HERO_ACCEL       = 1.5
  const { game, screen } = Game.create(width, height, container)
  const velocity         = Point.zero
  const car              = await loadImage('car.png')
  car.rect.center        = screen.rect.center

  gameloop(() => {
    car.rect.shiftSelf(
      GMath.moveTowardsAccum(
        game.key.axises.scale(HERO_SPEED), 
        velocity, 
        HERO_ACCEL * Time.deltaTime
      )
    )

    screen.fill('#888')
    screen.blit(car, car.rect)

    displayFps(fps)
  })

  return {
    parameters: [],
    dispose () { 
      game.kill() 
    }
  }
}
