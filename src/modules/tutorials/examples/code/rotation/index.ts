import { AnimatedSprite, deg, Game, gameloop, loadImage, M33, Point, rad, Rect, Size, Sketch, SpriteSheet } from "smallgame"
import { displayFps } from "../../../../../utils/display-fps"
import { type ScriptModule, type ScriptSettings } from "../../../../../components/example"
import { UIBuilder } from "../../../../../components/example/code/ui"
import { Viewer } from "../../../../shared"

export default async ({ container, width, height, fps }: ScriptSettings): Promise<ScriptModule> => {
  const ui = new UIBuilder()
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
    
  const sprite = new AnimatedSprite(spriteSheet, spriteSheet.size.scale(1.2))
  const sprite2 = new AnimatedSprite(spriteSheet2, spriteSheet2.size.scale(1.2))
  const sprite3 = new AnimatedSprite(spriteSheet3, spriteSheet3.size.scale(1.2))

  //sprite.playBatch('attack')
  //sprite2.playBatch('attack')
  //sprite3.playBatch('attack')
  
  const centerPointImg = new Sketch().circle({ fill: '#d8d8d8', stroke: '#204122ff', lineWidth: 2 }, Rect.size(16, 16).center, 6).toSurface()
  centerPointImg.rect.center = viewer.surface.rect.center.shiftXSelf(-200)
  sprite.rect.center = centerPointImg.rect.absCenter.shiftX(-40)
  sprite2.rect.center = sprite.rect.absCenter.shiftX(80)
  sprite3.rect.center = sprite2.rect.absCenter.shiftX(50)

  const a = ui.var(-0.2)
  const b = ui.var(-0.3)
  const c = ui.var(4.1)
 
  let center = centerPointImg.rect.absCenter //Rect.size(width, height).center
  sprite.rotationAngle = 180
  sprite2.rotationAngle = 90
  sprite3.rotationAngle = -90

  let ca = 0
  let caa = ui.var(4.85)
  let clearScreen = true
  let showSprite1 = true
  let showSprite2 = true
  let showSprite3 = true
  let showBall = true

  viewer.onFrameChanged = surface => {
    ca += caa.value
    console.log(Math.sin(rad(ca % 360)))
    centerPointImg.rect.x +=  Math.sin(rad(ca)) * 16

    center = centerPointImg.rect.absCenter
    if (clearScreen) surface.clear()
    if (showBall) surface.blit(centerPointImg, centerPointImg.rect)
    if (showSprite1) sprite.draw(surface)
    if (showSprite2) sprite2.draw(surface)
    if (showSprite3) sprite3.draw(surface)


    const m = M33.rotate(a.value, center)
    const point = m.applyToPoint(sprite.rect.absCenter)
    sprite.rect.absCenter = point
    sprite.rotationAngle += a.value

    const m2 = M33.rotate(b.value, sprite.rect.absCenter).mul(m)
    
    const point2 = m2.applyToPoint(sprite2.rect.absCenter)
    sprite2.rect.absCenter = point2
    sprite2.rotationAngle += b.value

    const m3 = M33.rotate(c.value, sprite2.rect.absCenter)

    const x =  M33.mul(M33.mul(m, m2), m3)
    
    const point3 = x.applyToPoint(sprite3.rect.absCenter)
    sprite3.rect.absCenter = point3
    sprite3.rotationAngle = c.value

    displayFps(fps)
  }

  
  ui.group('Visible', gr => gr.open()
    .switch('Clear Screen', val => clearScreen = val, clearScreen)
    .switch('Show Green Ship', val => showSprite1 = val, showSprite1)
    .switch('Show Red Ship', val => showSprite2 = val, showSprite2)
    .switch('Show Blue Ship', val => showSprite3 = val, showSprite3)
    .switch('Show Ball', val => showBall = val, showBall)
  )
  
  ui.group('Parameters', gr => gr.open()
    .tracker('A', -4, 4, 0.01, v => a.value = v, a)
    .tracker('B', -4, 4, 0.01, v => b.value = v, b)
    .tracker('C', -8, 8, 0.1, v => c.value = v, c)
    .tracker('caa', 2, 8, 0.01, v => caa.value = v, caa)
  )

  ui.button('Reset Parameters', () => {
    a.value = -0.2
    b.value = -0.3
    c.value = 4.1
    caa.value = 4.85
  })
  ui.button('Reset Sprites Position', () => {
    ca = 0
    centerPointImg.rect.center = viewer.surface.rect.center.shiftXSelf(-200)
    sprite.rect.center = centerPointImg.rect.absCenter.shiftX(-40)
    sprite2.rect.center = sprite.rect.absCenter.shiftX(80)
    sprite3.rect.center = sprite2.rect.absCenter.shiftX(50)
    sprite.rotationAngle = 180
    sprite2.rotationAngle = 90
    sprite3.rotationAngle = -90
  })

  return {
    ui: ui.build(),
    dispose () { 
      viewer.remove() 
    }
  }
}
