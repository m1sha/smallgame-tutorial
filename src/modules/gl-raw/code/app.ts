//import { imgCombine } from './img-combine'
import texArray from './tex-array'


export class App {
  async run (root: HTMLDivElement) {
    const gl = await texArray()
    root.append(gl.canvas as HTMLCanvasElement)
  }
}