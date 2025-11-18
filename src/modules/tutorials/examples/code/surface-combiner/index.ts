import { Game, gameloop, MouseButton, Rect, Size, Sketch} from "smallgame"
import { displayFps } from "../../../../../utils/display-fps"
import { type ScriptModule, type ScriptSettings } from "../../../../../components/example"
import { createUI } from "./ui"
import { EditorState } from "./editor-state"

export default async ({ container, width, height, fps }: ScriptSettings): Promise<ScriptModule> => {
  const { game, screen } = Game.create(width, height, container)

  const state = new EditorState(new Size(1024), screen)

  const img = new Sketch()
  .rect({ stroke: '#e6e6e6ff' }, new Rect(0, 0, width /2, height / 2 ))
  .rect({ stroke: '#e6e6e6ff' }, new Rect(width /2, 0, width /2, height / 2 ))
  .rect({ stroke: '#e6e6e6ff' }, new Rect(0, height / 2, width /2, height / 2 ))
  .rect({ stroke: '#e6e6e6ff' }, new Rect(width /2, height / 2, width /2, height / 2 ))
  //.hline({ stroke: '#e6e6e6ff' }, { x: 0, y: height / 2 }, width)
 .toSurface(screen.size.width, screen.size.height)

  gameloop(() => {
    screen.fill('#b3b3b3ff')
    state.canvas.draw(screen)
    state.imageGroup.draw(screen)
    state.slectedGroup.draw(screen)
    screen.blit(img, img.rect)
 

    for (const ev of game.event.get()) {
      if (ev.type === 'MOUSEDOWN') {
        const r = state.imageGroup.collidePoint(ev.pos, s => {
          if (ev.ctrlKey)
            state.addSelectImageSprite(s)
          else
            state.selectImageSprite(s)
        })
        if (!r) state.clearSelectedImageSprites()
      }

      if (ev.type === 'MOUSEMOVE') {
        if (ev.button === MouseButton.LEFT)
          state.imageGroup.sprites.forEach(p => {
            if (!state.isSelectedImageSprite(p)) return
            p.rect.shiftSelf(ev.shift)
          })
      }
    }

    displayFps(fps)
  })

  

 

  return {
    ui: createUI(state),
    dispose () { 
      game.kill() 
    }
  }
}
