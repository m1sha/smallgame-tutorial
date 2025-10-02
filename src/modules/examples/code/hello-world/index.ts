import { loadImage, Point, Game, gameloop, lerp, Time } from "smallgame"
import { createScript } from "../script"
import { displayFps } from "../../../../utils/display-fps"

createScript('Hello World', async ({ container, width, height, fps }) => {
  const HERO_SPEED       = 20
  const HERO_ACCEL       = 1.5
  const { game, screen } = Game.create(width, height, container)
  const velocity         = Point.zero
  const car              = await loadImage('car.png')
  car.rect.center = screen.rect.center

  gameloop(() => {
    car.rect.shiftSelf(
      lerp(
        game.key.axises.scale(HERO_SPEED), 
        velocity, 
        HERO_ACCEL * Time.deltaTime
      )
    )

    screen.fill(0xFFFFFF00)
    screen.blit(car, car.rect)

    displayFps(fps)
  })
})