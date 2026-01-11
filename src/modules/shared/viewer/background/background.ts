import { Rect, TSize, vec2, GlVertexArrayObject, u_vec2, setPoint, TPoint, Surface, MemSurface } from "smallgame"
import { Renderer } from "../renderer"
import { ChessBackground } from "./chess-background"
import { GridBackground } from "./grid-background"

export class Background {
  private renderers: Renderer[] = []
  surface: Surface

  constructor (viewportSize: TSize) {
    this.renderers.push(new ChessBackground(viewportSize))
    this.renderers.push(new GridBackground(viewportSize))
    this.surface = new MemSurface(viewportSize)
  }

  render(): void { 
    this.renderers.forEach(r => r.render())
    this.surface.clear()
    this.renderers.forEach(r => this.surface.blit(r.surface, r.surface.rect))
  }

  remove (): void {
    this.renderers.forEach(r => r.remove())
    this.renderers = []
  }

  
  get cellSize (): TSize {
    const chess = this.renderers.find(p => p instanceof ChessBackground ) as ChessBackground
    if (!chess) return  { width: 0, height: 0 }
    const [ width, height ] = chess.uCellSize.value
    return { width, height }
  }

  set cellSize (value: TSize) {
    const chess = this.renderers.find(p => p instanceof ChessBackground ) as ChessBackground
    if (!chess) return
    chess.uCellSize.value = [value.width, value.height]
    this.render()
  }

  get offest () {
    return this.renderers.length ? this.renderers[0].offest : setPoint(0, 0)
  }

  set offest (point: TPoint) { 
    this.renderers.forEach(r => r.offest = point)
  }

  get mousePos () {
    return this.renderers.length ? this.renderers[0].mousePos : setPoint(0, 0)
  }

   set mousePos (point: TPoint) { 
    this.renderers.forEach(r => r.mousePos = point)
  }



  // private vao: GlVertexArrayObject
  // private uCellSize: u_vec2
  // constructor (viewportSize: TSize) {
  //   super(viewportSize, ver, frag)
    
  //   this.uCellSize = this.ctx.uniform('u_cellSize', 'vec2')
  //   this.uCellSize.value = [16, 16]
  //   this.vao = this.ctx.vao(
  //     'static', 
  //     'float', 
  //     { aPosition: vec2 }, 
  //     Rect.size(viewportSize).gl(viewportSize)
  //   )
  // }

  // get cellSize (): TSize {
  //   const [ width, height ] = this.uCellSize.value
  //   return { width, height }
  // }

  // set cellSize (value: TSize) {
  //   this.uCellSize.value = [value.width, value.height]
  //   this.render()
  // }

  // render(): void {
  //   this.useDefaultProgram(() => {
  //     this.vao.use(() => {
  //       this.ctx.clear(0x0)
  //       this.ctx.drawArrays('triangle-strip', this.vao.vertexCount)
  //     })
  //   })
  // }

  // remove(): void {
  //   this.vao.remove()
  //   super.remove()
  // }
}