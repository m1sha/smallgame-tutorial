<script setup lang="ts">
import { ref, onMounted } from "vue"
import { Editor } from "./code/"

const container = ref<HTMLDivElement>()
const inputFile = ref<HTMLInputElement>()

let editor: Editor | null = null
const layer = []

onMounted(() => {
  editor = new Editor(container.value!)
})

function openDialog() { inputFile.value?.click() }

function onLoadFile () {
  if (!editor) return
  if (!inputFile.value) return
  if (!inputFile.value.files) return
  const file = inputFile.value.files[0]

  editor.addImage(file)
  inputFile.value.value = ''
}

function createPolygon () {
  if (!editor) return
  editor.addPolygon({ x: 200, y: 200})
}

function zoomPlus() {
  if (!editor) return
  editor.zoomPlus()
}

function zoomMinus() {
  if (!editor) return
  editor.zoomMinus()
}

function showGrid () {
 if (!editor) return
  editor.editorState.grid.visible = !editor.editorState.grid.visible
}

function undo () {
  if (!editor) return
  editor.editorState.undo()
}

function redo () {
  if (!editor) return
  editor.editorState.redo()
}


</script>

<template>
<div class="polygon-editor-page">
  <div class="editor">
    <div class="control-panel">
      <input type="file" style="display: none;" ref="inputFile" @input="onLoadFile" />
      <button @click="undo">Undo</button>
      <button @click="redo">Redo</button>
      <button @click="openDialog">Load Backround Image</button>
      <button @click="createPolygon">Create polygon</button>
      <button @click="zoomPlus">Zoom In</button>
      <button @click="zoomMinus">Zoom Out</button>
      <button @click="showGrid">Show Grid</button>
    </div>

    <div ref="container"></div>
  </div>
</div>
</template>

<style lang="sass" scoped>
.polygon-editor-page
  display: flex
  justify-content: center
  .editor
    display: flex
    flex-direction: column
  
.control-panel 
  display: flex
  margin: 18px 0
  gap: 12px
</style>
