import { Renderer } from "../renderer"
import ver from "./shaders/ver"
import frag from "./shaders/frag"
import { GlVertexArrayObject, Rect, TSize, vec2 } from "smallgame"

export type TBoundedBoxObject = { rect: Rect}

export class SelectedObjects extends Renderer {
  private vao: GlVertexArrayObject
  objects: TBoundedBoxObject[]
  
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
        this.ctx.drawArrays('triangles', this.vao.vertexCount)
      })
    })
  }

  addObjects (objects: TBoundedBoxObject[]) {
    this.objects = objects
    this.updateObjects()
    this.render()
  }

  updateObjects () {
    const geo = []
    this.objects.forEach(obj => {
      const rect = obj.rect.gl(this.viewportSize, 'triangles')
      geo.push(...rect)
    })
    this.vao.update(geo)
  }

  //selectRect (rect: Rect) {
  //  this.vao.update(rect.gl(this.viewportSize))
  //  this.render()
  //}

  remove (): void {
    this.vao.remove()
    super.remove()
  }
}