import { Viewer } from "../../../../shared"
import { displayFps } from "../../../../../utils/display-fps"
import { type ScriptModule, type ScriptSettings } from "../../../../../components/example"
import { loadImage, MemSurface, Point, Rect, Size, Sketch } from "smallgame"

export default async ({ container, containerSize, fps, builders }: ScriptSettings): Promise<ScriptModule> => {
  const viewer = new Viewer(containerSize, container, { disableContextMenu: true })
  const ui = builders.ui()

  const img = await loadImage('img/green-mountains_612x384_61K.jpg')
  const clipRect = Rect.size(150, 125).moveSelf(400, 0)
  
  const origin = new MemSurface(new Size(750, 500))
  const preview = new MemSurface(new Size(750, 500))
  origin.rect.absCenter = new Point(origin.rect.absCenter.x + 60, containerSize.height / 2)
  preview.rect.absCenter = new Point(origin.rect.absCenter.x + 10 + origin.rect.absWidth, containerSize.height / 2)
  
  const useDist = ui.var(true)
  const srect = ui.var(Rect.size(clipRect))
  const drect = ui.var(Rect.size(preview.rect))
  
  viewer.onFrameChanged = frame => {
    frame.clear()
    origin.fill('#292929')
    origin.blit(img, img.rect)

    const sourceRect = Rect.from(srect.value)
    const distRect = Rect.from(drect.value)

    new Sketch()
      .rect({ stroke: '#32be71' }, sourceRect)
      .rect({ stroke: '#51caf3' }, distRect)
      .draw(origin)
   
    preview.fill('#292929')
    preview.blit(img, sourceRect, { distRect: useDist.value ? distRect : undefined })

    frame.blit(origin, origin.rect)
    frame.blit(preview, preview.rect)
    displayFps(fps)
  }

  ui.group('Source', gr => gr
    .expand()
    .tracker('x', -1000, 1000, 1, v => srect.value.x = v, srect.value.x)
    .tracker('y', -1000, 1000, 1, v => srect.value.y = v, srect.value.y)
    .tracker('w', 0, 1000, 1, v => srect.value.width = v, srect.value.width)
    .tracker('h', 0, 1000, 1, v => srect.value.height = v, srect.value.height)
  )

  ui.switch('Use Distibute Rectangle', () => {}, useDist)
  ui.group('Distibute', gr => gr
    .expand()
    .tracker('x', -1000, 1000, 1, v => drect.value.x = v, drect.value.x)
    .tracker('y', -1000, 1000, 1, v => drect.value.y = v, drect.value.y)
    .tracker('w', 0, 1000, 1, v => drect.value.width = v, drect.value.width)
    .tracker('h', 0, 1000, 1, v => drect.value.height = v, drect.value.height)
  ).shownif(() => useDist.value)
 
  return {
    ui: ui.build(),
    dispose () { 
      viewer.remove() 
    }
  }
}
