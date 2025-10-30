import { Game, PolyRect, Rect, Screen, Sketch } from "smallgame"
import { displayFps } from "../../../../utils/display-fps"
import { createSelect, type ScriptSettings, type ScriptModule } from "../../../../components/example"

export default async ({ container, width, height, fps }: ScriptSettings): Promise<ScriptModule> => {
  const { screen, game } = Game.create(width, height, container)

  polyRect(screen)

  displayFps(fps)

  const shapeParam = createSelect('Shape', ['Base Figures', 'Polyrect'], value => {}, 'Base Figures')

  return {
    parameters: [shapeParam],
    dispose () {
      game.kill()
    }
  }
}


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