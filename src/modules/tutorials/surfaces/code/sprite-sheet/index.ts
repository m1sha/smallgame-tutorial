import { AnimatedSprite, loadImage, Point, Rect, setSize, Size, SpriteSheet, Surface } from "smallgame"
import { displayFps } from "../../../../../utils/display-fps"
import { type ScriptModule, type ScriptSettings } from "../../../../../components/example"
import { Assets, Viewer } from "../../../../shared"

export default async ({ container, containerSize, fps, builders }: ScriptSettings): Promise<ScriptModule> => {
  const entities = builders.entities()
  const viewer = new Viewer(containerSize, container, { disableContextMenu: true })
  
  const img1 = await loadImage('arcades/space-striker/tiny-ships/tinyShip1.png')
  const img2 = await loadImage('arcades/space-striker/tiny-ships/tinyShip2.png')
  const img3 = await loadImage('arcades/space-striker/tiny-ships/tinyShip3.png')
  const img4 = await loadImage('platformer/characters/raza/raza54bbig1.png')

  const knight = await loadImage('topdown/CharacterKnight/Run.png')
  

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

  const knightSpriteSheet = new SpriteSheet(knight, new Size(128, 128), 18, new Point(0, 0))
    //.addBatchList([{"start":0,"count":14,"name":"up"},{"start":30,"count":14,"name":"down"},{"start":60,"count":14,"name":"left"},{"start":105,"count":14,"name":"right"}])
    .addBatchList([{"start":0,"count":14,"name":"right"},{"start":30,"count":14,"name":"down"},{"start":60,"count":14,"name":"left"},{"start":90,"count":14,"name":"up"}])
    


  const { sprite: vfx1 } = await Assets.vfx('explosion-smoke-01')
  const { sprite: vfx2 } = await Assets.vfx('pixel-smoke-dust-06')
  vfx1.spriteSheet.rate = 15
  vfx1.rect.x = 40
  //vfx1.

    
  
  
  const sprite1 = new AnimatedSprite(spriteSheet1, spriteSheet1.size.scale(2))
  const sprite2 = new AnimatedSprite(spriteSheet2, spriteSheet2.size.scale(2))
  const sprite3 = new AnimatedSprite(spriteSheet3, spriteSheet3.size.scale(2))
  const sprite4 = new AnimatedSprite(spriteSheet4, spriteSheet4.size.scale(2))

  
  sprite4.update()

  const knightSprite = new AnimatedSprite(knightSpriteSheet, knightSpriteSheet.size.scale(1.5))
  knightSprite.playBatch('left')
  
  
 
  const entityGrid = entities.addGrid<AnimatedSprite>(obj => { 
    let frame = obj.getFrame(0)
    frame = frame.resize(64, 64)
    return { icon: frame.toDataURL() } }
  )
  entityGrid.iconSize = setSize(64, 64)
  entityGrid.add(sprite1)
  entityGrid.add(sprite2)
  entityGrid.add(sprite3)
  entityGrid.add(sprite4)
  entityGrid.add(knightSprite)

  //sprite1.playBatch('move')
  sprite2.playBatch('attack')
  sprite3.playBatch('idle')

  
  
  sprite2.rect.center = viewer.surface.rect.center
  sprite1.rect.center = viewer.surface.rect.center.shiftX(200)
  sprite3.rect.center = viewer.surface.rect.center.shiftX(-200)

  sprite4.rect.center = viewer.surface.rect.center.shiftX(-300)

  knightSprite.rect.center = viewer.surface.rect.center.shiftX(400)

  

  //sprite1.spriteSheet.flip = 'y'
  sprite2.spriteSheet.flip = 'y'
  sprite3.spriteSheet.flip = 'y'
  
  
  viewer.onFrameChanged = surface => {
    surface.clear()
    sprite2.draw(surface)
    sprite3.draw(surface)
    sprite4.draw(surface)
    knightSprite.draw(surface)
    sprite1.update()
    
    vfx1.draw(surface)
    vfx2.draw(surface, new Rect(0, 0, 256, 256))

    surface.blit(sprite1.image, sprite1.rect)
    displayFps(fps)
  }

 

  const ui = builders.ui()
  ui.upload('Load Sprite Sheet', file => {})

  ui.select('Knight Position', ['Up', 'Down', 'Left', 'Right'], val => { knightSprite.playBatch(val.toLowerCase()) }, 'Left')
  
  return {
    ui: ui.build(),
    entities: entities.build(),
    dispose () { 
      viewer.remove() 
    }
  }
}
