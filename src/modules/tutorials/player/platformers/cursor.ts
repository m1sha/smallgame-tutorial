import { AnimatedSprite, GameEvent, loadImage, Point, Rect, Size, Sketch, SpriteSheet, Surface, Time } from "smallgame";
import { Platforms } from "../shared";

export class Cursor {
  private platforms: Platforms
  private cursorActive = false
  private sprite: AnimatedSprite | null = null
  private spriteMoving: AnimatedSprite | null = null
  private spriteIdle: AnimatedSprite | null = null

  pos: Point = Point.zero
  private spriteRect: Rect = Rect.zero
  colliderRect: Rect = new Rect(40, 55, 40, 76)
  showFrame: boolean = true
  fallSpeed = 50

  constructor () {

  }

  async load () {
    let img = await loadImage('characters/Gangsters_2/Idle_2.png')
    let idleSs = new SpriteSheet(img, new Size(img.width / 13, img.height), 8)
    this.spriteIdle = new AnimatedSprite(idleSs, new Size(128), { useDiagonal: false })
    
    img = await loadImage('characters/Gangsters_2/Jump.png')
    idleSs = new SpriteSheet(img, new Size(img.width / 10, img.height), 6)
    idleSs.addBatch('jump', 4, 4)
    this.spriteMoving = new AnimatedSprite(idleSs, new Size(128), { useDiagonal: false })
    this.spriteMoving.playBatch('jump')

    this.sprite = this.spriteIdle
  }

  input (ev: GameEvent) {
    const colliderRect = this.colliderRect.shift(this.spriteRect)

    if (ev.type === 'MOUSEDOWN') {
      this.cursorActive = colliderRect.containsPoint(ev.pos)
    }

    if (ev.type === 'MOUSEMOVE') {
      if (ev.lbc && this.cursorActive) {
        const pltrms = this.platforms.getPlatforms(colliderRect)
        const isBellow = pltrms.some(p => p.insect === 'bottom' && colliderRect.midBottom.shift(ev.shift).y +1 >  p.rect.y )
        if (isBellow) return
        const isRight = pltrms.some(p => p.insect === 'right' && colliderRect.absWidth + ev.shift.x +1 >  p.rect.x )
        if (isRight) return
        const isLeft = pltrms.some(p => p.insect === 'left' && colliderRect.x + ev.shift.x -1 <  p.rect.absWidth )
        if (isLeft) return
        
        this.pos.shiftSelf(ev.shift)
        this.sprite = this.spriteMoving
      }
    }
    if (ev.type === 'MOUSEUP') {
      this.cursorActive = false
      this.sprite = this.spriteIdle
    }
  }

  draw (frame: Surface) {
    const colliderRect = this.colliderRect.shift(this.spriteRect)
    const pltrms = this.platforms.getPlatforms(colliderRect)
    const isBellow = pltrms.some(p => p.insect === 'bottom' && colliderRect.midBottom.shift(this.fallSpeed * Time.deltaTime).y +1 >  p.rect.y )
    if (!isBellow && !this.cursorActive) {
      this.pos.shiftYSelf(this.fallSpeed * Time.deltaTime)
      this.sprite = this.spriteMoving
    }
    if (isBellow) this.sprite = this.spriteIdle

    if (this.sprite) {
      this.sprite.update()
      const img = this.sprite.image
      this.spriteRect = img.rect.dup()
      this.spriteRect.moveSelf(this.pos)
      const colliderRect = this.colliderRect.shift(this.spriteRect)

      if (this.showFrame)
      new Sketch()
        .rect({ stroke: '#9b9b9bfd', fill: '#464646b6', lineDash: [3, 5] }, colliderRect)
        .draw(frame)
      
      frame.blit (img, this.spriteRect)
      
      if (this.showFrame)
       new Sketch()
        .rect({ stroke: '#9b9b9bfd', lineDash: [3, 5] }, colliderRect)
        .circle({ fill: '#dceff8e8' }, colliderRect.midBottom, 2)
        .circle({ fill: '#dceff8e8' }, colliderRect.midTop, 2)
        .circle({ fill: '#dceff8e8' }, colliderRect.midLeft, 2)
        .circle({ fill: '#dceff8e8' }, colliderRect.midRight, 2)
        .rect({ fill: '#eaf5fae8' }, Rect.fromCenter(colliderRect.topLeft, 3,3))
        .rect({ fill: '#eaf5fae8' }, Rect.fromCenter(colliderRect.topRight, 3,3))
        .rect({ fill: '#eaf5fae8' }, Rect.fromCenter(colliderRect.bottomLeft, 3,3))
        .rect({ fill: '#eaf5fae8' }, Rect.fromCenter(colliderRect.bottomRight, 3,3))
        .draw(frame)
    }

    if (this.cursorActive && this.showFrame) {
      new Sketch()
      .defineStyle('line', { stroke: '#7f7f7f', lineDash: [3, 5] })
      .line('line', new Point(0, colliderRect.y), colliderRect.topLeft)
      .line('line', new Point(0, colliderRect.absHeight), colliderRect.bottomLeft)
      .line('line', colliderRect.topRight, new Point(frame.rect.absWidth, colliderRect.y))
      .line('line', colliderRect.bottomRight, new Point(frame.rect.absWidth, colliderRect.absHeight))
      .line('line', colliderRect.bottomLeft, new Point(colliderRect.x, frame.rect.absHeight))
      .line('line', colliderRect.bottomRight, new Point(colliderRect.absWidth, frame.rect.absHeight))
      .draw(frame)
    }

  }

  setPlatforms (platforms: Platforms) {
    this.platforms = platforms
  }
}