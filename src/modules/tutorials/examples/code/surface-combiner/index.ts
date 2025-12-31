import { MouseButton, Rect, Size, Sketch} from "smallgame"
import { displayFps } from "../../../../../utils/display-fps"
import { type ScriptModule, type ScriptSettings } from "../../../../../components/example"
import { createUI } from "./ui"
import { EditorState } from "./editor-state"
import { Viewer } from "../../../../shared"

export default async ({ container, width, height, fps }: ScriptSettings): Promise<ScriptModule> => {
  const viewer = new Viewer({ width, height}, container)
  const state = new EditorState(new Size(1024), viewer.surface)

  const img = new Sketch()
  .rect({ stroke: '#e6e6e6ff' }, new Rect(0, 0, width /2, height / 2 ))
  .rect({ stroke: '#e6e6e6ff' }, new Rect(width /2, 0, width /2, height / 2 ))
  .rect({ stroke: '#e6e6e6ff' }, new Rect(0, height / 2, width /2, height / 2 ))
  .rect({ stroke: '#e6e6e6ff' }, new Rect(width /2, height / 2, width /2, height / 2 ))
  //.hline({ stroke: '#e6e6e6ff' }, { x: 0, y: height / 2 }, width)
 .toSurface(viewer.surface.rect.width, viewer.surface.rect.height)

  viewer.onInput = ev => {
    if (ev.type === 'MOUSEDOWN') {
      const r = state.imageGroup.collidePoint(ev.pos, s => {
        if (ev.ctrlKey)
          state.addSelectImageSprite(s)
        else
          state.selectImageSprite(s)
      })
      if (!r) state.clearSelectedImageSprites()
    }
    if (ev.type === 'MOUSEMOVE') {
      if (ev.button === MouseButton.LEFT)
      state.imageGroup.sprites.forEach(p => {
        if (!state.isSelectedImageSprite(p)) return
        p.rect.shiftSelf(ev.shift)
      })
    }
  }

  viewer.onFrameChanged = surface => {
    surface.clear()
    state.canvas.draw(surface)
    state.imageGroup.draw(surface)
    state.slectedGroup.draw(surface)
    surface.blit(img, img.rect)
    displayFps(fps)
  }

  return {
    ui: createUI(state),
    dispose () { 
      viewer.remove() 
    }
  }
}
