import { defineStore } from "pinia"
import { useSpriteEditorStore } from "./editor-store"
import { ref, watch } from "vue"
import { DisplaySpriteSheetObject } from "../code/sprite-sheet/sprite-sheet-display-object"
import editor from "../code"
import { SpriteSheetObject } from "../code/sprite-sheet"

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
  
  function setClipRate (clipId: string, rate: number) {
    if (!store.state.currentObject) return
    const obj = editor.getObject<SpriteSheetObject>(store.state.currentObject.id)
    const clip = obj.batches.find(p=>p.name === clipId)
    if (clip) clip.rate = rate
    editor.markForUpdate(obj)
  }

  return {
    currentObject,
    imageFile,
    setImageFile,
    addClip,
    setCellDim,
    setClipRate
  }
})

export { useSpriteSheetStore }