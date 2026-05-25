import { AnimatedSprite, loadImage, Size, SpriteSheet } from "smallgame"

export class Player {
  private sprite: AnimatedSprite | null = null
  dir = 1
  isIdle = true
  jumping = false
  
  async load () {
    const img = await loadImage('action-pack/Full-Sheet.png')
    const ss = new SpriteSheet(img, new Size(72.225, 72), 8)
    ss.addBatch('idle', 1)
    ss.addBatch('run', 2, 8)
    ss.addBatch('jump', 26, 8)

    this.sprite = new AnimatedSprite(ss)
    this.sprite.playBatch('run')
   
  }

  get image () {
    const zoom = 1.6
    return this.dir == -1 ? this.sprite.image.scale(zoom, zoom).flip('x') : this.sprite.image.scale(zoom, zoom)
  }

  action () {
    if (this.jumping) {
      this.sprite.playBatch('jump')  
    } else
    this.sprite.playBatch(this.isIdle ? 'idle' : 'run')
    this.sprite.update()
  }
}