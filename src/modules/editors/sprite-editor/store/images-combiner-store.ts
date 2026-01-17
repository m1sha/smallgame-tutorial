import { defineStore } from "pinia"
import { DisplayImagesCombinerObject } from "../code/images-combine/images-combiner-display-object"
import { useSpriteEditorStore } from "./editor-store"
import { ref, watch } from "vue"
import editor from "../code"
import { ImageCombineObject } from "../code/images-combine"

const useImagesCombinerStore = defineStore('ImagesCombinerStore', () => {
  const store = useSpriteEditorStore()
  const currentObject = ref<DisplayImagesCombinerObject>(null)

  watch(() => store.state.selectedObjects, () => {
    const obj = store.state.selectedObjects[0]
    currentObject.value = obj && obj.type === 'image-combiner-object' ? obj : null
  }, { deep: true })

  const downloadCombinedImage = () => {
    const selected = store.state.selectedObjects[0]
    if (!selected || selected.type !== 'image-combiner-object') return
    const obj = editor.getObject<ImageCombineObject>(selected.id)
    obj?.download()
  }

  return {
    currentObject,
    downloadCombinedImage
  }
})

export { useImagesCombinerStore }