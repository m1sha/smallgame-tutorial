import { type ScriptSettings, Viewer, displayFps, VectorEditor } from "../../../core"
import { MemSurface, Size } from "smallgame"

export default async ({ container, containerSize, fps, builders, garbageCollect }: ScriptSettings): Promise<void> => {
  const viewer = new Viewer(containerSize, container, { disableContextMenu: true, garbageCollect })
  const surface = new MemSurface(new Size(viewer.viewportRect).scale(.75))
  surface.rect.absCenter = viewer.viewportRect.center

  const editor = new VectorEditor(surface)
  editor.useBuilders(builders)
  viewer.useInput(editor)
  // editor.useEditor(false)

  viewer.onFrameChanged = frame => {
    frame.clear()
    surface.fill('#444')
    editor.draw(surface)
    frame.blit(surface, surface.rect)
    displayFps(fps)
  }
}
