import { defineStore } from "pinia"
import { DisplayImagesCombinerObject } from "../code/images-combine/images-combiner-display-object"
import { useSpriteEditorStore } from "./editor-store"
import { ref, watch } from "vue"
import editor from "../code"
import { ImageCombineObject } from "../code/images-combine"

const useImagesCombinerStore = defineStore('ImagesCombinerStore', () => {
  const store = useSpriteEditorStore()
  const currentObject = ref<DisplayImagesCombinerObject>(null)

  watch(() => store.state.currentObject, () => {
    const obj = store.state.currentObject
    currentObject.value = obj && obj.type === 'image-combiner-object' ? obj : null
  }, { deep: true })

  const downloadCombinedImage = () => {
    if (!store.state.currentObject) return
    const obj = editor.getObject<ImageCombineObject>(store.state.currentObject.id)
    obj?.download()
  }

  return {
    currentObject,
    downloadCombinedImage
  }
})

export { useImagesCombinerStore }