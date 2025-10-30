import { Game, gameloop, Parallax, Rect, loadImage, killgameloop } from "smallgame"
import { backgroundImageListV4, backgroundImageListV5, backgroundImageListV3 } from "./img-list"
import { displayFps } from "../../../../../utils/display-fps"
import { createSelect, type ScriptModule, type ScriptSettings } from "../../../../../components/example"

const SCREEN_WIDTH = 570 * 2
const SCREEN_HEIGHT = 324 * 2

export default async ({ container, width, height, fps }: ScriptSettings): Promise<ScriptModule> => {
  const { screen } = Game.create(width, height, container)
  //const list = backgroundImageListV4

  //selector.items.push({ id: '1', name: 'City V4' })
  //selector.items.push({ id: '2', name: 'City V5' })
  //selector.items.push({ id: '3', name: 'City V3' })
 

  const parallax = new Parallax(new Rect(0,0, SCREEN_WIDTH, SCREEN_HEIGHT))
  parallax.settings.speed = 1000
  parallax.settings.directionX = -1

  const loadImages = async (list: string[]) => {
    const rates = [0.02, 0.1, 0.2, 0.5, 0.9,    0.1, 0.2,0.3,0.9]
    const names = list
      .map(url => url.split('/').at(-1)?.replace('.png', '') ?? 'some-name')
    const images = await Promise.all(list.map(url => loadImage(url)))
  
    for (let i = 0; i < list.length; i++) {
      const name = names[i]
      const image = images[i]
      image.zoomSelf(2)
      parallax.addLayer(name, image, rates[i])
    }
  }

  await loadImages(backgroundImageListV4)


  
  gameloop(() => {
    screen.clear()
    parallax.draw(screen as any)
    displayFps(fps)
  })

  const varNames = ['City V4', 'City V5', 'City V3']
  const variantParam = createSelect('Variant', varNames, value => {
    parallax.clearLayers()
    if (value === 'City V4') { loadImages(backgroundImageListV4) }
    if (value === 'City V5') { loadImages(backgroundImageListV5) }
    if (value === 'City V3') { loadImages(backgroundImageListV3) }
  }, 'City V4')

  const dirParam = createSelect('Direction', ['Forward', 'Backward'], value => {
    if (value === 'Forward') parallax.settings.directionX = -1
    if (value === 'Backward') parallax.settings.directionX = 1
  }, 'Forward')

  const speedParam = createSelect('Speed', ['Slow', 'Normal', 'Fast'], value => {

    if (value === 'Slow') parallax.settings.speed = 100
    if (value === 'Normal') parallax.settings.speed = 1000
    if (value === 'Fast') parallax.settings.speed = 3000

  }, 'Normal')

  return {
    parameters: [ variantParam, dirParam, speedParam ],
    dispose () {
      killgameloop()
    }
  }
}

