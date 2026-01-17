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

  watch(() => store.state.selectedObjects, () => {
    const obj = store.state.selectedObjects[0]
    currentObject.value = obj && obj.type === 'sprite-sheet-object' ? obj : null
  }, { deep: true })

  function setImageFile (f: File) {
    imageFile.value = f
  }

  function addClip () {
    const selected = store.state.selectedObjects[0]
    if (!selected) return
    const obj = editor.getObject<SpriteSheetObject>(selected.id)
    obj?.addBatch()
    editor.markForUpdate(obj)
  }

  function setCellDim (cols: number, rows: number) {
    const selected = store.state.selectedObjects[0]
    const obj = editor.getObject<SpriteSheetObject>(selected.id)
    obj?.setGrid(cols, rows)
    editor.markForUpdate(obj)
  }
  
  function setClipRate (clipId: string, rate: number) {
    const selected = store.state.selectedObjects[0]
    const obj = editor.getObject<SpriteSheetObject>(selected.id)
    const clip = obj.batches.find(p => p.name === clipId)
    if (clip) clip.rate = rate
    editor.markForUpdate(obj)
  }

  function convertToTilemap () {
    editor.convertCurrentObjectToTilemap()
  }

  return {
    currentObject,
    imageFile,
    setImageFile,
    addClip,
    setCellDim,
    setClipRate,
    convertToTilemap
  }
})

export { useSpriteSheetStore }