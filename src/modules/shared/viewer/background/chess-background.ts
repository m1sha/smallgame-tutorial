import { Rect, TSize, vec2, GlVertexArrayObject, u_vec2 } from "smallgame"
import { Renderer } from "../renderer"
import ver from "./shaders/ver"
import frag from "./shaders/frag"

export class ChessBackground extends Renderer {
  private vao: GlVertexArrayObject
  uCellSize: u_vec2
  constructor (viewportSize: TSize) {
    super(viewportSize, ver, frag)
    
    this.uCellSize = this.ctx.uniform('u_cellSize', 'vec2')
    this.uCellSize.value = [16, 16]
    this.vao = this.ctx.vao(
      'static', 
      'float', 
      { aPosition: vec2 }, 
      Rect.size(viewportSize).gl(viewportSize)
    )
  }

  get cellSize (): TSize {
    const [ width, height ] = this.uCellSize.value
    return { width, height }
  }

  set cellSize (value: TSize) {
    this.uCellSize.value = [value.width, value.height]
    this.render()
  }

  render(): void {
    this.useDefaultProgram(() => {
      this.vao.use(() => {
        this.ctx.clear(0x0)
        this.ctx.drawArrays('triangle-strip', this.vao.vertexCount)
      })
    })
  }

  remove(): void {
    this.vao.remove()
    super.remove()
  }
}