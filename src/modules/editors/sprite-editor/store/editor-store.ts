import { defineStore } from "pinia"
import { TSize } from "smallgame"
import editor, { ISpriteEditorState, } from "../code"
import { ref } from "vue"
import { useSpriteSheetStore } from "./sprite-sheet-store"
import { useImagesCombinerStore } from "./images-combiner-store"
import { removeItem } from "smallgame/src/utils"

class StateController {

}

const useSpriteEditorStore = defineStore('SpriteEditorStore', () => {
  const state = ref<ISpriteEditorState>({ objects: [], selectedObjects: [] })

  editor.onCurrentObjectChanged = obj => { 
    removeItem(state.value.selectedObjects, p => p.id === obj.id)
    state.value.selectedObjects.push(obj.toDisplay())
  }
  
  const createViewer = (viewportSize: TSize, container: HTMLDivElement) => {
    editor.createViewer(viewportSize, container)
  }

  const importImages  = async (files: File[]) => {
    const objs = await editor.createImageObjects(files)
    for (const obj of objs) {
      state.value.objects.push(obj.toDisplay())
    }
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

  const selectObject = (ids: string[]) => {
    ids.forEach(id => {
      const exists = state.value.selectedObjects.some(p => p.id === id)
      if (exists) {
        removeItem(state.value.selectedObjects, p => p.id === id)
        editor.removeFromSelectObjects(id)
      } else {
        const obj = editor.addToSelectObjects(id)
        removeItem(state.value.selectedObjects, p => p.id === id)
        state.value.selectedObjects.push(obj.toDisplay())
      }
    })
  }

  const alignImages = ({ rows, cols }: { rows: number, cols: number }) => {
    editor.alignImagesByGrid(rows, cols)
  }

  const mergeSelected = () => {
    const obj = editor.mergeSelected()
    state.value.selectedObjects = []
    state.value.objects = []
    state.value.objects.push(obj.toDisplay())
  }

  const download = () => {
    editor.download()
  }

  return {
    createViewer,
    importImages,
    createImageCombiner,
    createSpriteSheet,
    selectObject,
    alignImages,
    mergeSelected,
    download,
    //setCurrentObject,
    state
  }
})

export { useSpriteEditorStore }