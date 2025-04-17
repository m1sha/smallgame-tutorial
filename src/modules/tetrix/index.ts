
import { TetrisGame } from "./tetris-game"

export function main(root: HTMLDivElement, fps: HTMLDivElement) {

  const tetris = new TetrisGame()
  tetris.init(380, 560, root, fps)
  tetris.startGame()
  
}
