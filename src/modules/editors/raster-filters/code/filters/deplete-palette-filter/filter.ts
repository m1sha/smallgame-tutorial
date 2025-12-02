import { RGBA } from "smallgame/src/utils/pixels"
import { ColorBox } from "../../color-box"
import { Filter } from "../filter"
import { App } from "../../app"
import { DepletePaletteFilterSetting } from "./settings"

export class DepletePaletteFilter implements Filter {
  readonly name: string = 'DepletePaletteFilter'
  pal: HTMLDivElement | null = null
  info: HTMLDivElement | null = null

  constructor (private app: App) {}

  change ({ value }: DepletePaletteFilterSetting) {
    if (!this.app.sourceImage) return
    this.app.setWorkImage()
    const image = this.app.workImage
    if (!image) return

    const imageData = image.pixels.imageData
    const colorBox = new ColorBox()
    const newImageData = colorBox.squeeze(imageData, value)
    
    image.pixels.imageData = (newImageData)

    if (!this.pal || !this.info) return

    if (value > 24) {
      this.pal.innerHTML = ''
      this.info.innerHTML = ''
      return
    }
    
    const colors = colorBox.uniqColors(newImageData)
    this.pal.innerHTML = colors.map(p => foo(p)).join('')
    this.info.innerHTML = `<span>Total colors: <b>${colors.length}</b></span>`
  
      function foo (c: RGBA) {
        return `<div style="width: 24px; height: 24px; background-color: rgb(${c[0]}, ${c[1]}, ${c[2]})"></div>`
      }
    
  }

  applyFilter () {
    this.app.applyFilter()
  }
}