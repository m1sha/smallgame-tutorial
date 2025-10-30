import { ColorBox } from "../../color-box"
import { Filter } from "../filter"
import { App } from "../../app"
import { EraseColorFilterSetting } from "./settings"

export class EraseColorFilter implements Filter {
  readonly name: string = 'EraseColorFilter'

  constructor (private app: App) {}

  change ({ color, value }: EraseColorFilterSetting) {
    if (!this.app.sourceImage) return
    this.app.setWorkImage()
    const image = this.app.workImage
    if (!image) return
  
    const imageData = image.getPixels()
    const colorBox = new ColorBox()
    
    const newImageData = colorBox.eraseColor(imageData, value, color)
    image.setPixels(newImageData)
  }

  applyFilter () {
    this.app.applyFilter()
  }
}