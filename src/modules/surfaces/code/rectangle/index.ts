import { loadImage, Surface } from "smallgame"
import { type ScriptModule, type ScriptSettings } from "../../../../components/example"

export default async ({ container, width, height }: ScriptSettings): Promise<ScriptModule> => {
  const s = new Surface(width, height)
  s.fill(0x118845)

  const img = await loadImage('image.png')
  img.rect.center = s.rect.center
  img.rotateSelf(45)

  s.blit(img, img.rect)

  container.append(s.draw.origin.canvas)

  return {}
}