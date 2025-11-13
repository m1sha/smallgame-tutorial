import { loadImage, Point, Game, gameloop, Time, GMath, Key } from "smallgame"
import { displayFps } from "../../../../../utils/display-fps"
import { type ScriptModule, type ScriptSettings } from "../../../../../components/example"
import { Bird } from "./bird"
import { Pillar } from "./pillar"
import { Pillars } from "./pillars"

export default async ({ container, width, height, fps }: ScriptSettings): Promise<ScriptModule> => {
  
  const { game, screen } = Game.create(width, height, container)
  
  const bird = new Bird({width, height})
  const pillars = new Pillars({width, height})

  bird.rect.moveSelf(300, height / 2)

  gameloop(() => {
    

    screen.fill('#506174ff')
    screen.blit(bird.image, bird.rect)
    //screen.blit(pillar.image, pillar.rect)
    
    if (game.key.getPressed()[Key.SPACE]){
      bird.raise()
    } else {
      bird.update()
    }

    pillars.draw(screen as any)
    pillars.outsideRect(screen.rect, s => pillars.remove(s) )

    displayFps(fps)
  })

  return {
    parameters: [],
    dispose () { 
      game.kill() 
    }
  }
}
