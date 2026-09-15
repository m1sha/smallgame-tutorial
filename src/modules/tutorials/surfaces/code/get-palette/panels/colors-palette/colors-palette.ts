import { Color, Point, Surface } from "smallgame"
import { Panel } from "../../../../../../../components/example/code/panels"
import EntryComponent  from "./components/colors-palette.vue"
import { createReactiveData } from "../../../../../../../components/example/index.ts"
import { eraseColors, replaceColors, indexingColors } from "./functions/index.ts"
import { IColorsPaletteData } from "./colors-palette-data.ts"

export interface IColorsPalette {
  colors: Color[]
  pickColor (color: Color, force?: boolean): void
}

export class ColorsPalette {
  readonly panel: Panel<IColorsPaletteData>
  readonly colors: Color[] = []

  onEraseColors: ((suface: (surface: Surface) => Surface) => void) | null = null
  onReplaceColors: ((suface: (surface: Surface) => Surface) => void) | null = null
  onIndexingColors: ((suface: (surface: Surface) => Surface) => void) | null = null
  
  constructor () {
    this.panel = this.createPanel()
  }

  get toolName () {
    return this.data.tool.name
  }

  private get data () {
    return (this.panel as any).data as IColorsPaletteData
  }

  private panelCallback  (actionName: string, args?: any)  {
    if (actionName === 'changed-color' && typeof args === 'number') {
      const c = this.data.colors[args]
      this.colors[args] = Color.from(c)
    }

   // const  oklabs = this.colors.map(p => p.toOklab())

    // if (actionName === 'indexing-colors') {
    //   this.onIndexingColors?.(surface  => { 
    //     const out = indexingColors(surface, this.colors, this.data.indexing.count) 
    //     this.data.colors = []
    //     this.data.replaceColors = []
    //     this.colors.forEach(color => {
    //       this.data.colors.push(color.toString())
    //       this.data.replaceColors.push(color.toString())
    //     })
    //     return out
    //   })
    // }

    // if (actionName === 'replace-colors') {
    //   this.onReplaceColors?.(surface => replaceColors(surface, this.data.replaceColors, oklabs, 0.001))
    // }

    // if (actionName === 'erase-colors') {
    //   this.onEraseColors?.(surface => eraseColors(surface, oklabs, 0.001))
    // }

    if (actionName == 'eyepicker') {
      const tool = this.data.tool
      tool.name = tool.name === 'select' ? 'eyepicker' : 'select'
    }
  }

  private createPanel () {
    const result = new Panel<IColorsPaletteData>('Colors Palette', EntryComponent, new Point(400, 50))
    const r = result as any
    r.action = (actionName, args) => this.panelCallback(actionName, args)
    r.data = createReactiveData({ 
      colors: [],
      replaceColors: [],
      tool: {
        name: 'select'
      },
      erase: {
        threshold: 0.01
      },
      replace: {
        threshold: 0.001
      },
      indexing: {
        usePalette: false,
        count: 16
      }
    })
    return result 
  }

  pickColor (color: Color, force = false) {
    if (!force && this.toolName !== 'eyepicker') return
    this.colors.push(color)
    this.data.colors.push(color.toString())
  }


}