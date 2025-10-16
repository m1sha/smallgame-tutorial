import { Game, Screen, Surface } from "smallgame"
import { EditorState } from "../editor-state"
import { Drawable, ImageDrawable, PolygonDrawable } from "./drawers"
import { BaseObject } from "../objects"


export class Viewer {
  readonly screen: Screen
  readonly game: Game
  private objectsLayer: Surface
  private selectedObjectLayer: Surface

  private drawables: Map<string, Drawable<BaseObject>> = new Map()

  constructor (width: number, height: number, root: HTMLDivElement, private state: EditorState) {
    const { game, screen } = Game.create(width, height, root, { viewportType: 'css' })
    screen.imageRendering = 'pixelated'
    this.screen = screen
    this.game = game

    this.objectsLayer = new Surface(width, height, { useOffscreen: true })
    this.selectedObjectLayer = new Surface(width, height, { useOffscreen: true })

    this.drawables.set('polygon', new PolygonDrawable())
    this.drawables.set('image', new ImageDrawable())
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
    this.drawObjects()
  }

  private drawObjects () {
    this.objectsLayer.clear()
    this.state.objects.sprites.forEach(obj => {
      const drawable = this.drawables.get(obj.type)
      drawable?.normal(this.objectsLayer, obj)
      drawable?.hover(this.objectsLayer, obj)
    })
    this.screen.blit(this.objectsLayer, this.objectsLayer.rect)

    const currentObject = this.state.objects.currentObject
    if (currentObject) {
      this.selectedObjectLayer.clear()
      const drawable = this.drawables.get(currentObject.type)
      drawable?.selected(this.selectedObjectLayer, currentObject)
      this.screen.blit(this.selectedObjectLayer, this.selectedObjectLayer.rect)
    }
  }
}