export type TOption = { id: string, name: string }

export type SelectParameter = {
  type: 'select'
  caption: string
  items: string[] | TOption[]
  defaultValue: string
  callback: (index: string) => void
}

export type ButtonParameter = {
  type: 'button'
  caption: string
  callback: (sender: ButtonParameter) => void
}

export type ColorParameter = {
  type: 'color'
  caption: string
  defaultColor: string
  callback: (color: string) => void
}

export type TrackerParameter = {
  type: 'tracker'
  caption: string
  min: number
  max: number
  step: number
  defaultValue: number
  callback: (val: number) => void
}


export function createSelect (caption: string, items: string[] | TOption[], callback: (index: string) => void, defaultValue?: string): SelectParameter {
  return { type: 'select',  caption, items, callback, defaultValue: defaultValue ?? '' }
}

export function createButton (caption: string, callback: (sender: ButtonParameter) => void): ButtonParameter {
  return { type: 'button', caption, callback }
}

export function createColor (caption: string, callback: (color: string) => void, defaultColor?: string): ColorParameter {
  return { type: 'color', caption, defaultColor: defaultColor ?? '', callback }
}

export function createTracker (caption: string, min: number, max: number, step: number, callback: (val: number) => void, defaultValue?: number): TrackerParameter {
  return { type: 'tracker', caption, min, max, step, defaultValue: defaultValue ?? 0, callback }
}


export type AnyParameter = SelectParameter | ButtonParameter | ColorParameter | TrackerParameter