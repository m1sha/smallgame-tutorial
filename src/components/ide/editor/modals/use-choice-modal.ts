import { reactive } from 'vue'

export interface ChoiceModalOptions {
  title?: string
}

export interface ChoiceModalResult<T> {
  ok: boolean
  chosen?: T
}

interface ChoiceModalState<T = string> {
  isOpen: boolean
  items: T[]
  title: string
  resolve: ((result: ChoiceModalResult<T>) => void) | null
}

const state = reactive<ChoiceModalState<any>>({
  isOpen: false,
  items: [],
  title: '',
  resolve: null,
})

export function useChoiceModalState<T = string>() {
  return state as ChoiceModalState<T>
}

export function choseModal<T = string>(
  items: T[],
  options: ChoiceModalOptions = {}
): Promise<ChoiceModalResult<T>> {
  return new Promise((resolve) => {
    state.items = items
    state.title = options.title ?? ''
    state.isOpen = true
    state.resolve = resolve
  })
}

export function resolveChoiceModal<T>(result: ChoiceModalResult<T>) {
  state.resolve?.(result)
  state.resolve = null
  state.isOpen = false
}