import { AnimatedSprite, deg, Game, gameloop, loadImage, M33, Point, rad, Rect, Size, Sketch, SpriteSheet } from "smallgame"
import { displayFps } from "../../../../../utils/display-fps"
import { type ScriptModule, type ScriptSettings } from "../../../../../components/example"
import { UIBuilder } from "../../../../../components/example/code/ui"
import { Viewer } from "../../../../shared"

export default async ({ container, width, height, fps }: ScriptSettings): Promise<ScriptModule> => {
  const viewer = new Viewer({ width, height}, container)

  const img = await loadImage('space-striker/tiny-ships/tinyShip1.png')
  const img2 = await loadImage('space-striker/tiny-ships/tinyShip2.png')
  const img3 = await loadImage('space-striker/tiny-ships/tinyShip3.png')
  const spriteSheet = new SpriteSheet(img, new Size(24, 27), 12, new Point(1, 0))
      .addBatch('idle', 0, 5)
      .addBatch('attack', 6, 4)
      .addBatch('move', 12, 5)
  const spriteSheet2 = new SpriteSheet(img2, new Size(34, 36), 30, new Point(1, 0))
    .addBatch('idle', 0, 5)
    .addBatch('attack', 6, 4)
    .addBatch('move', 12, 5)
  const spriteSheet3 = new SpriteSheet(img3, new Size(26, 27), 6, new Point(1, 0))
    .addBatch('idle', 0, 5)
    .addBatch('attack', 6, 4)
    .addBatch('move', 12, 5)
    
  const sprite = new AnimatedSprite(spriteSheet, spriteSheet.size.scale(2))
  const sprite2 = new AnimatedSprite(spriteSheet2, spriteSheet2.size.scale(2))
  const sprite3 = new AnimatedSprite(spriteSheet3, spriteSheet3.size.scale(2))

  //sprite.playBatch('attack')
  //sprite2.playBatch('attack')
  //sprite3.playBatch('attack')
   
    
  

  
  const centerPointImg = new Sketch().circle({ fill: '#419b66ff', stroke: '#204122ff', lineWidth: 2 }, Rect.size(16, 16).center, 6).toSurface()
  centerPointImg.rect.center = viewer.surface.rect.center
  
  sprite.rect.center = centerPointImg.rect.absCenter.shiftX(-240)
  sprite2.rect.center = sprite.rect.absCenter.shiftX(240)
  sprite3.rect.center = sprite2.rect.absCenter.shiftX(100)



  let a = -0.2
  let b = -0.3
  let c = 4.1
  let center = centerPointImg.rect.absCenter //Rect.size(width, height).center
  sprite.rotationAngle = 180
  debugger
  sprite2.rotationAngle = 90
  sprite3.rotationAngle = -90

  let ca = 0

  viewer.onFrameChanged = surface => {
    //screen.fill('#888')
    ca += 4.85
    console.log(Math.sin(rad(ca % 360)))
    centerPointImg.rect.x +=  Math.sin(rad(ca)) * 16

    center = centerPointImg.rect.absCenter

    surface.blit(centerPointImg, centerPointImg.rect)
    //sprite.draw(screen)
    sprite2.draw(surface)
    sprite3.draw(surface)


    const m = M33.rotate(a, center)
    const point = m.applyToPoint(sprite.rect.absCenter)
    sprite.rect.absCenter = point
    sprite.rotationAngle += a

    const m2 = M33.rotate(b, sprite.rect.absCenter).mul(m)
    
    const point2 = m2.applyToPoint(sprite2.rect.absCenter)
    sprite2.rect.absCenter = point2
    sprite2.rotationAngle += b

    const m3 = M33.rotate(c, sprite2.rect.absCenter)

    const x =  M33.mul(M33.mul(m, m2), m3)
    
    const point3 = x.applyToPoint(sprite3.rect.absCenter)
    sprite3.rect.absCenter = point3
    sprite3.rotationAngle = c
      



    displayFps(fps)
  }

  const ui = new UIBuilder()
  return {
    ui: ui.build(),
    dispose () { 
      viewer.remove() 
    }
  }
}
