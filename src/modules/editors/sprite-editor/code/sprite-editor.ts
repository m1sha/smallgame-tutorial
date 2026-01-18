import { GameEvent, GMath, loadBlob, MemSurface, Point, Rect, Size, Surface, TSize } from "smallgame"
import { Viewer } from "../../../shared"
import { ImageCombineObject } from "./images-combine"
import { DrawableObject, drawSelectedObjects } from "./core"
import { SpriteSheetObject } from "./sprite-sheet"
import { TilemapObject } from "./tilemap"
import { ImageObject } from "./image"
import { removeItem } from "smallgame/src/utils"
import { Viewport } from "./viewport"

export class SpriteEditor {
  private _viewer: Viewer | null = null
  private get viewer () { if (!this._viewer) throw Error('Viewer is not created'); return this._viewer }
  private objects: DrawableObject[] = []
  private selectedObjects: DrawableObject[] = []
  private viewportSize: Size = Size.zero
  private viewport = new Viewport()

  onCurrentObjectChanged: ((obj: DrawableObject) => void) | null = null
  
  createViewer(viewportSize: TSize, container: HTMLDivElement) {
    this.viewportSize.reset(viewportSize)
    this._viewer = new Viewer(viewportSize, container, { disableContextMenu: true })
    this._viewer.surface.imageRendering = 'pixelated'

    this._viewer.onInput = ev => this.handleInput(ev)
    this._viewer.onFrameChanged = surface => this.frameChanged(surface)
  }

  async createImageObjects (files: File[]) {
    const result: ImageObject[] = []
    for (const file of files)  {
      const img = await loadBlob(file)
      const obj = new ImageObject(file.name, img, this.viewportSize, this.viewport)
      result.push(obj)
    }
    this.afterObjectCreated(result)
    return result
  }

  async createImageCombiner (files: File[]) {
    const imgs: { name: string, surface: Surface }[] = [] 
    for (const file of files) imgs.push({ name: file.name, surface: await loadBlob(file) })
    const obj = new ImageCombineObject(imgs, this.viewportSize, this.viewport)
    
    this.afterObjectCreated([obj])
    return obj
  }

  async createSpriteSheet (file: File) {
    const img = await loadBlob(file)
    const obj = new SpriteSheetObject(img, this.viewportSize, file.name, this.viewport)
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

  alignImagesByGrid (rows: number, cols: number) {
    if (this.selectedObjects.length < 1) return
    const { x, y, width, height } =  this.selectedObjects[0].rect
    const nW = cols * width
    const nH = rows * height
    const nx = x - nW / 2
    const ny = y - nH / 2

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const index = i * cols + j
        if (index > this.selectedObjects.length - 1) break
        const rect = this.selectedObjects[index].rect
        rect.x = nx + width * j
        rect.y = ny + height * i
      } 
    }
  }

  mergeSelected () {
    const rect = Rect.merge(this.selectedObjects.map(p=> p.rect))
    const surface = new MemSurface(rect.size)
    this.selectedObjects.forEach(sel => surface.blit(sel.surface, sel.rect.shift(rect.topLeft.neg())))
    const obj = new ImageObject('Merged', surface, this.viewportSize, this.viewport)
    this.selectedObjects = []
    this.objects = []
    this.afterObjectCreated([obj])
    return obj
  }

  async download() {
    const sel = this.selectedObjects[0]
    if (!sel) return
    
    const s = new Surface(sel.surface.width, sel.surface.height)
    s.blit(sel.surface, s.rect)
    const blob = await s.save('image/png')
    const a = document.createElement('a')
    const url = URL.createObjectURL(blob)
    a.href = url
    a.download = 'image.png'
    //a.target = '_blank'
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  destroyViewer () {
    this.viewer.remove()
  }

  private frameChanged (surface: Surface) {
    surface.clear()
    this.objects.forEach(obj => obj.draw(surface))
    drawSelectedObjects(this.selectedObjects, surface)
  }

  
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
        this.viewport.zoom -= Math.sign(ev.deltaY)
        if (this.viewport.zoom < 1) this.viewport.zoom = 1
        GMath.logZoom(this.viewport.zoom, 10, 1, 2)
        this.selectedObjects.forEach(obj => this.onCurrentObjectChanged?.(obj))
      }
    }
  }

  private afterObjectCreated (objs: DrawableObject[]) {
    this.objects.push(...objs)
    this.selectedObjects = objs
    objs.forEach(obj => this.onCurrentObjectChanged?.(obj))
  }

}