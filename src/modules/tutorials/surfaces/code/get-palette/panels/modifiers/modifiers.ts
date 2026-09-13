import { Color, Point, Surface } from "smallgame"
import { createReactiveData, Panel } from "../../../../../../../components/example"
import { ModifiersData } from "./modifiers-data"
import { ModifiersControl } from "./components"
import { IColorsPalette } from "../colors-palette"
import { eraseColors, indexingColors, replaceColors } from "./functions"

export class Modifiers extends Panel<ModifiersData> {
  private palette: IColorsPalette | null = null
  private replacePalette: IColorsPalette | null = null

  constructor () {
    super('Modifiers', ModifiersControl, new Point(80, 50))
    this.action = (actionName, args) => this.onAction(actionName, args)
    this.data = this.createData()
  }

  onChangedModifier: ((name: string) => void) | null = null
  onIndexingColors: ((suface: (surface: Surface) => Surface) => void) | null = null
  onEraseColors: ((suface: (surface: Surface) => Surface) => void) | null = null
  onReplaceColors: ((suface: (surface: Surface) => Surface) => void) | null = null
  onSave: (() => {}) | null = null
  onGetback: (() => {}) | null = null

  addPalette (palette: IColorsPalette) {
    this.palette = palette
  }

  addReplacePalette (palette: IColorsPalette) {
    this.replacePalette = palette
  }

  private onAction (actionName: string, args?: any) {
    if (actionName === 'modifier-changed') {
      this.onChangedModifier?.(args)
    }

    if (actionName === 'indexing-colors') {
      this.onIndexingColors?.(surface => {
        const colors: Color[] = []
        const out = indexingColors(surface, colors, this.data.indexing.count, this.data.indexing.thrashold / 1000)
        colors.forEach(c => this.palette.pickColor(c))
       return out
      })
    }

    if (actionName === 'erase-colors') {
      const oklabs = this.getOklabs()
      this.onEraseColors?.(surface => eraseColors(surface, oklabs, this.data.erase.thrashold / 1000))
    }

    if (actionName === 'replace-colors') {
      const oklabs = this.getOklabs()
      if (!this.replacePalette) return
      const colors = this.replacePalette.colors.map(p => p.toString())
      this.onReplaceColors?.(surface => replaceColors(surface, colors, oklabs, this.data.replace.thrashold / 1000))
    }

    if (actionName === 'getback') this.onGetback?.()
    if (actionName === 'save') this.onSave?.()
  }

  private createData (): ModifiersData {
    return createReactiveData({
      indexing: {
        count: 16,
        thrashold: 1,
        usePaletteColors: false
      },
      erase: {
        thrashold: 1
      },
      replace: {
        thrashold: 1
      }
    })
  }

  private getOklabs () {
    if (!this.palette) return []
    return this.palette.colors.map(p => p.toOklab())
  }
}