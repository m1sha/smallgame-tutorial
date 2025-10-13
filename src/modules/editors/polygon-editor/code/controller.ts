import { divPoints, Key, MouseButton, setPoint, zeroPoint, type TPoint } from "smallgame"
import type { EditorState } from "./editor-state"
import { 
  ChangeGridVisibleCommand, 
  ChangeImageVisibleCommand, 
  CreateFundamentalPointCommand, 
  DeselectPointCommand, 
  MoveActivePointCommand, 
  MoveActivePolygonCommand, 
  RemoveActivePolygonCommand, 
  SelectPointCommand, 
  SelectPolygonCommand, 
  SetActivePointPosCommand,
  SetActivePolygonPosCommand
} from "./commands"

export class Controller {
  private editorState: EditorState
  private startMovePos: TPoint
  private isPointMoved: boolean = false
  private isPolygonMoved: boolean = false
  private selectedPoint: TPoint | null
  private points: TPoint[] = []

  constructor (editorState: EditorState) {
    this.editorState = editorState
    this.startMovePos = zeroPoint()
    this.selectedPoint = null
  }

  checkInput () {
    const state = this.editorState
    const screen = state.screen
    const viewport = screen.viewport
    const polygons =  state.polygons
    const activePolygon = polygons.activePolygon
    const screenDelta = screen.ratio
    const images = state.images
    polygons.setZoomIndex(viewport.zoom)

    for (const event of state.game.event.get()) {
  
      switch (event.type) {
        case "KEYDOWN": {
          switch (event.key){
            case Key.K_G:
              state.sendCommand(new ChangeGridVisibleCommand())
              break
            case Key.DELETE:
              state.sendCommand(new RemoveActivePolygonCommand())
            break
            case Key.K_I: 
              state.sendCommand(new ChangeImageVisibleCommand())
            break
            case Key.K_Z: 
              if (event.ctrlKey) state.undo()
            break
            case Key.K_Y: 
              if (event.ctrlKey) state.redo()
            break
          }
          break
        }

        case "MOUSEDOWN": {
          if (event.button !== MouseButton.LEFT) return
          const pos = divPoints(event.pos, screenDelta)

          let someOtherSelected = false
          
          if (!activePolygon || !activePolygon.selectedPoint) {
            polygons.collidePoint(pos, polygon => {
              state.sendCommand(new SelectPolygonCommand(polygon))
              this.points = polygon.getPoints()
              someOtherSelected = true
            }, { once: true, reverseEnum: true, predicate: s => s.pointInside(pos) })
          }
          
          if (activePolygon && activePolygon.selectedPoint) {
            this.editorState.sendCommand(new SelectPointCommand())
            this.selectedPoint = activePolygon.selectedPoint
            this.startMovePos = setPoint(this.selectedPoint.x, this.selectedPoint.y) 

            if (activePolygon.selectedPointType === 'temp') {
              this.editorState.sendCommand(new CreateFundamentalPointCommand())
            }
            someOtherSelected = true
          }

          images.collidePoint(pos, img => {})

          //background.active = (!someOtherSelected && background.collidePoint(pos)) 
          break
        }

        case "MOUSEMOVE":
          const pos = divPoints(event.pos, screenDelta)
          const shift = divPoints(event.shift, screenDelta)
          screen.cursor = 'default'

          if (!activePolygon) break

          activePolygon.hittest(pos)
          if (event.button !== MouseButton.LEFT) return
          
          if (polygons.activePointSelected) {
            this.editorState.sendCommand(new MoveActivePointCommand(pos))
            this.isPointMoved = true
          } else if (activePolygon) {
            this.isPolygonMoved = true
            this.editorState.sendCommand(new MoveActivePolygonCommand(shift))
            screen.cursor = 'move'
            break
          }
        break

        case "MOUSEUP":
        case "MOUSELEAVE": 
          if (!activePolygon) return
          this.editorState.sendCommand(new DeselectPointCommand())

          if (this.isPointMoved && this.selectedPoint) {
            const oldPos = setPoint(this.selectedPoint.x, this.selectedPoint.y)
            this.editorState.sendCommand(new SetActivePointPosCommand(this.selectedPoint, this.startMovePos, oldPos))
          } else {
            if (this.isPolygonMoved) {
              this.editorState.sendCommand(new SetActivePolygonPosCommand(this.points, activePolygon.getPoints()))
            }
          }
          this.isPolygonMoved = false
          this.isPointMoved = false 
          
        break

        case "MOUSEENTER": break
      }

    }
  }
}