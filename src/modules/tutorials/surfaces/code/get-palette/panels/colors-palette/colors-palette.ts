import { Color, Point, Surface } from "smallgame"
import { Panel } from "../../../../../../../components/example/code/panels"
import EntryComponent  from "./components/colors-palette.vue"
import { createReactiveData } from "../../../../../../../components/example/index.ts"
import { eraseColors, replaceColors, indexingColors } from "./functions/index.ts"
import { IColorsPaletteData } from "./colors-palette-data.ts"

export class ColorsPalette {
  readonly panel: Panel<IColorsPaletteData>
  private colors: Color[] = []

  onEraseColors: ((suface: (surface: Surface) => Surface) => void) | null = null
  onReplaceColors: ((suface: (surface: Surface) => Surface) => void) | null = null
  onIndexingColors: ((suface: (surface: Surface) => Surface) => void) | null = null
  
  constructor () {
    this.panel = this.createPanel()
  }

  get toolName () {
    return this.panel.data.tool.name
  }

  private panelCallback  (actionName: string)  {
    const  oklabs = this.colors.map(p => p.toOklab())

    if (actionName === 'indexing-colors') {
      this.onIndexingColors?.(surface  => { 
        const out = indexingColors(surface, this.colors, this.panel.data.indexing.count) 
        this.panel.data.colors = []
        this.panel.data.replaceColors = []
        this.colors.forEach(color => {
          this.panel.data.colors.push(color.toString())
          this.panel.data.replaceColors.push(color.toString())
        })
        return out
      })
    }

    if (actionName === 'replace-colors') {
      this.onReplaceColors?.(surface => replaceColors(surface, this.panel.data.replaceColors, oklabs, 0.001))
    }

    if (actionName === 'erase-colors') {
      this.onEraseColors?.(surface => eraseColors(surface, oklabs, 0.001))
    }

    if (actionName == 'eyepicker') {
      const tool = this.panel.data.tool
      tool.name = tool.name === 'select' ? 'eyepicker' : 'select'
    }
  }

  private createPanel () {
    const result = new Panel<IColorsPaletteData>('Colors Palette', EntryComponent, new Point(400, 50))
    result.action = actionName => this.panelCallback(actionName)
    result.data = createReactiveData({ 
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

  pickColor (color: Color) {
    if (this.toolName !== 'eyepicker') return
    this.colors.push(color)
    this.panel.data.colors.push(color.toString())
    this.panel.data.replaceColors.push(color.toString())
  }


}