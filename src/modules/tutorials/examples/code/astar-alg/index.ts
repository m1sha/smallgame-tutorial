import { Game, gameloop } from "smallgame"
import { displayFps } from "../../../../../utils/display-fps"
import { type ScriptModule, type ScriptSettings } from "../../../../../components/example"
import { UIBuilder } from "../../../../../components/example/code/ui"
import { MapSource } from "./astar/game-map"
import { mapArray1 } from "./maps/map1"
import { Path } from "./objects/path"
import { MapObject as GameMap } from "./objects/map-object"
import { mapArray2 } from "./maps/map2"



export default async ({ container, width, height, fps }: ScriptSettings): Promise<ScriptModule> => {
  const { game, screen } = Game.create(width, height, container)

  let isEditMode = false
  let toolNum = 0
  let constPath = false

  const mapSource = new MapSource(mapArray2)
  const path = new Path(mapSource)
  const gameMap = new GameMap(mapSource)
  
  gameMap.rect.center = screen.rect.center
  path.rect.center = screen.rect.center

  gameloop(() => {
    for (const ev of game.event.get()) {
      if (ev.type === 'MOUSEDOWN') {
        const cell = gameMap.getCell(ev.pos) 

        if (!isEditMode) {
          mapSource.setGoal(cell)
          path.updatePath()
          gameMap.updateMap()
          return
        }

        mapSource.setValue(cell, toolNum)
        gameMap.updateMap()
      }
    }

    screen.fill('#272727ff')
    gameMap.draw(screen)

    if (!isEditMode) {
      path.constPath = constPath
      path.draw(screen)
    }

    displayFps(fps)
  })

  const ui = new UIBuilder()

  ui.select('Mode', ['Test Path', 'Edit Map'], val => { isEditMode = (val === 'Edit Map')  }, 'Test Path')

  ui.group('Test Path', group => group
    .open()
    .select('Path Type', ['Only Path', 'Full Construction'], val => { constPath = (val === 'Full Construction') } , 'Only Path')
  )
  ui.group('Edit Map', group => group
    .open()
    .select('Tool', ['Floor', 'Wall', 'Sand', 'Water'], val => {
      if (val === 'Floor') toolNum = 0
      if (val === 'Wall') toolNum = 1
      if (val === 'Sand') toolNum = 4
      if (val === 'Water') toolNum = 5
    }, 'Floor')
    .button('Download', () => {})
  )



  return {
    ui: ui.build(),
    dispose () { 
      game.kill() 
    }
  }
}
