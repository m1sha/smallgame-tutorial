import { loadImage, TPoint } from "smallgame"
import { type ScriptSettings, Viewer, displayFps } from "../../../core"
import { ColorsPalette, ImageView, Modifiers } from "./panels"
import { Pixels } from "smallgame/src/utils/pixels"

export default async ({ container, containerSize, fps, garbageCollect, viewerControls, panels }: ScriptSettings): Promise<void> => {
  //const viewer = new Viewer(containerSize, container, { disableContextMenu: true, garbageCollect, viewerControls })
  
  let img = await loadImage('img/solder-1w.png')
  let pixels = img.pixels
  
  const colorsPalette = new ColorsPalette()
  panels.addPanel(colorsPalette.panel)

  const replaceColorsPalette = new ColorsPalette()
  replaceColorsPalette.panel.position.y = 350
  replaceColorsPalette.panel.title = 'Replace Colors'
  panels.addPanel(replaceColorsPalette.panel)
  replaceColorsPalette.panel.hide()

  const imageView = new ImageView()
  panels.addPanel(imageView)
  imageView.image = img
  imageView.onClick = pos => {
    pickColor(pos, pixels, colorsPalette)
    pickColor(pos, pixels, replaceColorsPalette)
  }

  imageView.onImageUploaded = () => {
    img = imageView.image
    pixels = imageView.image.pixels
  }

  const modifiers = new Modifiers()
  panels.addPanel(modifiers)
  modifiers.onChangedModifier = name => {
    if (name === 'replace-colors') 
      replaceColorsPalette.panel.show()
    else
      replaceColorsPalette.panel.hide()
  }

  modifiers.addPalette(colorsPalette)
  modifiers.addReplacePalette(replaceColorsPalette)
  modifiers.onEraseColors = callback => imageView.image = callback(img)
  modifiers.onIndexingColors = callback => imageView.image = callback(img)
  modifiers.onReplaceColors = callback => imageView.image = callback(img)
  modifiers.onSave = () => img = imageView.image
  modifiers.onGetback = () => imageView.image = img
 
}

function pickColor (pos: TPoint, pixels: Pixels, palette: ColorsPalette) {
  if (pos.x < 0 || pos.x >= pixels.width) return
  if (pos.y < 0 || pos.y >= pixels.height) return
  const pix = pixels.getPixel(0 | pos.x, 0 | pos.y)
  if (pix.color.a === 0) return
  palette.pickColor(pix.color)
}