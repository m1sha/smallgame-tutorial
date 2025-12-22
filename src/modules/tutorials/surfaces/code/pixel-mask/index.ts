import { Game, gameloop, GMath, loadImage, Rect, Size, Sketch, Surface } from "smallgame"
import { displayFps } from "../../../../../utils/display-fps"
import { type ScriptModule, type ScriptSettings } from "../../../../../components/example"
import { UIBuilder } from "../../../../../components/example/code/ui"
import { Grid } from "smallgame/src/utils"

export default async ({ container, width, height, fps }: ScriptSettings): Promise<ScriptModule> => {
  const { game, screen } = Game.create(width, height, container)

  const imgs: Surface[] = []
  imgs.push(await loadImage('space-striker/ships/Alien_4.png'))
  imgs.push(await loadImage('space-striker/ships/Turret_Platform.png'))
  //imgs.push(await loadImage('space-striker/ships/Fighter_1.png'))
  imgs.push(await loadImage('space-striker/ships/Alien_1.png'))
  imgs.push(await loadImage('space-striker/ships/Frigate_1.png'))

  const rect = Rect.size(GMath.maxWidth(imgs) * 2 + 8, GMath.maxHeight(imgs) * imgs.length + 8)
  rect.absCenter = screen.rect.center
  const grid = Grid.fromDim(imgs.length, 2, rect)

  imgs.forEach(async (img, index) => {
    const mask = img.createMask()
    const maskImg = await mask.toSurface()

    img.rect.absCenter = grid.cell(index, 0).absCenter
    maskImg.rect.absCenter = grid.cell(index, 1).absCenter
    
    Sketch
      .new()
      .rect({ stroke: '#11881167' }, grid.cell(index, 0))
      .rect({ stroke: '#83838373' },  grid.cell(index, 1))
      .draw(screen.surface)
    
    screen.blit(img, img.rect)
    screen.blit(maskImg, maskImg.rect)
  })

  gameloop(() => {
    // screen.fill('#888')
    displayFps(fps)
  })

  const ui = new UIBuilder()
  return {
    ui: ui.build(),
    dispose () { 
      game.kill() 
    }
  }
}
