export type TOption = { id: string, name: string }

export type SelectParameter = {
  type: 'select'
  caption: string
  items: string[] | TOption[]
  defaultValue: string
  callback: (index: string) => void
  group: string
}

export type ButtonParameter = {
  type: 'button'
  caption: string
  callback: (sender: ButtonParameter) => void
  group: string
}

export type ColorParameter = {
  type: 'color'
  caption: string
  defaultColor: string
  callback: (color: string) => void
  group: string
}

export type TrackerParameter = {
  type: 'tracker'
  caption: string
  min: number
  max: number
  step: number
  defaultValue: number
  callback: (val: number) => void
  group: string
}

export type UploadFileParameter = {
  type: 'upload-file'
  caption: string
  callback: (file: File, sender: UploadFileParameter) => void
  group: string
}


export function createSelect (caption: string, items: string[] | TOption[], callback: (index: string) => void, defaultValue?: string, group?: string): SelectParameter {
  return { type: 'select',  caption, items, callback, defaultValue: defaultValue ?? '', group: group ?? '' }
}

export function createButton (caption: string, callback: (sender: ButtonParameter) => void, group?: string): ButtonParameter {
  return { type: 'button', caption, callback, group: group ?? '' }
}

export function createColor (caption: string, callback: (color: string) => void, defaultColor?: string, group?: string): ColorParameter {
  return { type: 'color', caption, defaultColor: defaultColor ?? '', callback, group: group ?? '' }
}

export function createTracker (caption: string, min: number, max: number, step: number, callback: (val: number) => void, defaultValue?: number, group?: string): TrackerParameter {
  return { type: 'tracker', caption, min, max, step, defaultValue: defaultValue ?? 0, callback, group: group ?? '' }
}

export function createUploadFile (caption: string, callback: (file: File, sender: UploadFileParameter) => void, group?: string): UploadFileParameter {
  return { type: 'upload-file', caption, callback, group: group ?? '' }
}


export type AnyParameter = SelectParameter | ButtonParameter | ColorParameter | TrackerParameter | UploadFileParameter