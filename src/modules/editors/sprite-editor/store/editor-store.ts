import { defineStore } from "pinia"
import { TSize } from "smallgame"
import editor, { ISpriteEditorState, } from "../code"
import { ref } from "vue"
import { useSpriteSheetStore } from "./sprite-sheet-store"
import { useImagesCombinerStore } from "./images-combiner-store"

const useSpriteEditorStore = defineStore('SpriteEditorStore', () => {
  const state = ref<ISpriteEditorState>({ currentObject: null, objects: [] })

  editor.onCurrentObjectChanged = obj => { 
    state.value.currentObject = obj.toDisplay()
  }
  
  const createViewer = (viewportSize: TSize, container: HTMLDivElement) => {
    editor.createViewer(viewportSize, container)
  }

  const createImageCombiner = async (files: File[]) => {
    useImagesCombinerStore()
    const obj = await editor.createImageCombiner(files)
    state.value.objects.push(obj.toDisplay())
  }

  const createSpriteSheet  = async (file: File) => {
    useSpriteSheetStore().setImageFile(file)
    const obj = await editor.createSpriteSheet(file)
    state.value.objects.push(obj.toDisplay())
  }

  const setZoom = (index: number) => {
    editor.setZoom(index)
  }

  const setCurrentObject = (id: string) => {
    const obj = editor.setCurrentObject(id)
    if (!obj) return
    state.value.currentObject = obj.toDisplay()
  }

  return {
    createViewer,
    createImageCombiner,
    createSpriteSheet,
    setZoom,
    setCurrentObject,
    state
  }
})

export { useSpriteEditorStore }