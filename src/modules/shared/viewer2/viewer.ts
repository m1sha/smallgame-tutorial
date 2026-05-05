import { EventController, gameloop, killgameloop, MemSurface, Point, Screen, TSize } from "smallgame"
import { ViewerOptions } from "./viewer-options"

export class Viewer2 {
  private screen: Screen
  private eventBus: EventController 
  private surface: MemSurface
  private gameloopId: number
  #zoom: number = 1
  #offset: Point = Point.zero

  onNextFrame: ((surface: MemSurface) => void) | null = null

  constructor (viewportSize: TSize, container: HTMLDivElement, options?: ViewerOptions) {
    this.screen = new Screen('transform', viewportSize.width, viewportSize.width)
    this.screen.attachContrainer(container)
    this.eventBus = this.screen.createEventBusController()
    this.surface = new MemSurface(viewportSize)

    this.gameloopId = gameloop(() => this.infinityLoopHandler())
  }

  remove () {
    killgameloop(this.gameloopId)
    this.eventBus.claerListeners()
    this.screen.remove()
  }

  private infinityLoopHandler () {
    this.onNextFrame?.(this.surface)

    this.screen.blit(this.surface, this.surface.rect)
  }
}