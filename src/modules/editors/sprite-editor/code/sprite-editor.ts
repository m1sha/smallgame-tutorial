import { GameEvent, GMath, loadBlob, Size, Surface, TSize } from "smallgame"
import { Viewer } from "../../../shared"
import { ImageCombineObject } from "./images-combine"
import { DrawableObject, drawSelectedObjects } from "./core"
import { SpriteSheetObject } from "./sprite-sheet"
import { TilemapObject } from "./tilemap"
import { ImageObject } from "./image"
import { removeItem } from "smallgame/src/utils"

export class SpriteEditor {
  private _viewer: Viewer | null = null
  private get viewer () { if (!this._viewer) throw Error('Viewer is not created'); return this._viewer }
  private objects: DrawableObject[] = []
  private selectedObjects: DrawableObject[] = []
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
    this.selectedObjects.forEach(obj => this.onCurrentObjectChanged?.(obj))
  }

  async createImageObjects (files: File[]) {
    const result: ImageObject[] = []
    for (const file of files)  {
      const img = await loadBlob(file)
      const obj = new ImageObject(file.name, img)
      result.push(obj)
    }
    this.afterObjectCreated(result)
    return result
  }

  async createImageCombiner (files: File[]) {
    const imgs: { name: string, surface: Surface }[] = [] 
    for (const file of files) imgs.push({ name: file.name, surface: await loadBlob(file) })
    const obj = new ImageCombineObject(imgs, this.viewportSize)
    
    this.afterObjectCreated([obj])
    return obj
  }

  async createSpriteSheet (file: File) {
    const img = await loadBlob(file)
    const obj = new SpriteSheetObject(img, this.viewportSize, file.name)
    obj.setGrid(1, 1)
    
    this.afterObjectCreated([obj])
    return obj
  }

  convertCurrentObjectToTilemap () {
    const curr = this.selectedObjects[0]
    if (!curr || !(curr  instanceof SpriteSheetObject)) return

    const { surface, tileSize, rect, cols, rows } = curr
    const obj = new TilemapObject(surface, tileSize, rect, cols, rows)
    this.afterObjectCreated([obj])
    return obj
  }

  getObject<T> (id: string) {
    return this.objects.find(p => p.id === id) as T
  }

  markForUpdate (obj: DrawableObject) {
    this.onCurrentObjectChanged?.(obj)
  }
 
  addToSelectObjects (id: string) {
    const obj = this.objects.find(p => p.id === id)
    if (!obj) return null
    this.selectedObjects.push(obj)
    return obj
  }

  removeFromSelectObjects(id: string) {
    removeItem(this.selectedObjects, p => p.id === id)
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
    const objs = this.selectedObjects
    for (const obj of objs) {

      if (ev.type === 'MOUSEDOWN'){
        if (ev.lbc && obj instanceof SpriteSheetObject) {
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

  private afterObjectCreated (objs: DrawableObject[]) {
    //this.currentObject = obj
    this.objects.push(...objs)
    this.selectedObjects = objs
    objs.forEach(obj => this.onCurrentObjectChanged?.(obj))
  }
}