import { divPoints, Key, MouseButton, Point, setPoint, zeroPoint, type TPoint } from "smallgame"
import type { EditorState } from "./editor-state"
import { 
  ChangeGridVisibleCommand, 
  ChangeImageVisibleCommand, 
  CreateFundamentalPointCommand, 
  DeselectPointCommand, 
  MoveActivePointCommand, 
  MoveObjectCommand, 
  RemoveActivePolygonCommand, 
  SelectObjectCommand, 
  SelectPointCommand, 
  SetActivePointPosCommand,
} from "./commands"
import { Viewer } from "./rasterization"
import { ImageObject, Polygon } from "./objects"

export class Controller {
  private editorState: EditorState
  private startMovePos: TPoint
  private isPointMoved: boolean = false
  private isPolygonMoved: boolean = false
  private selectedPoint: TPoint | null
  //private points: TPoint[] = []

  constructor (editorState: EditorState, private viewer: Viewer) {
    this.editorState = editorState
    this.startMovePos = zeroPoint()
    this.selectedPoint = null
  }

  checkInput () {
    const viewer = this.viewer
    const state = this.editorState
    const screen = viewer.screen
    const screenDelta = screen.ratio
    const objects = state.objects

    for (const event of viewer.game.event.get()) {
  
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
            
          objects.collide(
            obj =>  obj instanceof Polygon 
                  ? obj.pointInside(pos) 
                  : obj instanceof ImageObject 
                  ? obj.imageRect.containsPoint(pos) 
                  : false
            , 
            obj => {
              const curr = objects.currentObject
              if (curr === obj) return
              if (curr && curr.selectedPoint) return

              state.sendCommand(new SelectObjectCommand(obj))
            }, 
            { once: true, reverseEnum: true }
          )

          const curr = objects.currentObject

          if (!curr) return
          
          if (curr.selectedPoint) {
            this.editorState.sendCommand(new SelectPointCommand(curr.selectedPoint))
            this.selectedPoint = curr.selectedPoint
            this.startMovePos = setPoint(this.selectedPoint.x, this.selectedPoint.y) 

            if (curr instanceof Polygon && curr.selectedPointType === 'temp') {
              this.editorState.sendCommand(new CreateFundamentalPointCommand())
            }
          }

          break
        }

        case "MOUSEMOVE": {
          const pos = divPoints(event.pos, screenDelta)
          const shift = divPoints(event.shift, screenDelta)
          screen.cursor = 'default'

          const curr = objects.currentObject

          if (!curr) break
          
          curr.hittest(pos)
          if (event.button !== MouseButton.LEFT) return
          
          if (objects.markerPoint) {
            this.editorState.sendCommand(new MoveActivePointCommand(pos))
            this.isPointMoved = true
          } else  {
            this.isPolygonMoved = true
            this.editorState.sendCommand(new MoveObjectCommand(shift))
            screen.cursor = 'move'
          }
          
          break
        }

        case "MOUSEUP":
        case "MOUSELEAVE": 
          const curr = objects.currentObject
          if (!curr) return
          this.editorState.sendCommand(new MoveObjectCommand(Point.zero, true))
          this.editorState.sendCommand(new DeselectPointCommand())

          if (this.isPointMoved && this.selectedPoint) {
            const oldPos = setPoint(this.selectedPoint.x, this.selectedPoint.y)
            this.editorState.sendCommand(new SetActivePointPosCommand(this.selectedPoint, this.startMovePos, oldPos))
          } else {
            if (this.isPolygonMoved && curr instanceof Polygon) {
              //this.editorState.sendCommand(new SetActivePolygonPosCommand(this.points, curr.getPoints()))
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