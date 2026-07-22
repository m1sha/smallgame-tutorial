import { loadImage, Size } from "smallgame"
import { type ScriptSettings, Viewer, displayFps } from "../../../core"
import { TilePalette } from "./tile-palette"
import { LevelEditor } from "./level-editor"

export default async ({ container, containerSize, fps, builders, garbageCollect, viewerControls }: ScriptSettings): Promise<void> => {
  const viewer = new Viewer(containerSize, container, { disableContextMenu: true, garbageCollect, viewerControls })
  
  const img = await loadImage('platformer/Terrain_(16x16).png')
  const tileSize = new Size(16)
  const levelEditorSize = new Size(1000, 800)
  const palettePanelSize = new Size(700, 400)
 
  const editor = new LevelEditor(img, tileSize, levelEditorSize, containerSize)
  editor.update()

  const palette = new TilePalette(img, tileSize, palettePanelSize, containerSize)
  viewer.useInput(palette.panels)

  palette.onTilesSelected = () => {
    
  }
 
  
  viewer.onFrameChanged = frame => {
    frame.clear()
    editor.draw(frame)
    palette.draw(frame)
    displayFps(fps)
  }
}
