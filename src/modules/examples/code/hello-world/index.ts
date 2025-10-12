import { loadImage, Point, Game, gameloop, Time, TPoint, lerp } from "smallgame"
import { createScript } from "../script"
import { displayFps } from "../../../../utils/display-fps"

// function lerp (p0: TPoint, p1: TPoint, t: number): TPoint {
//   const l = (a: number, b: number) => a + (b - a) * t
//   return {
//     x: l(p0.x, p1.x),
//     y: l(p0.y, p1.y),
//   }
// }

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