import { AnimatedSprite, deg, Game, gameloop, loadImage, Point, rad, Size, SpriteSheet } from "smallgame"
import { displayFps } from "../../../../../utils/display-fps"
import { type ScriptModule, type ScriptSettings } from "../../../../../components/example"
import { UIBuilder } from "../../../../../components/example/code/ui"

export default async ({ container, width, height, fps }: ScriptSettings): Promise<ScriptModule> => {
  const { game, screen } = Game.create(width, height, container)

  
  const img1 = await loadImage('space-striker/tiny-ships/tinyShip1.png')
  const img2 = await loadImage('space-striker/tiny-ships/tinyShip2.png')
  const img3 = await loadImage('space-striker/tiny-ships/tinyShip3.png')

  const spriteSheet1 = new SpriteSheet(img1, new Size(24, 27), 30, new Point(1, 0), { idle: 5, attack: 6, move: 5 })
    .addBatch('idle', 5)
    .addBatch('attack', 4)
    .addBatch('move', 5)
  const spriteSheet2 = new SpriteSheet(img2, new Size(34, 36), 12, new Point(1, 0))
    .addBatch('idle', 6)
    .addBatch('attack', 4)
    .addBatch('move', 4)
  const spriteSheet3 = new SpriteSheet(img3, new Size(26, 27), 6, new Point(1, 0))
    .addBatch('move', 5)
    .addBatch('idle', 5)
    
  
  
  const sprite1 = new AnimatedSprite(spriteSheet1, spriteSheet1.size.scale(2))
  const sprite2 = new AnimatedSprite(spriteSheet2, spriteSheet2.size.scale(2))
  const sprite3 = new AnimatedSprite(spriteSheet3, spriteSheet3.size.scale(2))

  //sprite1.playBatch('move')
  sprite2.playBatch('attack')
  sprite3.playBatch('idle')
  
  sprite2.rect.center = screen.rect.center
  sprite1.rect.center = screen.rect.center.shiftX(200)
  sprite3.rect.center = screen.rect.center.shiftX(-200)

  const r = 0
  let i = 0

  //sprite1.spriteSheet.flip = 'y'
  sprite2.spriteSheet.flip = 'y'
  sprite3.spriteSheet.flip = 'y'
  
  //Point.one.rotate()
  debugger

  gameloop(() => {
    screen.fill('#888')
    sprite2.draw(screen)
    //sprite2.draw(screen)
    sprite3.draw(screen)

    sprite1.update()

    screen.blit(sprite1.image, sprite1.rect)

    i+=0.01

    ///const m = new DOMMatrix().translate(width / 2 + r, height / 2 + r).rotate(i).translate(-width / 2 + r, -height / 2 + r)

    const s =  Math.cos(i) +  Math.sin(i)
    const c = Math.sin(i) -  Math.cos(i)

     
     //sprite1.rect.shiftSelf(c * 1.8, -s * 1.8)
     //sprite1.rotationAngle = 90 - deg(i)

    //const pp = sprite2.rect.center.shift( new Point(c, -s))
    //sprite2.rect.center = pp

    //sprite.rect.moveSelf(Point.from(m.transformPoint(sprite.rect)).int())
    //sprite2.rect.moveSelf(Point.from(m.transformPoint(sprite2.rect)).int())
    //sprite2.rect.center = sprite2.rect.center.scale(p)
    //sprite3.rect.center = sprite3.rect.center.scale(p)
    displayFps(fps)
  })

  const ui = new UIBuilder()
  ui.upload('Load Sprite Sheet', file => {})
  
  return {
    ui: ui.build(),
    dispose () { 
      game.kill() 
    }
  }
}
