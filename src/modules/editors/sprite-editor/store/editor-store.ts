import { defineStore } from "pinia"
import { setRect, TSize } from "smallgame"
import { ISpriteEditorState, SpriteEditor } from "../code"
import { reactive, ref } from "vue"

const useSpriteEditorStore = defineStore('SpriteEditorStore', () => {
  const state = ref<ISpriteEditorState>({ currentObject: null })
  const editor = new SpriteEditor()
  const imageFile = ref<File | null>(null)

  editor.onCurrentObjectChanged = obj => { 
    state.value.currentObject = obj.toDisplay()
    if (!state.value.currentObject) return
  }
  
  const createViewer = (viewportSize: TSize, container: HTMLDivElement) => {
    editor.createViewer(viewportSize, container)
  }

  const createImageCombiner = async (files: File[]) => {
    await editor.loadImages(files)
  }

  const createSpriteSheet  = async (file: File) => {
    imageFile.value = file
    await editor.createSpriteSheet(file)
  }

  const setZoom = (index: number) => {
    editor.setZoom(index)
  }

  const setCellDim = (cols: number, rows: number) => {
    editor.setCellDim(cols, rows)
  }

  const addBatch = () => {
    editor.addBatch()
  }


  return {
    createViewer,
    createImageCombiner,
    createSpriteSheet,
    setZoom,
    setCellDim,
    addBatch,
    state,
    imageFile
  }
})

export { useSpriteEditorStore }