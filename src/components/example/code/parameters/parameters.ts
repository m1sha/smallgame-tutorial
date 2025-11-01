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
  callback: () => void
}

export function createSelect (caption: string, items: string[] | TOption[], callback: (index: string) => void, defaultValue?: string): SelectParameter {
  return { type: 'select',  caption, items, callback, defaultValue: defaultValue ?? '' }
}

export function createButton (caption: string, callback: () => void): ButtonParameter {
  return { type: 'button', caption, callback }
}

export type AnyParameter = SelectParameter | ButtonParameter