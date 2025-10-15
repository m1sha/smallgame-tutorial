import { Game, Screen, Surface } from "smallgame"
import { EditorState } from "../editor-state"
import { drawPolygon } from "./drawers/drawPolygons"
import { ImageObject, Polygon } from "../objects"
import { drawImage } from "./drawers/drawImage"
import { drawSelectedObjectFrame } from "./drawers/draw-seleced-object-frame"

export class Viewer {
  readonly screen: Screen
  readonly game: Game
  private objectsLayer: Surface
  private selectedObjectLayer: Surface

  constructor (width: number, height: number, root: HTMLDivElement, private state: EditorState) {
    const { game, screen } = Game.create(width, height, root, { viewportType: 'css' })
    screen.imageRendering = 'pixelated'
    this.screen = screen
    this.game = game

    this.objectsLayer = new Surface(width, height, { useOffscreen: true })
    this.selectedObjectLayer = new Surface(width, height, { useOffscreen: true })
  }

  nextFrame () {
    this.draw()
  }

  private draw () {
    const screen = this.screen
    const { grid, objects } = this.state
    
    screen.fill(0xFFFFFF00)
    grid.draw(screen as any)

    objects.compute()
    this.drawPolygons()
  }

  private drawPolygons () {
    this.objectsLayer.clear()

    const currentObject = this.state.objects.currentObject
    
    this.state.objects.sprites.forEach(obj => { 
      if (obj.type === 'polygon')
        drawPolygon(obj as Polygon, this.objectsLayer, currentObject) 
      if (obj.type === 'image') {
        drawImage(obj as ImageObject, this.objectsLayer, currentObject)
      }
    })
    this.screen.blit(this.objectsLayer, this.objectsLayer.rect)

    if (currentObject) {
      this.selectedObjectLayer.clear()
      drawSelectedObjectFrame(currentObject, this.selectedObjectLayer)
      this.screen.blit(this.selectedObjectLayer, this.selectedObjectLayer.rect)
    }
    
  }
}