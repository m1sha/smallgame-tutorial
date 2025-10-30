import { loadImage, Surface } from "smallgame"

export async function imgCombine () {
  const img1 = await loadImage('tiles-to-combine/Dizzy/Dizzy1.png')
  const img2 = await loadImage('tiles-to-combine/Dizzy/Dizzy2.png')
  const img3 = await loadImage('tiles-to-combine/Dizzy/Dizzy3.png')
  const img4 = await loadImage('tiles-to-combine/Dizzy/Dizzy4.png')
  const img5 = await loadImage('tiles-to-combine/Dizzy/Dizzy5.png')
  const img6 = await loadImage('tiles-to-combine/Dizzy/Dizzy6.png')

  const img7 = await loadImage('tiles-to-combine/hurt/player-hurt-1.png')
  const img8 = await loadImage('tiles-to-combine/hurt/player-hurt-2.png')
  const img9 = await loadImage('maskDude.png')
  

  const imgs = [img1, img2, img3, img4, img5,  img9, img6, img7, img8]
  
  const { surface } = Surface.combine(imgs, 3, 3)

  surface.imageRendering = 'pixelated'
  surface.zoom(4)

  return { canvas: surface.draw.origin.canvas  }
}