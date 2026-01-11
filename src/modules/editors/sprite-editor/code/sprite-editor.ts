import { GameEvent, GMath, loadBlob, Rect, Size, Surface, TSize } from "smallgame"
import { Viewer } from "../../../shared"
import { DrawableObject, ImageCombineObject, SpriteSheetObject } from "./drawable-object"

export class SpriteEditor {
 
  private _viewer: Viewer | null = null
  private get viewer () { if (!this._viewer) throw Error('Viewer is not created'); return this._viewer }
  private objects: DrawableObject[] = []
  private viewportSize: Size = Size.zero

  constructor () {

  }

  onCurrentObjectChanged: ((obj: DrawableObject) => void) | null = null
  
  createViewer(viewportSize: TSize, container: HTMLDivElement) {
    this.viewportSize.reset(viewportSize)
    this._viewer = new Viewer(viewportSize, container, { disableContextMenu: true })
    this._viewer.surface.imageRendering = 'pixelated'

    this._viewer.onInput = ev => this.handleInput(ev)
    this._viewer.onFrameChanged = surface => this.frameChanged(surface)
  }

  setZoom (index: number) {
    this.objects.forEach(o => o.setZoom(index))
    if (this.objects[0]) this.onCurrentObjectChanged?.(this.objects[0])
  }

  async loadImages (files: File[]) {
    const imgs: Surface[] = [] 
    for (const file of files) imgs.push(await loadBlob(file))
    const obj = new ImageCombineObject(imgs, this.viewportSize)
    this.objects.push(obj)
    this.viewer.selectObjects([obj])
  }

  async createSpriteSheet (file: File) {
    const img = await loadBlob(file)
    const obj = new SpriteSheetObject(img, this.viewportSize)
    obj.setGrid(6, 12)
    this.onCurrentObjectChanged?.(obj)
    
    this.objects.push(obj)
    //this.viewer.selectObjects([obj])

   // this.state.currentObject = obj.toDisplay()
  }

  setCellDim(cols: number, rows: number) {
    const obj = this.objects.findLast(p => p as SpriteSheetObject) as SpriteSheetObject
    if (!obj) return
    obj.setGrid(cols, rows)
  }

  addBatch() {
    const obj = this.objects.findLast(p => p as SpriteSheetObject) as SpriteSheetObject
    if (!obj) return
    obj.addBatch()
    this.onCurrentObjectChanged?.(obj)
  }
  

  destroyViewer () {
    this.viewer.remove()
  }

  private frameChanged (surface: Surface) {
    surface.clear()
    this.objects.forEach(obj => obj.draw(surface))
  }

  private zoom = 1
  private handleInput(ev: GameEvent): void {
    const obj = this.objects.findLast(p => p as SpriteSheetObject) as SpriteSheetObject
    if (!obj) return

    if (ev.type === 'MOUSEDOWN'){
      if (ev.lbc) {
        obj.selectCell(ev.pos)
        this.onCurrentObjectChanged?.(obj)
        return
      }
    }

    if (ev.type === 'MOUSEMOVE') {
      if (ev.rbc) {
        obj.rect.shiftSelf(ev.shift)
        this.onCurrentObjectChanged?.(obj)
      }
    }

    if (ev.type === 'WHEEL') {
      //this.zoom -= Math.sign(ev.deltaY) * 0.1
      this.zoom -= Math.sign(ev.deltaY)
      if (this.zoom < 1) this.zoom = 1

      this.setZoom(GMath.logZoom(this.zoom, 10, 1, 2))
    }
  }
}