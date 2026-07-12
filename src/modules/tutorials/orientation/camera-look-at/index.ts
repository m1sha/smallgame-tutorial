import { AnimatedSprite, loadImage, MemSurface, Point, Rect, setSize, Size, Sketch, SpriteSheet, Time } from "smallgame"
import { type ScriptSettings, Viewer, displayFps } from "../../core"


export default async ({ container, containerSize, fps, builders, garbageCollect }: ScriptSettings): Promise<void> => {
  const viewer = new Viewer(containerSize, container, { disableContextMenu: true, garbageCollect })

  
  const bgImage = await loadImage('patterns/road-pattern.png', { useSmooth: false })
  const bgPattern = bgImage.toPattern('repeat-x')
  const viewportSize = new Size(bgImage.rect.size.scale(12, 1))
  const background = new MemSurface(viewportSize)
  background.fill('#881')
 
  const car = (await loadImage('patterns/car-spritesheet.png', { useSmooth: false }))
  const ss = new SpriteSheet(car, setSize(car.width / 4, car.height), 6)
  const carS = new AnimatedSprite(ss)
  carS.rect.y = bgImage.rect.absHeight - 17
  carS.rect.x = 30
  
  const m = Point.zero
  const surface = new MemSurface(viewportSize)
  viewer.surface.imageRendering = 'pixelated'
  let offset = 0
  viewer.onFrameChanged = frame => {
    background.fill(bgPattern)
    //background.rect.x -= 0.25
    surface.clear()
    surface.blit(background, background.rect)
    carS.draw(surface)
    
    
    
    //offset += -1.5
    carS.rect.x = -1*offset/5 + 30
    
    frame.fill('#27272717')
    const r = surface.rect.scalesize(6)
    r.absCenter = viewer.viewportRect.center
    r.x = offset
    
    frame.blit(surface, r)
    displayFps(fps)

    
  }
}
