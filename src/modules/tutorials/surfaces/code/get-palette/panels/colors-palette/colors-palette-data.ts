export interface IColorsPaletteData {
  colors: string[],
  replaceColors: string[],
  tool: {
    name: 'select' | 'eyepicker'
  },
  erase: {
    threshold: number
  },
  replace: {
    threshold: number
  },
  indexing: {
    usePalette: boolean,
    count: number
  }
}