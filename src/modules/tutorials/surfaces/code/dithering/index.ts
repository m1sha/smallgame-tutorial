import { type ScriptSettings, Viewer, displayFps } from "../../../core"
import { loadImage, MemSurface, Size } from "smallgame"
import { OrderedDithering } from "./ordered-dithering"
import { FloydSteinberg } from "./floyd-steinberg"
import { AtkinsonDithering } from "./atkinson-dithering"
import { Pixels } from "smallgame/src/utils/pixels"
import { BlueNoiseGray } from "./blue-noise-gray"
import { Halftone } from "./halftone"

export default async ({ container, containerSize, fps, builders, garbageCollect, viewerControls }: ScriptSettings): Promise<void> => {
  const viewer = new Viewer(containerSize, container, { disableContextMenu: true, garbageCollect, viewerControls })
  const img = await loadImage('img/lake_1280x720_264K.jpg') //await loadImage('img/green-mountains_612x384_61K.jpg')
  const mask =  await loadImage('patterns/chess-tex.jpg') // await loadImage('masks/blue-noise/blue-noisewea-low-frequency.png') // await loadImage('patterns/chess-tex.jpg') //await loadImage('masks/blue-noise/blue-noisewea-low-frequency.png')
  const surface = new MemSurface(img.rect.size)
  const applyFilter = (filter?: { apply: (pixels: Pixels) => void }) => {
    const pixels = img.pixels
    filter?.apply(pixels)
    surface.pixels = pixels
  }

  BlueNoiseGray.noise = mask.pixels
      BlueNoiseGray.palette = [20,80,110,150,220 ]
  applyFilter(OrderedDithering)

  const rect = img.rect.dup()
  rect.scalesizeSelf(1.1)
  rect.center = viewer.viewportRect.center

  viewer.onFrameChanged = frame => {
    frame.clear()
    frame.blit(surface, rect)
    displayFps(fps)
  }

  const ui = builders.ui()
  ui.select('Dithering Algorithm', [
    'No Dithering', 
    'Ordered Dithering', 
    'Floyd Steinberg', 
    'Atkinson Dithering',
    'BlueNoiseGray',
    'Halftone'
  ], val => {
    if (val === 'No Dithering') applyFilter()
    if (val === 'Ordered Dithering') applyFilter(OrderedDithering)
    if (val === 'Floyd Steinberg') applyFilter(FloydSteinberg)
    if (val === 'Atkinson Dithering') applyFilter(AtkinsonDithering)
    if (val === 'BlueNoiseGray') {
      
      applyFilter(BlueNoiseGray)
    }
    if (val === 'Halftone') applyFilter(Halftone)
  }, 'Ordered Dithering')

  const surface1 = new MemSurface(new Size(320, 200))
  surface1.fill('green')
 
  const items = [
    {
      id: "1",
      surface: mask 
    }
  ]
  
  ui.selectImage('Blue-Noise Mask', items, v => {})
}
