<script setup lang="ts">
import { ref } from 'vue';
import { useEditorStore } from '../../store/editor-store'

const store = useEditorStore()


const currentTool = ref('select-tool')
const setCurrentTool = (name: string) => {
  currentTool.value = name
  store.appState.setTool(name)
}
</script>

<template>
  <nav class="toolbar">
    <button @click="setCurrentTool('select-tool')" :class="{ selected: currentTool === 'select-tool' }"><i class="fa fa-arrow-pointer"></i></button>
    <button @click="setCurrentTool('draw-polygon-tool')" :class="{ selected: currentTool === 'draw-polygon-tool' }"><i class="fa fa-draw-polygon"></i></button>
    <button @click="setCurrentTool('eye-dropper-tool')" :class="{ selected: currentTool === 'eye-dropper-tool' }"><i class="fa fa-eye-dropper" ></i></button>
  </nav>
</template>

<style lang="sass" scoped>
.toolbar
  display: flex
  gap: 8px
  margin: 8px 0

  button
    &.selected
      border: 1px solid #999
      background-color: #484848
</style>