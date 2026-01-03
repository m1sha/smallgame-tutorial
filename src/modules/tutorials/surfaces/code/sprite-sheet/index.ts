import { AnimatedSprite, loadImage, Point, Size, SpriteSheet } from "smallgame"
import { displayFps } from "../../../../../utils/display-fps"
import { type ScriptModule, type ScriptSettings, EntityListBuilder, UIBuilder } from "../../../../../components/example"
import { Viewer } from "../../../../shared"

export default async ({ container, width, height, fps }: ScriptSettings): Promise<ScriptModule> => {
  const entities = new EntityListBuilder()
  const viewer = new Viewer({ width, height }, container, { disableContextMenu: true })
  
  const img1 = await loadImage('space-striker/tiny-ships/tinyShip1.png')
  const img2 = await loadImage('space-striker/tiny-ships/tinyShip2.png')
  const img3 = await loadImage('space-striker/tiny-ships/tinyShip3.png')
  const img4 = await loadImage('characters/raza/raza54bbig1.png')
  

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

  const spriteSheet4 = new SpriteSheet(img4, new Size(48, 56), 12, new Point(0, 0))
    .addBatch('move', 6, 9)
    .addBatch('idle', 5)
    
  
  
  const sprite1 = new AnimatedSprite(spriteSheet1, spriteSheet1.size.scale(2))
  const sprite2 = new AnimatedSprite(spriteSheet2, spriteSheet2.size.scale(2))
  const sprite3 = new AnimatedSprite(spriteSheet3, spriteSheet3.size.scale(2))
  const sprite4 = new AnimatedSprite(spriteSheet4, spriteSheet4.size.scale(2))

  entities.add('sprite1')

  //sprite1.playBatch('move')
  sprite2.playBatch('attack')
  sprite3.playBatch('idle')
  
  sprite2.rect.center = viewer.surface.rect.center
  sprite1.rect.center = viewer.surface.rect.center.shiftX(200)
  sprite3.rect.center = viewer.surface.rect.center.shiftX(-200)

  sprite4.rect.center = viewer.surface.rect.center.shiftX(-300)

  

  //sprite1.spriteSheet.flip = 'y'
  sprite2.spriteSheet.flip = 'y'
  sprite3.spriteSheet.flip = 'y'
  
  
  viewer.onFrameChanged = surface => {
    surface.clear()
    sprite2.draw(surface)
    sprite3.draw(surface)
    sprite4.draw(surface)
    sprite1.update()

    surface.blit(sprite1.image, sprite1.rect)
    displayFps(fps)
  }

 

  const ui = new UIBuilder()
  ui.upload('Load Sprite Sheet', file => {})
  
  return {
    ui: ui.build(),
    entities: entities.build(),
    viewer: viewer.ui.build(),
    dispose () { 
      viewer.remove() 
    }
  }
}
