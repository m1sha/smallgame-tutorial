import { Game, gameloop, Key } from "smallgame";
import { Bird } from "./bird";

export function main(root: HTMLDivElement) {
  const { game, screen } = Game.create(800, 600, root)

  const bird = new Bird()

  gameloop(() => {

    const keys = game.key.getPressed()
    keys[Key.SPACE] ? bird.down() : bird.up()
    

    screen.fill('#444')
    bird.draw(screen)
  })

  
}