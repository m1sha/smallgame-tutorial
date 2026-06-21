import { Viewer } from "../../../shared"
import { displayFps } from "../../../../utils/display-fps"
import { type ScriptModule, type ScriptSettings } from "../../../../components/example"
import { Key, Rect, Sketch, Time } from "smallgame"

import { Player } from "./player"
import { VectorEditor } from "../../../shared/vector-editor"
import { Platforms } from "./platforms"
import platformsData from "./platforms-data"

export default async ({ container, containerSize, fps, builders }: ScriptSettings): Promise<ScriptModule> => {
  const viewer = new Viewer(containerSize, container, { disableContextMenu: true })
  const editor = new VectorEditor(viewer.surface)
  editor.useEditor(false)

  const telemetry = builders.telemetry()
  const ui = builders.ui()

  const scrCenter = containerSize.half().toPoint()
  const groundRect = Rect.fromCenter(scrCenter, 900, 10).shiftSelf(0, 80)
  const backgroundRect = Rect.size(900, 200).moveSelf(groundRect, 'top-right')

  const player = new Player()
  await player.load()
  player.heroRect
    .moveSelf(groundRect.topLeft, 'top-right')//.shiftSelf(0, -10)

  const platforms = new Platforms()
  editor.onShapesChanged = shapes => {
    platforms.clear()
    shapes.forEach(shape => {
      if (shape.type === 'rectangle')
        platforms.addPlatform(shape.rect)
    })
    player.setPlatforms(platforms)
  }
  
  viewer.onInput = ev => {
    editor.input(ev)
  }

  viewer.onKeyPressed = keys => {
    editor.keyPressed(keys)
    keys.sensitivityX = player.movementSensitivity
    keys.frictionX = player.movementFriction
    if ( keys.horizontalAxisRaw  === 0) player.isIdle = true
    else {
      player.isIdle = false
      player.dir = keys.horizontalAxisRaw 
    }

    const pressed = keys.getPressed()

    if (pressed[Key.SPACE]) {
      player.jump()
    }
    player.move(keys.horizontalAxis)
  }

  
  viewer.onFrameChanged = surface => {
    player.action()

    const p_img = player.image
    p_img.rect.absCenter = player.heroRect.absCenter
    p_img.rect.shiftSelf(0, -10)

    surface.clear()
    Sketch.new()
      .rect({ fill: '#2b2b2b' }, backgroundRect)
      .rect({ fill: '#311e09' }, groundRect)
      .circle({ fill: '#911' }, player.heroRect.midBottom, 3)
      .rect({ fill: '#11679928' }, player.heroRect)
      .draw(surface)
    surface.blit(p_img, p_img.rect)
    editor.draw(surface)
    displayFps(fps)
  }

  ui.group('Player', gr => {  
    gr.expand()
    gr.group('Jump', jgr => jgr
      .expand()
      .tracker('Jump Force', 1, 20, .1, val => player.maxJumpForce = val, player.maxJumpForce)
      .tracker('Expense JF Speed', 1, 180, .1, val => player.expenseJumpForce = val, player.expenseJumpForce)
      .tracker('Fall Down Acceleration', .125, 6, .1, val => player.maxFallDownAccel = val, player.maxFallDownAccel)
      .tracker('Recovering JF Speed', 1, 180, .1, val => player.recoveringJumpForce = val, player.recoveringJumpForce)
    )
    gr.group('Movement', mgr => mgr
      .expand()
      .tracker('Sensitivity', 0.01, 4, 0.01, val => player.movementSensitivity = val, player.movementSensitivity)
      .tracker('Friction', 0.01, 4, 0.01, val => player.movementFriction = val, player.movementFriction)
    )
  })

  const entities = builders.entities()
  editor.ui(ui, entities)
  editor.load(platformsData)

  return {
    ui: ui.build(),
    entities: entities.build(),
    telemetry: telemetry.build(),
    dispose () { 
      viewer.remove() 
    }
  }
}
