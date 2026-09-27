export type ModalTypes = 'info' | 'confirm' | 'delete' | 'prompt' | 'multichoose'

type CommonModal = {
  title: string
  message: string
}

export type InfoModal = CommonModal & {
  type: 'info'
}

export type ConfirmModal = CommonModal & {
  type: 'confirm'
}

export type DeleteModal = CommonModal & {
  type: 'delete'
}

export type PromptModal = CommonModal & {
  type: 'prompt'
  defaultValue: string
}

export type MultichooseModal = CommonModal & {
  type: 'multichoose'
  defaultValue: string
  options: string[]
}

export type AnyModal = InfoModal | ConfirmModal | DeleteModal | PromptModal | MultichooseModal