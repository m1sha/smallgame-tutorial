import { loadImage } from "smallgame"
import { type ScriptSettings, Viewer, displayFps } from "../../../core"
import { Box, SpriteAtlasEditPanel } from "./panels"
import { Renderer } from "./renderer"
import { Controller } from "./controller"

export default async ({ container, containerSize, fps, garbageCollect, globalViewport, panels }: ScriptSettings): Promise<void> => {
  const viewer = new Viewer(containerSize, container, { disableContextMenu: true, garbageCollect, globalViewport })
  let img = await loadImage('platformer/arkanoid/arkanoid-atlas.png')
  let boxes = []
  let renderer = new Renderer(img.rect.size)
  const controller = new Controller()

  const atlasEditor = panels.use(SpriteAtlasEditPanel, async (_, actionName, args) => {
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

    if (actionName === 'selected') {
      atlasEditor.deselectBoxes()
      const box = args as Box
      box.selected = true
      draw()
    }

    if (actionName === 'changed-rect') {
      draw()
    }
  })

  const draw = () => renderer.render(img, atlasEditor, viewer.viewport.zoom)

  draw()
  //controller.onExecute = () => {
  //  
  //}

  viewer.onInput = ev => {
    //controller.execute(ev)

    if (ev.type === 'MOUSEDOWN') {
      const rect = renderer.surface.rect.move(viewer.viewport.offset).scalesize( viewer.viewport.zoom)
      atlasEditor.selectBoxByPoint(ev.pos.shift(rect.topLeft.neg()))
      draw()
    }
    
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
