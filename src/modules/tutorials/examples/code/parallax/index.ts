import { Viewer } from "../../../../shared"
import { displayFps } from "../../../../../utils/display-fps"
import { type ScriptSettings } from "../../../../../components/example"
import { backgroundImageListV4 } from "./img-list"
import { loadImage, MemSurface, Point, Time } from "smallgame"

export default async ({ container, containerSize, fps, builders, garbageCollect }: ScriptSettings): Promise<void> => {
  const ui = builders.ui()
  const viewer = new Viewer(containerSize, container, { disableContextMenu: true, garbageCollect })
  const imgs: CanvasPattern[] = []
  
  const loadImages = async (list: string[]) => {
      const images = await Promise.all(list.map(url => loadImage(url)))
      for (let i = 0; i < list.length; i++) {
        const image = images[i]
        imgs.push(image.toPattern('repeat-x'))
      }
  }
  
  await loadImages(backgroundImageListV4)

  const cache = new MemSurface(containerSize)
  const rates = [1, 0.95, 0.9, 0.85, 0.8,  0.75, 0.7]
  let x = 0
  const speed = ui.var(30)
  viewer.onFixedUpdate = () => {
    let i = 0
    for (const img of imgs) {
      cache.fill(img, new Point(x * rates[i++], 0))
    }
    x += speed.value 
  }

  viewer.onFrameChanged = frame => {
    frame.clear()
    frame.blit(cache, cache.rect)
    displayFps(fps)
  }

  ui.tracker('Speed', 0, 100, 1, undefined, speed)
}
