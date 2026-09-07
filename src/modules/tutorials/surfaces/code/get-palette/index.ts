import { loadImage } from "smallgame"
import { type ScriptSettings, Viewer, displayFps } from "../../../core"
import { Pixel } from "smallgame/src/utils/pixels"
import testPanel from "./test-panel.vue"
import { createReactiveData } from "../../../../../components/example"

export default async ({ container, containerSize, fps, builders, garbageCollect, viewerControls, messanger, panels }: ScriptSettings): Promise<void> => {
  const viewer = new Viewer(containerSize, container, { disableContextMenu: true, garbageCollect, viewerControls })
  const img = await loadImage('img/solder-1w.png')

  const data = createReactiveData({ message: 'Hello Panel!' })
  const panel = panels.addPanel(
    'Test Panel', 
    testPanel, 
    async (panel, actionName, _) => {
      if (actionName === 'hide') { panel.hide() }
      messanger.info(actionName)
    },
    data,
    { x: 400, y: 100 }
  )
  
  const pixels = img.pixels
  const buffer: Pixel[] = []
  pixels.forEach(pixel => {
    if (!buffer.some(p => p.inRadius(pixel, 16))) {
      buffer.push(pixel)
    }
  })

  img.rect.center = viewer.viewportRect.center

  let i =0
  viewer.onInput = ev => {
    if (ev.type === 'MOUSEDOWN') {
      data.message = 'Text was been changed!'
      panel.title = 'New Title'
      panel.show()
      messanger.info('<div style="width:20px;height:20px;background-color: #129911"></div> #129911' + ' ' + (i++))
    }
  }

  viewer.surface.imageRendering = 'pixelated'
  viewer.onFrameChanged = frame => {
    frame.clear()
    frame.blit(img, img.rect.scalesize(4))
    displayFps(fps)
  }
}
