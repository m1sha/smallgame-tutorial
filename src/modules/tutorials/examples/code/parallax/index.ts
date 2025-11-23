import { Game, gameloop, Parallax, Rect, loadImage, killgameloop, Time, GMath } from "smallgame"
import { backgroundImageListV4, backgroundImageListV5, backgroundImageListV3 } from "./img-list"
import { displayFps } from "../../../../../utils/display-fps"
import { createButton, createSelect, type ScriptModule, type ScriptSettings } from "../../../../../components/example"
import { Ease, easeInOutBounce } from "../movements/func"

const SCREEN_WIDTH = 570 * 2
const SCREEN_HEIGHT = 324 * 2

export default async ({ container, width, height, fps }: ScriptSettings): Promise<ScriptModule> => {
  const { screen } = Game.create(width, height, container)
  //const list = backgroundImageListV4

  //selector.items.push({ id: '1', name: 'City V4' })
  //selector.items.push({ id: '2', name: 'City V5' })
  //selector.items.push({ id: '3', name: 'City V3' })
 

  const parallax = new Parallax(new Rect(0,0, SCREEN_WIDTH, SCREEN_HEIGHT))
  let speed = 0.05
  let directionX = -1

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

  

  let t = 0
  let func = Ease.get('easeInOutBounce')
  
  gameloop(() => {
    screen.clear()
    parallax.draw(screen as any)
    if (t < 1) t += Time.deltaTime * speed
    
    parallax.pos.x = -GMath.lerp(-8000, 8000, func(t))  //.shiftXSelf(speed * Time.deltaTime * directionX)
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
    if (value === 'Forward') directionX = -1
    if (value === 'Backward') directionX = 1
  }, 'Forward')

  const speedParam = createSelect('Speed', ['Slow', 'Normal', 'Fast'], value => {

    if (value === 'Slow') speed = 0.05
    if (value === 'Normal') speed = 0.1
    if (value === 'Fast') speed = 0.2

  }, 'Slow')

  const funcParam = createSelect('Func', Ease.names(), v => func = Ease.get(v), 'easeInOutBounce' )

  const resetBtn = createButton('Restart', () => t = 0)

  return {
    parameters: [ variantParam, dirParam, speedParam, funcParam, resetBtn ],
    dispose () {
      killgameloop()
    }
  }
}

