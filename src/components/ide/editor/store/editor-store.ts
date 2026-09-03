import { defineStore } from "pinia"
import { reactive } from "vue"
import { Editor } from "../../../../modules/ide"

const useEditorStore = defineStore('IDEEditorStore', () => {
  const editor = reactive(new Editor())

  return { editor }
})

export { useEditorStore }