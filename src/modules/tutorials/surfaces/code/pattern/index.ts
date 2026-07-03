import { loadImage, Rect, Sketch } from "smallgame"
import { type ScriptSettings, Viewer, displayFps } from "../../../core"

export default async ({ container, containerSize, fps, builders, viewerControls, garbageCollect }: ScriptSettings): Promise<void> => {
  const viewer = new Viewer(containerSize, container, { disableContextMenu: true, garbageCollect, viewerControls })
  const ui = builders.ui()
  const zoom = ui.var(1)
  const offsetX = ui.var(0)
  const offsetY = ui.var(0)
  const pw = ui.var(800)
  const ph = ui.var(800)

  let previewRect = Rect.zero
  const updatePreviewRect = () => {
    previewRect = Rect.size(pw.value, ph.value)
    previewRect.absCenter = viewer.viewportRect.absCenter
  }

  let img = await loadImage('patterns/chess-tex.jpg', { useSmooth: false })
  let pattern: CanvasPattern | null = null 
  let repetition: "repeat" | "repeat-x" | "repeat-y" | "no-repeat" = 'repeat'
  const loadPattern = async () => {
    pattern = img
      .scale(zoom.value, zoom.value)
      .toPattern(repetition)
    pattern.setTransform(new DOMMatrix().translateSelf(offsetX.value, offsetY.value))
  }

  updatePreviewRect()
  await loadPattern()

  viewer.onFrameChanged = frame => {
    frame.clear()
    Sketch.new()
      .rect({ fill: pattern }, previewRect)
      .draw(frame)
    displayFps(fps)
  }

  ui.select('Image', ['Chess', 'Cross', 'Cross-4'], async v => {
    if (v === 'Chess') img = await loadImage('patterns/chess-tex.jpg', { useSmooth: false })
    if (v === 'Cross') img = await loadImage('patterns/cross-dec-tex.bmp', { useSmooth: false })
    if (v === 'Cross-4') img = await loadImage('patterns/cross-4-dec-tex.bmp', { useSmooth: false })
    await loadPattern()
  }, 'Chess')
  
  ui.group('Pattern', gr => gr
    .expand()
    .select('Repetition', ['No Repeat', 'Repeat', 'Repeat X', 'Repeat Y'], async v => {
      if (v === 'No Repeat') repetition = 'no-repeat'
      if (v === 'Repeat') repetition = 'repeat'
      if (v === 'Repeat X') repetition = 'repeat-x'
      if (v === 'Repeat Y') repetition = 'repeat-y'
      await loadPattern()
    }, 'Repeat')
    .tracker('Offset X', -600, 600, 1, () => loadPattern(), offsetX)
    .tracker('Offset Y', -600, 600, 1, () => loadPattern(), offsetY)
    .tracker('Zoom', 0.25, 16, 0.25, () => loadPattern(), zoom)
  )
  ui.group('Preview Size', gr => gr
    //.expand()
    .tracker('Width', 0, 1200, 1, () => updatePreviewRect(), pw)
    .tracker('Height', 0, 1000, 1, () => updatePreviewRect(), ph)
  )
}
