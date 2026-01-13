import { defineStore } from "pinia"
import { setRect, TSize } from "smallgame"
import { ISpriteEditorState, SpriteEditor } from "../code"
import { reactive, ref } from "vue"

const useSpriteEditorStore = defineStore('SpriteEditorStore', () => {
  const state = ref<ISpriteEditorState>({ currentObject: null, objects: [] })
  const editor = new SpriteEditor()
  const imageFile = ref<File | null>(null)

  const filesForCombine = ref<File[]>([])

  editor.onCurrentObjectChanged = obj => { 
    state.value.currentObject = obj.toDisplay()
    if (!state.value.currentObject) return
  }
  
  const createViewer = (viewportSize: TSize, container: HTMLDivElement) => {
    editor.createViewer(viewportSize, container)
  }

  const createImageCombiner = async (files: File[]) => {
    await editor.createImageCombiner(files)
    filesForCombine.value = files
  }

  const createSpriteSheet  = async (file: File) => {
    imageFile.value = file
    const obj = await editor.createSpriteSheet(file)
    state.value.objects.push(obj.toDisplay())
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

  const setCurrentObject = (id: string) => {
    const obj = editor.setCurrentObject(id)
    if (!obj) return
    state.value.currentObject = obj.toDisplay()
  }

  const downloadCombinedImage = () => {
    editor.downloadCombinedImage()
  }


  return {
    createViewer,
    createImageCombiner,
    createSpriteSheet,
    setZoom,
    setCellDim,
    addBatch,
    setCurrentObject,
    downloadCombinedImage,
    state,
    imageFile
  }
})

export { useSpriteEditorStore }