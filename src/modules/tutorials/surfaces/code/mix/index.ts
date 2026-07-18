import { loadImage, MemSurface, Rect, Size, Surface } from "smallgame"
import { DragPanels, type ScriptSettings, Viewer, createPattern, displayFps } from "../../../core"

export default async ({ container, containerSize, fps, builders, garbageCollect }: ScriptSettings): Promise<void> => {
  const viewer = new Viewer(containerSize, container, { disableContextMenu: true, garbageCollect })
  const p = await createPattern('chess-tex.jpg', 'repeat')
  const ui = builders.ui()
  let mixMethod: GlobalCompositeOperation = 'source-in'
  const mixMethods = ["color" , "color-burn" , "color-dodge" , "copy" , "darken" , "destination-atop" , "destination-in" , "destination-out" , "destination-over" , "difference" , "exclusion" , "hard-light" , "hue" , "lighten" , "lighter" , "luminosity" , "multiply" , "overlay" , "saturation" , "screen" , "soft-light" , "source-atop" , "source-in" , "source-out" , "source-over" , "xor"]
  let source: Surface | null = null
  let distination: Surface | null = null
  let result = Surface.default
  
  let distinationImageName = 'mask-circle-5.png'
  const render = async () => {
    source = await loadImage('nature-3082832_1280.jpg')
    distination  = (await loadImage('masks/' + distinationImageName)).scaleSelf(.6, .6)
    //distination = new MemSurface(img.rect.size)
    //distination.fill(p.pattern)
    //distination.blit(img, img.rect)
  }

  await render()
  
  const updateMix = () => {
    result = distination.clone()
    result.mix(mixMethod, source)
    result.rect.absCenter = viewer.viewportRect.absCenter
  }
  updateMix()

  const panels = new DragPanels(containerSize)
  panels
    .add("Source", new Rect(340, 10, 400, 400), { resizable: true })
    .content = source
  const temp = new MemSurface(distination.rect.size)
    temp.fill(p.pattern)
    temp.blit(distination, distination.rect)
  panels
    .add("Distination", new Rect(340, 420, 400, 400), { resizable: true })
    .content = temp
  const resultPanel = panels
    .add("Result", new Rect(750, 10, 800, 810), { resizable: true })
  viewer.useInput(panels)

  viewer.onFrameChanged = frame => {
    frame.clear()
    resultPanel.content = result
    panels.draw(frame)
    displayFps(fps)
  }

  ui.select('Mix method', mixMethods, val => {
    mixMethod = val as GlobalCompositeOperation
    updateMix()
  }, mixMethod)

  ui.select('Distination Image', ['mask-circle-1.png', 'mask-circle-2.png', 'mask-circle-3.png', 'mask-circle-4.png', 'mask-circle-5.png'], async val => {
    distinationImageName = val 
    await render()
    
    const temp = new MemSurface(distination.rect.size)
    temp.fill(p.pattern)
    temp.blit(distination, distination.rect)

    panels.byName('Distination')!.content = temp

    updateMix()
  }, distinationImageName)
}
