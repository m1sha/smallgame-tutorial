import { Viewer } from "../../../../shared"
import { displayFps } from "../../../../../utils/display-fps"
import { type ScriptModule, type ScriptSettings } from "../../../../../components/example"
import { VectorEditor } from "../../../../shared/vector-editor"

export default async ({ container, containerSize, fps, builders }: ScriptSettings): Promise<ScriptModule> => {
  const viewer = new Viewer(containerSize, container, { disableContextMenu: true })

  const editor = new VectorEditor()

  viewer.onInput = ev => {
    editor.input(ev)
  }

  viewer.onFrameChanged = frame => {
    frame.clear()

    editor.draw(frame)
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
