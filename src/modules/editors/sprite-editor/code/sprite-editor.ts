import { GameEvent, GMath, loadBlob, Rect, Size, Surface, TSize } from "smallgame"
import { Viewer } from "../../../shared"
import { DrawableObject, drawSelectedObjects, ImageCombineObject, SpriteSheetObject } from "./drawable-object"

export class SpriteEditor {
  private _viewer: Viewer | null = null
  private get viewer () { if (!this._viewer) throw Error('Viewer is not created'); return this._viewer }
  private objects: DrawableObject[] = []
  private selectedObjects: DrawableObject[] = []
  private currentObject: DrawableObject | null = null
  private viewportSize: Size = Size.zero

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
    if (this.currentObject) this.onCurrentObjectChanged?.(this.currentObject)
  }

  async createImageCombiner (files: File[]) {
    const imgs: { name: string, surface: Surface }[] = [] 
    for (const file of files) imgs.push({ name: file.name, surface: await loadBlob(file) })
    const obj = new ImageCombineObject(imgs, this.viewportSize)
    
    this.afterObjectCreated(obj)
    return obj
  }

  async createSpriteSheet (file: File) {
    const img = await loadBlob(file)
    const obj = new SpriteSheetObject(img, this.viewportSize, file.name)
    obj.setGrid(1, 1)
    
    this.afterObjectCreated(obj)
    return obj
  }

  getObject<T> (id: string) {
    return this.objects.find(p => p.id === id) as T
  }

  markForUpdate (obj: DrawableObject) {
    this.onCurrentObjectChanged?.(obj)
  }
 
  setCurrentObject(id: string) {
    this.currentObject = this.objects.find(p => p.id === id)
    if (!this.currentObject) return null
    this.selectedObjects = [this.currentObject]
    return this.currentObject
  }

  destroyViewer () {
    this.viewer.remove()
  }

  private frameChanged (surface: Surface) {
    surface.clear()
    this.objects.forEach(obj => obj.draw(surface))
    drawSelectedObjects(this.selectedObjects, surface)
  }

  private zoom = 1
  private handleInput(ev: GameEvent): void {
    if (!(this.currentObject instanceof SpriteSheetObject)) return
    const obj = this.currentObject as SpriteSheetObject
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

  private afterObjectCreated (obj: DrawableObject) {
    this.currentObject = obj
    this.objects.push(obj)
    this.selectedObjects = [obj]
    this.onCurrentObjectChanged?.(obj)
  }
}