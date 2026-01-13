import { defineStore } from "pinia";
import { DisplayImagesCombinerObject } from "../code/display-object/images-combiner-object";
import { useSpriteEditorStore } from "./editor-store";
import { ref, watch } from "vue";
import editor from "../code";

const useImagesCombinerStore = defineStore('ImagesCombinerStore', () => {
  const store = useSpriteEditorStore()
  const currentObject = ref<DisplayImagesCombinerObject>(null)

  watch(() => store.state.currentObject, () => {
      const obj = store.state.currentObject
      currentObject.value = obj && obj.type === 'image-combiner-object' ? obj : null
  }, { deep: true })

  const downloadCombinedImage = () => {
    editor.downloadCombinedImage()
  }

  return {
    currentObject,
    downloadCombinedImage
  }
})

export { useImagesCombinerStore }