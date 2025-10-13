
<script setup lang="ts">
import { ref } from 'vue'
import editor from "../editor-app"

const inputFile = ref<HTMLInputElement>()
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


</script>

<template>
<div class="control-panel">
  <input type="file" style="display: none;" ref="inputFile" @input="onLoadFile" />
  <button title="Undo" @click="editor.editorState.undo()"><i class="fa fa-undo"></i></button>
  <button title="Redo" @click="editor.editorState.redo()"><i class="fa fa-redo"></i></button>
  <button title="Load Backround Image" @click="openDialog"><i class="fa fa-file-image"></i></button>
  <button title="Create Polygon" @click="createPolygon"><i class="fa fa-draw-polygon"></i></button>
  <button title="Zoom In" @click="zoomPlus"><i class="fa fa-magnifying-glass-plus"></i></button>
  <button title="Zoom Out" @click="zoomMinus"><i class="fa fa-magnifying-glass-minus"></i></button>
  <button title="Show Grid" @click="showGrid"><i class="fa fa-table-cells"></i></button>
</div>
</template>

<style lang="sass" scoped>
.control-panel 
  display: flex
  justify-content: center
  margin: 18px 0
  gap: 12px
</style>