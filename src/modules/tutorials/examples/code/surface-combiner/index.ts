import { Game, gameloop, Group, loadBlob, MouseButton, Size} from "smallgame"
import { displayFps } from "../../../../../utils/display-fps"
import { type ScriptModule, type ScriptSettings } from "../../../../../components/example"
import { ImageSprite } from "./objects/image-sprite"
import { CanvasSprite } from "./objects/canvas-sprite"
import { createUI } from "./ui"
import { SelectedImage } from "./objects/selected-image"

export default async ({ container, width, height, fps }: ScriptSettings): Promise<ScriptModule> => {
  const { game, screen } = Game.create(width, height, container)
  
  const canvasSize = new Size(1024)
  const canvas = new CanvasSprite(canvasSize)
  const imageGroup = new Group<ImageSprite>()
  const slectedGroup = new Group<SelectedImage>()

  canvas.rect.center = screen.rect.center

  gameloop(() => {
    screen.fill('#b3b3b3ff')
    canvas.draw(screen)
    imageGroup.draw(screen)
    slectedGroup.draw(screen)

    for (const ev of game.event.get()) {
      if (ev.type === 'MOUSEDOWN') {
        imageGroup.collidePoint(ev.pos, s => {
          s.selected = true
          const img = new SelectedImage(s.rect)
          img.rect.moveSelf(s.rect)
          slectedGroup.add(img)
        })
      }

      if (ev.type === 'MOUSEMOVE') {
        if (ev.button === MouseButton.LEFT)
          imageGroup.sprites.forEach(p => {
            if (!p.selected) return
            p.rect.shiftSelf(ev.shift)
          })
      }
    }

    displayFps(fps)
  })

  const uploadImage = async (file: File) => {
    const img = await loadBlob(file)
    const sprite = new ImageSprite(img)
    sprite.rect.moveSelf(canvas.rect)
    imageGroup.add(sprite)
  }

 

  return {
    ui: createUI(canvasSize, uploadImage),
    dispose () { 
      game.kill() 
    }
  }
}
