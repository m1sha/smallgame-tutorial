import { defineStore } from "pinia"
import { computed } from "vue"
import { useSpriteEditorStore } from "./editor-store"

const useImagesStore = defineStore('ImagesCombinerStore', () => {
  const selectedObjects = computed(() => useSpriteEditorStore().state.selectedObjects.filter(p => p.type === 'image-object'))

  return {
    selectedObjects
  }
})

export { useImagesStore }