import { Color, Game } from "smallgame";

export function main (root: HTMLDivElement) {
  const { screen } = Game.create(800, 800, root)

  const c = Color.red
  const c2 = Color.blue
  c.mix(c2, 0.5)
  c.pow(1.2)
  
  c.div(c2)
  
  const cs =  c.toString()
  console.log(cs)
  screen.fill(cs)
}