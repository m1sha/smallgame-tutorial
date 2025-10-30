export type TOption = { id: string, name: string }

export type SelectParameter = {
  type: 'select'
  caption: string
  items: string[] | TOption[]
  defaultValue: string
  callback: (index: string) => void
}

export function createSelect(caption: string, items: string[] | TOption[], callback: (index: string) => void, defaultValue?: string): SelectParameter {
  return { type: 'select',  caption, items, callback, defaultValue: defaultValue ?? '' }
}

export type AnyParameter = SelectParameter