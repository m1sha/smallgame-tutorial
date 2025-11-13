import { loadImage, Point, Game, gameloop, Time, GMath, Rect, Group, Key,  } from "smallgame"
import { displayFps } from "../../../../../utils/display-fps"
import { createButton, createSelect, createTracker, type ScriptModule, type ScriptSettings } from "../../../../../components/example"
import { setDebounce } from "smallgame/src/time"
import { Hero } from "./hero"

export default async ({ container, width, height, fps }: ScriptSettings): Promise<ScriptModule> => {
  const { game, screen } = Game.create(width, height, container)

  const bg = await loadImage('space-fighter/Backgrounds/4.png')

  let needClearScreen = true

  const hero = new Hero(bg, screen.rect.center)
  await hero.create()
  hero.setPos(screen.rect.center)
  hero.setGoal(screen.rect.center)
  
  const group = new Group()
  const bounds = Rect.zero.resizeSelf(width, height)

  const moveLeft = setDebounce(() => hero.turn('left'), 30)
  const moveRight = setDebounce(() => hero.turn('right'), 30)
 
  //screen.fill('#114227ff')
  bg.rect.center = hero.rect.center
  //hero.pos = bg.rect.center
  //hero.goal = bg.rect.center
  screen.blit(bg, bg.rect)
  gameloop(() => {
    const keys = game.key.getPressed()

    if (keys[Key.LEFT]) {
      debugger
      moveLeft()
    } else if (keys[Key.RIGHT]) {
      moveRight()
    } 

    if (keys[Key.UP]) {
      hero.forward()
    } else if (keys[Key.DOWN]) {
      hero.backward()
    } else {
      hero.stop()
    }

    if (keys[Key.SPACE]) {
      //group.add(new Bullet(Point.from(hero.rect!.absCenter), new Point(hero.cos_a / 2.0, hero.sin_a  / 2.0)))
    }

    group.outsideRect(bounds, bullet => group.remove(bullet))

    if (needClearScreen) screen.blit(bg, bg.rect)//screen.fill('#114227ff')
    hero.draw(screen as any)
    group.draw(screen as any)

    displayFps(fps)
  })

  const clearScreenParam = createSelect('Clear Screen', ['Yes', 'No'], v => needClearScreen = v == 'Yes', 'Yes')
  const shipTypeParam = createSelect('Ship type', ['Fighter', 'Alien', 'Alien 2', 'Frigate', 'Cruiser'], v => hero.setSkin(v), 'Fighter')
  const moveTypeParam = createSelect('Movement', ['Ship', 'World'], v => hero.moveSelf = v == 'Ship', 'Ship')
  const speedParam = createTracker('Speed', 0.1, 15, 0.1, v=> hero.speed = v, hero.speed)
  // const angleParam = createTracker('Rot Angle', 0.1, 15, 0.1, v=> hero.rotation_step = v, hero.rotation_step)
  const smoothTimeParam = createTracker('SmoothTime', 0.01, 10, 0.01, v=> hero.smoothTime = v, hero.smoothTime)
  const deltaTimeMultiParam = createTracker('Movement Speed', 0.01, 10, 0.01, v=> hero.deltaTimeMulti = v, hero.deltaTimeMulti)
  const angleDeltaTimeMultiParam = createTracker('Rotation Speed', 1, 300, 1, v => hero.angleDeltaTimeMulti = v, hero.angleDeltaTimeMulti)
  const torqueForceParam = createTracker('Torque Force', 1, 600, 1, v => hero.torqueForce = v, hero.torqueForce)
  const getbackParam = createButton('Get back the hero', () => hero.getBack(screen.rect.center))

  return {
    parameters: [clearScreenParam, shipTypeParam, moveTypeParam, speedParam, /*angleParam,*/ smoothTimeParam, deltaTimeMultiParam, angleDeltaTimeMultiParam, torqueForceParam, getbackParam],
    dispose () { 
      game.kill() 
    }
  }
}
