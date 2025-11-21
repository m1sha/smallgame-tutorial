import { Game, gameloop, Rect, Group, Key,  } from "smallgame"
import { displayFps } from "../../../../../utils/display-fps"
import { createButton, createSelect, createTracker, type ScriptModule, type ScriptSettings } from "../../../../../components/example"
import { setDebounce } from "smallgame/src/time"
import { Hero } from "./hero"
import { Background } from "./background"
import { TelemetryBuilder } from "../../../../../components/example/code/telemetry"

export default async ({ container, width, height, fps }: ScriptSettings): Promise<ScriptModule> => {
  const telemetry = new TelemetryBuilder()
  const { game, screen } = Game.create(width, height, container)

  let needClearScreen = true

  const background = new Background()
  await background.create()
  const hero = new Hero()
  await hero.create()
  hero.setPos(screen.rect.center)
  hero.setGoal(screen.rect.center)
  background.pos = hero.pos
  
  const group = new Group()
  const bounds = Rect.zero.resizeSelf(width, height)

  const moveLeft = setDebounce(() => hero.turn('left'), 30)
  const moveRight = setDebounce(() => hero.turn('right'), 30)
 
  screen.fill('#114227ff')
  background.draw(screen as any)
  
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
    if (!hero.moveSelf) background.pos = hero.pos
    if (needClearScreen) {
      screen.fill('#114227ff')
      background.draw(screen as any)
    }
    hero.draw(screen as any)
    group.draw(screen as any)

    displayFps(fps)
    telemetry.tick()
  })

  const clearScreenParam = createSelect('Clear Screen', ['Yes', 'No'], v => needClearScreen = v == 'Yes', 'Yes')
  const shipTypeParam = createSelect('Ship type', ['Fighter', 'Fighter 2', 'Fighter 3', 'Fighter 4',  'Alien', 'Alien 2', 'Frigate', 'Cruiser', 'Destroyer 1', 'Destroyer 2', 'Huge'], v => hero.setSkin(v), 'Fighter')
  const moveTypeParam = createSelect('Movement Object', ['Ship', 'World'], v => hero.moveSelf = v == 'Ship', 'Ship')
  const speedParam = createTracker('Speed', 0.1, 30, 0.1, v=> hero.speed = v, hero.speed, 'Ship Movement')
  // const angleParam = createTracker('Rot Angle', 0.1, 15, 0.1, v=> hero.rotation_step = v, hero.rotation_step)
  const smoothTimeParam = createTracker('Friction', 0.01, 10, 0.01, v=> hero.smoothTime = v, hero.smoothTime, 'Ship Movement')
  
  const angleDeltaTimeMultiParam = createTracker('Rotation Speed', 1, 300, 1, v => hero.angleDeltaTimeMulti = v, hero.angleDeltaTimeMulti, 'Ship Rotation')
  const torqueForceParam = createTracker('Torque Force', 1, 600, 1, v => hero.torqueForce = v, hero.torqueForce, 'Ship Rotation')
  const inertiaParam = createTracker('inertia', 0.1, 20, 0.01, v => hero.inertia = v, hero.inertia, 'Ship Rotation')
  const angularDragParam = createTracker('Angular Drag', 0.01, 1, 0.01, v => hero.angularDrag = v, hero.angularDrag, 'Ship Rotation')
  const getbackParam = createButton('Get back the hero', () => hero.getBack(screen.rect.center))

  telemetry.open()
  telemetry.param('Angle', () => hero.rigid.angle.toFixed(4))
  telemetry.param('Angular Velocity', () => hero.rigid.angularVelocity.toFixed(4))
  telemetry.param('X Velocity', () => hero.currentVelocity.x.value.toFixed(4))
  telemetry.param('Y Velocity', () => hero.currentVelocity.y.value.toFixed(4))
  telemetry.param('X Pos', () => hero.pos.x.toFixed(4))
  telemetry.param('Y Pos', () => hero.pos.y.toFixed(4))

  return {
    parameters: [clearScreenParam, shipTypeParam, moveTypeParam, speedParam, /*angleParam,*/ smoothTimeParam, angleDeltaTimeMultiParam, torqueForceParam, inertiaParam, angularDragParam, getbackParam],
    telemetry: telemetry.build(),
    dispose () { 
      game.kill() 
    }
  }
}
