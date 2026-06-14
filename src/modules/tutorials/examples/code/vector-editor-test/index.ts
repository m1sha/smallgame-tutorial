import { Viewer } from "../../../../shared"
import { displayFps } from "../../../../../utils/display-fps"
import { type ScriptModule, type ScriptSettings } from "../../../../../components/example"
import { VectorEditor } from "../../../../shared/vector-editor"
import { MemSurface, Size } from "smallgame"

export default async ({ container, containerSize, fps, builders }: ScriptSettings): Promise<ScriptModule> => {
  const viewer = new Viewer(containerSize, container, { disableContextMenu: true })

  const surface = new MemSurface(new Size(viewer.viewportRect).scale(.75))
  surface.rect.absCenter = viewer.viewportRect.center

  const editor = new VectorEditor(surface)

  viewer.onInput = ev => {
    editor.input(ev)
  }

  viewer.onKeyPressed = keys => {
    editor.keyPressed(keys)
  }

  viewer.onFrameChanged = frame => {
    frame.clear()
    surface.fill('#444')
    editor.draw(surface)
    frame.blit(surface, surface.rect)
    displayFps(fps)
  }

  const ui = builders.ui()
  
  editor.ui(ui)
  return {
    ui: ui.build(),
    dispose () { 
      viewer.remove() 
    }
  }
}
