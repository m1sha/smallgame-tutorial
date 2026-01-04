import { Game, TSize, Screen, gameloop, GameEvent, Surface, MemSurface, Rect, Point, Size, Keys, TPoint } from "smallgame"
import { Background } from "./background"
import { SelectRegion } from "./select-region"
import { ViewerUI } from "./ui"

export class Viewer {
  private background: Background
  private selectRegion: SelectRegion
  private screen: Screen
  private game: Game
  readonly surface: Surface
  readonly ui: ViewerUI

  #offset: Point = Point.zero
  mousePosition: Point = Point.zero

  onFrameChanged: ((surface: Surface) => void) | null = null
  onInput: ((event: GameEvent) => void) | null = null
  onKeyPressed: ((key: Keys) => void) | null = null
  onSelectedRect: ((rect: Rect) => void) | null = null
  onContextMenuClick: ((pos: TPoint) => void) | null = null
  onViewportChanged: ((pos: Point, zoom: number) => void) | null = null

  constructor (viewportSize: TSize, container: HTMLDivElement, options?: { disableContextMenu?: boolean }) {
    const { game, screen } = Game.create(viewportSize.width, viewportSize.height, container)
    this.game = game
    this.screen = screen
    this.surface = new MemSurface(viewportSize)
    this.background = new Background(viewportSize)
    this.background.render()
    this.selectRegion = new SelectRegion(viewportSize)
    this.selectRegion.render()

    if (options && options.disableContextMenu) {
      screen.disableContextMenu()
    }

    this.ui = new ViewerUI(this.background)

    const selectRect = Rect.zero
    let startSelectRect = false
    let moved = false
    gameloop(() => {
      
      for (const ev of game.event.get()) {
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
          if (ev.lbc && ev.ctrlKey) {
            this.background.mousePos = ev.pos
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
      
      this.onKeyPressed?.(game.key)
      this.onFrameChanged?.(this.surface)

      this.screen.clear()
      this.screen.blit(this.background.surface, this.background.surface.rect)
      this.screen.blit(this.surface, this.surface.rect)
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

  get viewportRect () {
    return this.surface.rect
  }

  [Symbol.dispose] () {
    this.remove()
  }

  remove () {
    this.game.kill()
  }
}