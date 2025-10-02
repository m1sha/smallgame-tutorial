import { Game, PolyRect, Rect, Screen, Sketch } from "smallgame"
import { createScript } from "../script"
import { displayFps } from "../../../../utils/display-fps"

createScript('Sketching', async ({ container, width, height, fps, selector }) => {
  selector
    .add('v1', 'Base Figures')
    .add('v2', 'Polyrect')
  
  const { screen } = Game.create(width, height, container)

  selector.callback = id => { }

  polyRect(screen)

  displayFps(fps)
  // gameloop(() => {
  //     screen.clear()
  //     parallax.draw(screen as any)
  //     displayFps(fps)
  //   })
})

function polyRect (screen: Screen) {
  const rect = new Rect(80, 80, 80, 80)
  const sketch0 = new Sketch()
  const rect0 = new PolyRect(rect.x, rect.y, rect.width, rect.height)
  sketch0.polyrect({ stroke: 'black' }, rect0)
  const surf0 = sketch0.toSurface(200, 200)

  const sketch = new Sketch()
  const rect1 = new PolyRect(rect.x, rect.y, rect.width, rect.height)
  
  rect1.rotateSelf(30, 'center-center')
  sketch.polyrect({ stroke: 'blue' }, rect1)
  const surf = sketch.toSurface(200, 200)

  screen.fill(0xEEEEEE00)
  screen.blit(surf0, surf0.rect.move(screen.rect.center, 'center-center'))
  screen.blit(surf, surf.rect.move(screen.rect.center, 'center-center'))
}