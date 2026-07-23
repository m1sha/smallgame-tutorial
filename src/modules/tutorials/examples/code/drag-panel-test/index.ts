import { loadBlob, loadImage, Rect } from "smallgame"
import { Assets, DragPanels, type ScriptSettings, Viewer, displayFps } from "../../../core"

export default async ({ container, containerSize, fps, builders, garbageCollect, viewerControls }: ScriptSettings): Promise<void> => {
  const ui = builders.ui()
  const viewer = new Viewer(containerSize, container, { disableContextMenu: true, garbageCollect, viewerControls })
  const telemetry = builders.telemetry()
  const panelName = telemetry.def('Panel Name', '')
  const panels = new DragPanels(containerSize)
  viewer.useInput(panels)
  const panel1 = panels.add('Panel 1', new Rect(300, 100, 400, 300), { resizable: true })
  const panel2 = panels.add('Panel 2', new Rect(800, 100, 400, 500))
  //panel2.contentAlignment = 'top-left'
  panel2.content = await Assets.img('tritubebuilding_640x960_120K.jpg')
  panel1.content = await Assets.img('green-mountains_612x384_61K.jpg')

  panels.onSelect = panel => { panelName.value = panel.caption }

  viewer.onFrameChanged = frame => {
    frame.clear()
    panels.draw(frame)
    displayFps(fps)
  }

  ui.upload('Upload Image', async file => {
    const r = await loadBlob(file)
    if (panelName.value === 'Panel 1') panel1.content = r
    if (panelName.value === 'Panel 2') panel2.content = r
  })

  let pNum = 3
  ui.button('Create Panel', async () => {
    const panel = panels.add('Penel ' +  pNum++, new Rect(Math.random() * 800 + 400, Math.random() * 400 + 40, Math.random() * 600 + 100, Math.random() * 600 + 100), { resizable: true })
    panel.content = await Assets.img(Math.random() > 0.5 ? 'lake_1280x720_264K.jpg' : 'Xbox-Controller-PNG_458x281_44K.png')
  })
}
