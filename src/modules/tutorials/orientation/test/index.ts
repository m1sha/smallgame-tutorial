import { MemSurface, Point, Rect, Size, Sketch } from "smallgame"
import { type ScriptSettings, Viewer, createPattern, displayFps } from "../../core"

export default async ({ container, containerSize, fps, builders, garbageCollect, viewerControls }: ScriptSettings): Promise<void> => {
  const viewer = new Viewer(containerSize, container, { disableContextMenu: true, garbageCollect, viewerControls })

  const { pattern } =  await createPattern('chess-tex.jpg', 'repeat')

  const ui = builders.ui()
  ui.select('sdasda', ['asdsad', 'dfgdfgsdasd'], val => {}, 'asdsad')


  const surface = new MemSurface(containerSize)
  
  const sss = Sketch.new()
  sss.circle({ fill: '#787889' }, containerSize.half().toPoint(), 50)
  sss.roundedrect({ stroke: 'red', fill: pattern }, new Rect(100, 100, 500, 300), 30)
  sss.draw(surface)

  viewer.onFrameChanged = frame => {
    frame.clear()
    frame.blit(surface, surface.rect)
    displayFps(fps)
  }
}
