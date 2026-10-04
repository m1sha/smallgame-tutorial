import { loadImage } from "smallgame"
import { type ScriptSettings, Viewer, displayFps } from "../../../core"
import { SpriteAtlasEditPanel } from "./panels"
import { Renderer } from "./renderer"

export default async ({ container, containerSize, fps, garbageCollect, globalViewport, panels }: ScriptSettings): Promise<void> => {
  const viewer = new Viewer(containerSize, container, { disableContextMenu: true, garbageCollect, globalViewport })
  let img = await loadImage('platformer/arkanoid/arkanoid-atlas.png')
  let boxes = []
  let renderer = new Renderer(img.rect.size)

  const atlasEditor = panels.use(SpriteAtlasEditPanel, async (_, actionName) => {
    if (actionName === 'init') {
      atlasEditor.img = img
    }

    if (actionName === 'changed-img') {
      img = atlasEditor.img!
      renderer = new Renderer(img.rect.size)
      draw()
    }

    if (actionName === 'detected') {
      boxes = atlasEditor.boxes
      draw()
    }

    if (actionName === 'changed-mode') {
      draw()
    }
  })

  const draw = () => {
    renderer.render(img, atlasEditor, viewer.viewport.zoom)
  }

  draw()

  viewer.onInput = ev => {
    if (ev.type === 'MOUSEMOVE' && ev.lbc) {
      viewer.viewport.panBy(ev.shift)
    }
    if (ev.type === 'WHEEL') {
      viewer.viewport.zoomAt(ev.deltaY, ev.pos.x, ev.pos.y)
      draw()
    }
  }
  viewer.surface.imageRendering = 'pixelated'
  viewer.onFrameChanged = frame => {
    frame.clear()
    const surface = renderer.surface
    const viewport = viewer.viewport
    const rect = surface.rect.move(viewport.offset).scalesize(viewport.zoom)
    frame.blit(surface, rect)
    displayFps(fps)
  }
}
