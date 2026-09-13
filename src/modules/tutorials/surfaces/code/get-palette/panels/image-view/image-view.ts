import { Point, Rect, Surface } from "smallgame"
import { createReactiveData } from "../../../../../../../components/example"
import { Panel } from "../../../../../../../components/example/code/panels"
import { ImageViewControl } from "./components"
import { defineViewport, ImageViewData } from "./image-view-data"
import { toRaw } from "vue"
import { ImageViewAction } from "./image-view-actions"
import { download } from "../../../../../../../utils"

export class ImageView extends Panel<ImageViewData> {
  private _image: Surface | null = null
  private _container: HTMLElement | null = null
  private preview: Surface | null = null
  //private zoom = 1 
  //private offset = Point.zero

  private callback: ((event: string) => void) | null = null

  onClick: ((pos: Point) => void) | null = null
  onImageChanged: (() => void) | null = null
  onImageUploaded: (() => void) | null = null

  constructor () {
    super('Image View', ImageViewControl, new Point(800, 50))
    this.action = (actionName, args) => this.panelCallback(actionName as ImageViewAction, args)
    this.data = createReactiveData({
      viewport: defineViewport(),
      setContainer: (container, callback: (event: string) => void) => {
        this.callback = callback
        this._container = toRaw(container)
        const { width, height } = this._container.getBoundingClientRect()
        this.preview = new Surface(width, height)
        this.preview.imageRendering = 'pixelated'
        this._container.appendChild(this.preview.origin as HTMLCanvasElement)
        this.fitContain()
        this.blit()
      }
    })
  }

  get image () { return this._image }

  set image (image: Surface) {
    this._image = image
    this.fitContain()
    this.blit()
  }

  get zoom () { return this.data!.viewport.zoom }
  set zoom (value: number) { this.data!.viewport.zoom = value }

  get offsetX () { return this.data!.viewport.offsetX }
  set offsetX (value: number) { this.data!.viewport.offsetX = value }

  get offsetY () { return this.data!.viewport.offsetY }
  set offsetY (value: number) { this.data!.viewport.offsetY = value }
  

  private blit () {
    if (this.preview) {
      this.preview.clear()
      if (this._image) { 
        const rect = this._image.rect.move(this.offsetX, this.offsetY).scalesize(this.zoom)
        this.preview.blit(this._image, rect)
      }
    }
  }

  private panelCallback (actionName: ImageViewAction, args: any) {
    switch (actionName) {
      case "zoom-in": 
        if (this.zoom > 16) return
        this.zoom += 0.2 
        this.blit()
        break
      case "zoom-out": 
        if (this.zoom < 0.2) return
        this.zoom -= 0.2
        this.blit()
        break
      case "home": {
        this.zoom = 1
        this.offsetX = 0
        this.offsetY = 0
        this.blit()
        break
      }
      case "fit": { 
        this.fitContain()
        this.blit()
        break
      }
      case "start-move": {
        if (args && args.pos)
        this.onClick?.(Point.from(this.screenToWorld(args.pos.x, args.pos.y)))
        break
      }
      case "moving": {
        if (args && args.down) {
          this.offsetX += args.shift.x
          this.offsetY += args.shift.y
          this.blit()
        }
        break
      }
      case "zoom":
        console.log('zoom')
        if (!args) return
        const { delta, pos } = args
        const factor = delta < 0 ? 1.1 : 0.9
        const newZoom = Math.min(16, Math.max(0.02, this.zoom * factor))
        if (newZoom === this.zoom) return
        const { x: worldX, y: worldY} = this.screenToWorld(pos.x, pos.y)
        this.zoom = newZoom
        this.offsetX = pos.x - worldX * newZoom
        this.offsetY = pos.y - worldY * newZoom
        this.blit()
      break
      case "upload": {
        this.image = args.image
        this.title = `Image View - ${args.name}` 
        this.onImageUploaded?.()
        break
      }
      case "download": {
        this.callback?.('downloading')
        ;(this.image.origin as HTMLCanvasElement).toBlob(async (blob) => {
          await download('image.png', blob)
          this.callback?.('downloaded')
        })
        break
      }
    }
  }

  private screenToWorld (x: number, y: number): { x: number, y: number } {
    const worldX = (x - this.offsetX) / this.zoom
    const worldY = (y - this.offsetY) / this.zoom
    return { x: worldX, y: worldY }
  }

  private fitContain () {
    if (!this.preview || !this.image) return

    const imageRect = this.image.rect
    const preview = this.preview
    const zoom = Math.min(preview.width / imageRect.width, preview.height / imageRect.height)
    const imageCenterX = imageRect.x + imageRect.width / 2;
    const imageCenterY = imageRect.y + imageRect.height / 2;

    this.zoom = zoom
    this.offsetX = this.preview.width / 2 - imageCenterX * zoom
    this.offsetY = this.preview.height / 2 - imageCenterY * zoom
  }
}