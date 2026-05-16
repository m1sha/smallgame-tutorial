import { Game, gameloop, Parallax, Rect, loadImage, killgameloop, Time, GMath, MemSurface, Size } from "smallgame"
import { backgroundImageListV4, backgroundImageListV5, backgroundImageListV3 } from "./img-list"
import { displayFps } from "../../../../../utils/display-fps"
import { type ScriptModule, type ScriptSettings } from "../../../../../components/example"
import { Ease } from "../movements/func"

const SCREEN_WIDTH = 1980
const SCREEN_HEIGHT = 1080

export default async ({ container, width, height, containerSize, fps, builders }: ScriptSettings): Promise<ScriptModule> => {
  const { screen } = Game.create(width, height, container)
  //const list = backgroundImageListV4

  //selector.items.push({ id: '1', name: 'City V4' })
  //selector.items.push({ id: '2', name: 'City V5' })
  //selector.items.push({ id: '3', name: 'City V3' })
 

  const parallax = new Parallax(new Rect(0,0, SCREEN_WIDTH, SCREEN_HEIGHT))
  let speed = 0.05
  let directionX = -1

  const loadImages = async (list: string[]) => {
    const rates = [1, 0.95, 0.9, 0.85, 0.8,  0.75, 0.7]
    const names = list
      .map(url => url.split('/').at(-1)?.replace('.png', '') ?? 'some-name')
    const images = await Promise.all(list.map(url => loadImage(url)))
  
    for (let i = 0; i < list.length; i++) {
      const name = names[i]
      const image = images[i]
      image.zoomSelf(.5)
      parallax.addLayer(name, image, rates[i])
    }
  }

  await loadImages(backgroundImageListV4)

  

  let t = 0
  let func = Ease.get('easeInOutBounce')

  const sur = new MemSurface(new Size(1200, 540))
  sur.fill('#787890')
  sur.rect.absCenter = containerSize.toPoint().scale(.5)
  
  const gameloopId = gameloop(() => {
    screen.clear()
    parallax.draw(sur)
    screen.blit(sur, sur.rect)
    if (t < 1) t += Time.deltaTime * speed
    
    parallax.pos.x = -GMath.lerp(-8000, 8000, func(t))  //.shiftXSelf(speed * Time.deltaTime * directionX)
    displayFps(fps)
  })

  const ui = builders.ui()
  const varNames = ['City V4', 'City V5', 'City V3']
  ui.select('Variant', varNames, value => {
    parallax.clearLayers()
    if (value === 'City V4') { loadImages(backgroundImageListV4) }
    if (value === 'City V5') { loadImages(backgroundImageListV5) }
    if (value === 'City V3') { loadImages(backgroundImageListV3) }
  }, 'City V4')

   ui.select('Direction', ['Forward', 'Backward'], value => {
    if (value === 'Forward') directionX = -1
    if (value === 'Backward') directionX = 1
  }, 'Forward')

   ui.select('Speed', ['Slow', 'Normal', 'Fast'], value => {

    if (value === 'Slow') speed = 0.05
    if (value === 'Normal') speed = 0.1
    if (value === 'Fast') speed = 0.2

  }, 'Slow')

  ui.select('Func', Ease.names(), v => func = Ease.get(v), 'easeInOutBounce' )

  ui.button('Restart', () => t = 0)

  return {
    ui: ui.build(),
    dispose () {
      killgameloop(gameloopId)
    }
  }
}

