import { AnimatedSprite, loadImage, SpriteSheet } from "smallgame"

export type VFXName =
  | 'explosion-01'
  | 'explosion-02'
  | 'explosion-smoke-01'
  | 'flame-02'
  | 'pixel-smoke-dust-01'
  | 'pixel-smoke-dust-02'
  | 'pixel-smoke-dust-03'
  | 'pixel-smoke-dust-04'
  | 'pixel-smoke-dust-05'
  | 'pixel-smoke-dust-06'

export class VFX {
  constructor (readonly sprite: AnimatedSprite) {}
}

export async function vfx (name: VFXName) {
  const img = await loadImage(`vfx/${name}.png`)
  let sx = 1 / 5
  let sy = 1 / 5
  if (name === 'flame-02') {
    sx = 1 / 15
    sy = 1 / 4
  }
  if (name.startsWith('pixel-smoke-dust')) {
    sx = 1 / 8
    if (name.endsWith('06')) sx = 1 / 10
    sy = 1
  }
  const sheet = new SpriteSheet(img, img.rect.size.scale(sx, sy), 3)
  return new VFX(new AnimatedSprite(sheet))
}
