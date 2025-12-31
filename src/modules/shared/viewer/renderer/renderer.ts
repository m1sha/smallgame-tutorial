import { GL, GlProgram, TPoint, TSize, u_float, u_vec2, u_vec4 } from "smallgame"


export class Renderer {
  protected ctx: GL
  private prog: GlProgram
  private uResolution: u_vec2
  private uMouse: u_vec4
  private uOffest: u_vec2
  private uTime: u_float

  constructor (viewportSize: TSize, vss: string, fss: string) {
    this.ctx = new GL(viewportSize, true)
    this.prog = this.ctx.createProgram(vss, fss, 'assemble-and-use')

    this.uResolution = this.ctx.uniform('uResolution', 'vec2')
    this.uResolution.value = [viewportSize.width * 1.0, viewportSize.height * 1.0]
    this.uMouse = this.ctx.uniform('uMouse', 'vec4')
    this.uMouse.value = [0, 0, 0, 0]
    this.uOffest = this.ctx.uniform('uOffest', 'vec2')
    this.uOffest.value = [0, 0]
    this.uTime = this.ctx.uniform('uTime', 'float')
    this.uTime.value = 0
  }

  get resolution () {
    const [width, height] = this.uResolution.value
    return { width, height}
  }

  set resolution (value: TSize) {
    this.uResolution.value = [value.width, value.height]
  }

  get mousePos () {
    const [x, y] = this.uMouse.value
    return { x, y }
  }

  set mousePos (point: TPoint) {
    const [_, __, z, w] = this.uMouse.value
    this.uMouse.value = [point.x, point.y, z, w]
  }

  set mouseButton (button: number) {
    this.uMouse.value[2] = button
  }

  get mouseButton () {
    return this.uMouse.value[2]
  }

  get offest () {
    const [x, y] = this.uOffest.value
    return { x, y }
  }

  set offest (point: TPoint) {
    this.uOffest.value = [point.x, point.y]
  }

  get surface () {
    return this.ctx.toSurface()
  }

  render () {

  }

  remove () {
    this.prog.remove()
  }

  protected useDefaultProgram (callback: () => void) {
    this.prog.use(() => callback())
  }
}