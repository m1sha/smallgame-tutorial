<script setup lang="ts">
import { ItemList } from 'vue3-universal-components'
import editorApp from '../editor-app'
import { ref } from 'vue'


const items = ref<{ id: string,  name: string, order: number }[] >([])


editorApp.editorState.onHistoryLogChanged = commands => {
  items.value = []
  commands.forEach((val, index) =>   items.value.push({ order: index, id: index.toString(), name: val }))
}


</script>
<template>
<div style="overflow-y: auto; max-height: calc(100vh - 300px);">
<ItemList :items="items.sort((a, b) => b.order - a.order)" />
</div>
</template>