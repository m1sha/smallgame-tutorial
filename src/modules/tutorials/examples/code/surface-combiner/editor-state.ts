import { Group, loadBlob, Size, Screen, Point } from "smallgame"
import { ImageSprite } from "./objects/image-sprite"
import { CanvasSprite } from "./objects/canvas-sprite"
import { SelectedImage } from "./objects/selected-image"

export class EditorState {
  canvas: CanvasSprite 
  imageGroup = new Group<ImageSprite>()
  slectedGroup = new Group<SelectedImage>()
  selectedImageSprites: ImageSprite[] =[]

  offeset = Point.zero
  zoom = 1

  constructor (canvasSize: Size, public screen: Screen) {
    this.canvas = new CanvasSprite(canvasSize, screen.rect)
  }

  async uploadImage (file: File) {
    const img = await loadBlob(file)
    const sprite = new ImageSprite(img)
    sprite.rect.moveSelf(this.canvas.rect)
    this.imageGroup.add(sprite)
  }

  selectImageSprite(s: ImageSprite) {
    this.clearSelectedImageSprites()
    this.addSelectImageSprite(s)
  }

  addSelectImageSprite(s: ImageSprite) {
    this.selectedImageSprites.push(s)
    const img = new SelectedImage(s.rect)
    img.rect.moveSelf(s.rect)
    this.slectedGroup.add(img)
  }

  isSelectedImageSprite (s: ImageSprite) {
    return this.selectedImageSprites.some(p => p === s)
  }

  clearSelectedImageSprites () {
    while (this.selectedImageSprites.pop());
    this.slectedGroup.removeAll()
  }

  setCanvasHeight(val: number): void {
    this.canvas.setHeight(val)
  }
  setCanvasWidth(val: number): void {
    this.canvas.setWidth(val)
  }
}