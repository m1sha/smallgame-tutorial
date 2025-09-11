import { loadImage, Surface } from "smallgame"
import { createScript } from "../script"

createScript('Rectangle', async ({ container, width, height }) => {
  const s = new Surface(width, height)
  s.fill(0x118845)

  const img = await loadImage('image.png')
  img.rect.center = s.rect.center
  img.rotateSelf(45)

  s.blit(img, img.rect)

  container.append(s.draw.origin.canvas)
})