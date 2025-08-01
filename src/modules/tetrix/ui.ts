import { Text, type Surface } from "smallgame"
import type { Shape } from "./shape"

export class UI {
  drawScoreBoard (screen: Surface, shapes: Shape[], cellWidth: number, cellHeight: number) {
    for (let i = 0; i < 3; i++) {
      const rect = shapes[i].rect!
      rect.x = cellWidth * 10 + 24
      const h = cellHeight * 4.5
      rect.y = h * i + 100
      
      screen.blit(shapes[i].image!, rect.clone().shiftSelf(190, 25))
    }
  }

  drawGameOver (screen: Surface) {
    screen.clear()
    screen.fill('#181818')
    const text = new Text("GAME OVER", { x: 65, y: 200 }, { color: '#fdfdfd', fontSize: '80px' })
    text.draw(screen)

    const msg = new Text("PRESS <SPACE> TO RESTART!", { x: 150, y: 390 }, { color: '#fdfdfd', fontSize: '22px' })
    msg.draw(screen)
  }

  drawScore (screen: Surface, scrore: number) {
    const msg = new Text("Score: " + scrore, { x: 440, y: 50 }, { color: '#fdfdfd', fontSize: '26px' })
    msg.draw(screen)
  }
}