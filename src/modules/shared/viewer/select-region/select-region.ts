import { Renderer } from "../renderer"
import ver from "./shaders/ver"
import frag from "./shaders/frag"
import { GlVertexArrayObject, Rect, TSize, vec2 } from "smallgame"

export class SelectRegion extends Renderer {
  private vao: GlVertexArrayObject
  
  constructor (private viewportSize: TSize) {
    super(viewportSize, ver, frag)
    this.ctx.blendFunc('SRC_ALPHA', 'ONE_MINUS_SRC_ALPHA')
    this.vao = this.ctx.vao(
          'dynamic', 
          'float', 
          { aPosition: vec2 }, 
          Rect.size(0, 0).gl(viewportSize)
        )
  }

  render (): void {
    this.useDefaultProgram(() => {
      this.vao.use(() => {
        this.ctx.clear(0x0)
        this.ctx.drawArrays('triangle-strip', this.vao.vertexCount)
      })
    })
  }

  selectRect (rect: Rect) {
    this.vao.update(rect.gl(this.viewportSize))
    this.render()
  }

  remove (): void {
    this.vao.remove()
    super.remove()
  }
}