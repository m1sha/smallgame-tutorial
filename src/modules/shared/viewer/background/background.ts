import { Rect, TSize, vec2, GlVertexArrayObject } from "smallgame"
import { Renderer } from "../renderer"
import ver from "./shaders/ver"
import frag from "./shaders/frag"

export class Background extends Renderer {
  private vao: GlVertexArrayObject
  constructor (viewportSize: TSize) {
    super(viewportSize, ver, frag)
    
    this.ctx.uniform('u_cellSize', 'vec2').value = [16, 16]
    this.vao = this.ctx.vao(
      'static', 
      'float', 
      { aPosition: vec2 }, 
      Rect.size(viewportSize).gl(viewportSize)
    )
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