import { Game, gameloop, loadBlob, loadImage, Time } from 'smallgame'
import { ColorBox } from './color-box'
import { DepletePaletteFilter } from './filters/deplete-palette-filter'
import { EraseColorFilter } from './filters/erase-color-filter'
import appState from './app-state'



class App {
  readonly depletePaletteFilter = new DepletePaletteFilter()
  readonly eraseColorFilter = new EraseColorFilter()
  
  async init (container: HTMLElement, fpsDiv: HTMLDivElement) {
    const { screen } = Game.create(800, 800, container)
    
    await this.setImage()
    appState.setWorkImage()
    
    gameloop(() => {
      fpsDiv.innerText = Time.fps.toFixed(0)
      screen.clear()
      const image = appState.workImage
      if (!image) return
      screen.blit(image, image.rect)
    })
  }

  async setImage () {
    appState.sourceImage = appState.file instanceof File ? await loadBlob(appState.file, { useAlpha: true }) : await loadImage(appState.file, { useAlpha: true })  
  }

  async uploadFile (file: File) {
    appState.file = file
    await this.setImage()
    appState.setWorkImage()
  }
}

export default new App()