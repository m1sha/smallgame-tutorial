import { defineStore } from "pinia"
import { useSpriteEditorStore } from "./editor-store"
import { ref, watch } from "vue"
import { DisplaySpriteSheetObject } from "../code/display-object/sprite-sheet-object"
import editor from "../code"
import { SpriteSheetObject } from "../code/drawable-object"

const useSpriteSheetStore = defineStore('SpriteSheetStore', () => {
  const store = useSpriteEditorStore()
  const currentObject = ref<DisplaySpriteSheetObject>(null)
  const imageFile = ref<File | null>(null)

  watch(() => store.state.currentObject, () => {
    const obj = store.state.currentObject
    currentObject.value = obj && obj.type === 'sprite-sheet-object' ? obj : null
  }, { deep: true })

  function setImageFile (f: File) {
    imageFile.value = f
  }

  function addClip () {
    if (!store.state.currentObject) return
    const obj = editor.getObject<SpriteSheetObject>(store.state.currentObject.id)
    obj?.addBatch()
    editor.markForUpdate(obj)
  }

  function setCellDim (cols: number, rows: number) {
    if (!store.state.currentObject) return
    const obj = editor.getObject<SpriteSheetObject>(store.state.currentObject.id)
    obj?.setGrid(cols, rows)
    editor.markForUpdate(obj)
  }

  return {
    currentObject,
    imageFile,
    setImageFile,
    addClip,
    setCellDim
  }
})

export { useSpriteSheetStore }