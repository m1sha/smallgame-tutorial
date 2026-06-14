import { Game, TSize, Screen, gameloop, GameEvent, Surface, MemSurface, Rect, Point, Size, Keys, TPoint, killgameloop, setPoint } from "smallgame"
import { Background } from "./background"
import { SelectRegion } from "./select-region"
import { SelectedObjects } from "./selected-objects"
import { initViewerControls, IViewerControls, ViewerUI } from "./ui"
import { Viewport } from "./viewport"
import { setDebounce } from "smallgame/src/time"

export class Viewer {
  private gameloopId: number
  private background: Background
  private selectRegion: SelectRegion
  private selectedObjects: SelectedObjects
  private screen: Screen
  private game: Game
  readonly surface: Surface
  readonly ui: ViewerUI
  readonly viewport: Viewport

  #offset: Point = Point.zero
  mousePosition: Point = Point.zero
  fixedUpdateTimeout: number = 25

  onFrameChanged: ((surface: Surface) => void) | null = null
  onFixedUpdate: (() => void) | null = null
  onInput: ((event: GameEvent) => void) | null = null
  onKeyPressed: ((key: Keys) => void) | null = null
  onGamepad: ((gamepads: Gamepad[]) => void) | null = null
  onSelectedRect: ((rect: Rect) => void) | null = null
  onContextMenuClick: ((pos: TPoint) => void) | null = null
  onViewportChanged: ((pos: Point, zoom: number) => void) | null = null

  constructor (viewportSize: TSize, container: HTMLDivElement, options?: { disableContextMenu?: boolean, viewerControls?: IViewerControls }) {
    const { game, screen } = Game.create(viewportSize.width, viewportSize.height, container)

    const viewerSettings = options && options.viewerControls ? options.viewerControls : initViewerControls()
    viewerSettings.updateChanges = () => {
      // update viewerSettings
    }
    

    this.viewport = new Viewport(viewportSize, this, viewerSettings.viewport)
    this.game = game
    this.screen = screen
    this.surface = new MemSurface(viewportSize)
    this.background = new Background(viewportSize)
    this.background.render()
    this.selectRegion = new SelectRegion(viewportSize)
    this.selectRegion.render()
    this.selectedObjects = new SelectedObjects(viewportSize)

    if (options && options.disableContextMenu) {
      screen.disableContextMenu()
    }

    this.ui = new ViewerUI(this.background)

    const selectRect = Rect.zero
    let startSelectRect = false
    let moved = false

    const fixedUpdate = setDebounce(() => this.onFixedUpdate?.(), this.fixedUpdateTimeout)

    this.gameloopId = gameloop(() => {
      for (const ev of game.event.get()) {
        
        if (document.activeElement && document.activeElement.tagName.toLowerCase() === 'input') {
          continue
        }
        
        if (ev.type === 'MOUSEDOWN') {
          if (ev.lbc && ev.altKey) {
            startSelectRect = true
            selectRect.moveSelf(ev.pos)
            this.selectRegion.selectRect(selectRect)
          }
          if (ev.rbc) {
            this.onContextMenuClick?.(ev.pos)
          }
        }
        if (ev.type === 'MOUSEMOVE') {
          this.mousePosition.moveSelf(ev.pos)
          viewerSettings.viewport.cursor = setPoint(ev.pos.x, ev.pos.y)
          if (ev.lbc && ev.ctrlKey) {
            this.background.mousePos = ev.pos
            this.background.mouseShift = ev.shift
            this.#offset.shiftSelf(ev.shift)
            this.background.offest = this.#offset
            this.background.render()
            moved = true
            this.onViewportChanged?.(Point.from(ev.shift), 1)
          }
        }

        if (ev.type === "MOUSEMOVE") {
          if (startSelectRect) {
            selectRect.bottomRight = ev.pos
            this.selectRegion.selectRect(selectRect)
          }
        }

        if (ev.type === 'MOUSEUP' && moved) {
          //this.offset.moveSelf(ev.pos)
          //this.background.offest = ev.pos
          this.background.render()
        }

        if (ev.type === 'MOUSEUP') {
          startSelectRect = false
          selectRect.moveSelf(Point.zero)
          selectRect.resizeSelf(Size.zero)
          this.selectRegion.selectRect(Rect.zero)
        }

        this.onInput?.(ev)
      }
      
      if (document.activeElement && document.activeElement.tagName.toLowerCase() !== 'input') {
        this.onKeyPressed?.(game.key)
        this.onGamepad?.(game.gamepads)
      }
      
      fixedUpdate()
      this.onFrameChanged?.(this.surface)

      this.screen.clear()
      this.screen.blit(this.background.surface, this.background.surface.rect)
      this.screen.blit(this.surface, this.surface.rect)
      this.screen.blit(this.selectedObjects.surface, this.selectedObjects.surface.rect)
      this.screen.blit(this.selectRegion.surface, this.selectRegion.surface.rect)
    })
  }

  get offset () {
    return this.#offset
  }

  set offset (value: Point) {
    const old = this.#offset.shift(value.neg())
    this.#offset = value
    this.background.offest = value
    this.background.render()
    this.onViewportChanged?.(old, 1)
  }

  get zoom () {
    return this.background.zoom
  }

  set zoom (value: number) {
    this.background.zoom = value
  }

  get viewportRect () {
    return this.surface.rect
  }

  selectObjects (objects: { rect: Rect }[]) {
    this.selectedObjects.addObjects(objects)
  }

  [Symbol.dispose] () {
    this.remove()
  }

  remove () {
    this.game.kill()
    killgameloop(this.gameloopId)
  }
}