import { Game, gameloop, loadBlob, loadImage, Surface, Time } from 'smallgame'
import { createBg } from './background'
import { AppEventController } from './app-event-controller'
import { AppState } from './app-state'
import { createFilters, Filter } from './filters'

export class App {
  private controller = new AppEventController()
  readonly filters: Filter[] = createFilters(this)
  file: File | string = 'mag.jpg'
  sourceImage: Surface | null = null
  workImage: Surface | null = null
  backgroundImage: Surface | null = null

  constructor (public appState: AppState) { }
  
  async create (container: HTMLElement, fpsDiv: HTMLDivElement) {
    const w = 800
    const h = 800
    const { game, screen } = Game.create(w, h, container)

    this.backgroundImage = createBg(w, h)
    
    await this.setImage()
    this.setWorkImage()
    
    gameloop(() => {
      this.controller.handlering(game.event, game.key, this.appState)
      
      fpsDiv.innerText = Time.fps.toFixed(0)
      screen.clear()

      const background = this.backgroundImage
      if (background) screen.blit(background, background.rect)
      
      const image = this.workImage
      if (image) screen.blit(image, image.rect)
      
    })
  }

  async setImage () {
    this.sourceImage = this.file instanceof File ? await loadBlob(this.file, { useAlpha: true }) : await loadImage(this.file, { useAlpha: true })  
  }

  setWorkImage(): void {
    this.workImage = this.sourceImage?.clone() ?? null
  }

  applyFilter (): void {
    this.sourceImage = this.workImage?.clone() ?? null
  }

  getFilter<T extends Filter>(name: string): T | undefined {
    return this.filters.find(p => p.name === name) as T
  }

  addFilter (filter: Filter): void {
    this.filters.push(filter)
  }

  setTool (name: string) {
    
  }

  async uploadFile (file: File) {
    this.file = file
    await this.setImage()
    this.setWorkImage()
  }
}


//class ClipBoardController {
//  static create () {
//    document.addEventListener('paste', ev => {
//      const items = ev.clipboardData?.items ?? []
//      const item = items[0]
//      if (!item) return
//      if (item.kind !== 'file') return
//      const file = item.getAsFile()
//      if (!file) return
//      app.uploadFile?.(file)
//    })
//  }
//}
//
//ClipBoardController.create()

