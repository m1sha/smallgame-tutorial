import { loadImage } from "smallgame"
import { type ScriptSettings, Viewer, displayFps } from "../../../core"
import { ColorsPalette, ImageView } from "./panels"

export default async ({ container, containerSize, fps, garbageCollect, viewerControls, panels }: ScriptSettings): Promise<void> => {
  //const viewer = new Viewer(containerSize, container, { disableContextMenu: true, garbageCollect, viewerControls })
  
  let img = await loadImage('img/solder-1w.png')
  let pixels = img.pixels
  
  const imageView = new ImageView()
  const colorsPalette = new ColorsPalette()
  panels.addPanel(colorsPalette.panel)
  colorsPalette.onEraseColors = callback => imageView.image = callback(img)
  colorsPalette.onIndexingColors = callback => imageView.image = callback(img)
  colorsPalette.onReplaceColors = callback => imageView.image = callback(img)

  
  panels.addPanel(imageView)
  imageView.image = img
  imageView.onClick = pos => {
    if (pos.x < 0 || pos.x >= pixels.width) return
    if (pos.y < 0 || pos.y >= pixels.height) return
    const pix = pixels.getPixel(0 | pos.x, 0 | pos.y)
    if (pix.color.a === 0) return
    colorsPalette.pickColor(pix.color)
  }

  imageView.onImageUploaded = () => {
    img = imageView.image
    pixels = imageView.image.pixels
  }
 
}

