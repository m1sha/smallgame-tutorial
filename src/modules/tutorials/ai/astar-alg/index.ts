import { MouseButton, setSize } from "smallgame"
import { displayFps } from "../../../../utils/display-fps"
import { type ScriptModule, type ScriptSettings } from "../../../../components/example"
import { MapSource } from "./astar/game-map"
import { mapArray1 } from "./maps/map1"
import { MapObject as GameMap } from "./objects/map-object"
import { Zoom } from "./zoom"
import { Viewer } from "../../../shared"

export default async ({ container, containerSize, fps, builders }: ScriptSettings): Promise<ScriptModule> => {
  const telemetry = builders.telemetry()
  let findPathTime = 0
  const viewer = new Viewer(containerSize, container, { disableContextMenu: true })
  let isEditMode = false
  let toolNum = 0
  let constPath = false
  const zoom = new Zoom(16)
  const mapSource = new MapSource(mapArray1)
  const gameMap = new GameMap(mapSource, setSize(zoom.value, zoom.value))
  
  gameMap.rect.center = viewer.surface.rect.center

  viewer.onInput = ev => {
    if (ev.type === 'MOUSEDOWN') {
      if (ev.button !== MouseButton.LEFT) return
      const cell = gameMap.getCell(ev.pos) 
      if (!isEditMode) {
        mapSource.setGoal(cell)
        findPathTime = performance.now()
        gameMap.path.updatePath()
        findPathTime = performance.now() - findPathTime
        gameMap.updateMap()
        return
      }
      mapSource.setValue(cell, toolNum)
      gameMap.updateMap()
    }

    if (ev.type === 'MOUSEMOVE') {
      if (ev.button === MouseButton.RIGHT) {
        gameMap.rect.shiftSelf(ev.shift)
      }
    }

    if (ev.type === 'WHEEL') {
      if (ev.deltaY < 0)  {
        zoom.inc()
      } else {
        zoom.dec()
      }
      const v = zoom.value
      //mapSource.setSize(setSize(v, v))
      //gameMap.reDraw()
      // gameMap.rect.center = screen.rect.center
      // path.rect.topLeft = gameMap.rect.topLeft
    }
  }
  
  viewer.onFrameChanged = (surface => {
    surface.clear()
    gameMap.draw(surface)
    displayFps(fps)
    telemetry.tick()
  })

  const ui = builders.ui()

  ui.select('Mode', ['Test Path', 'Edit Map'], val => { isEditMode = (val === 'Edit Map')  }, 'Test Path')

  ui.group('Test Path', group => group
    .open()
    .select('heuristic', ['Manhattan', 'Euclidean'], val => { gameMap.path.setHeuristicType(val as any) }, 'Manhattan')
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

  telemetry.param('A* GetPath time (ms)', () => findPathTime.toFixed(4))

  return {
    ui: ui.build(),
    telemetry: telemetry.build(),
    dispose () { 
      viewer.remove() 
    }
  }
}
