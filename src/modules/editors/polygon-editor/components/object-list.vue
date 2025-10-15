<script setup lang="ts">
import { ItemList } from 'vue3-universal-components'
import editorApp from '../editor-app'
import { ref, watch } from 'vue'
import { BaseObject } from '../code/objects'
import { SelectPolygonCommand } from '../code/commands'

type TItem = { id: string, name: string, object: BaseObject }

const list = ref<TItem[]>([])
const currentItem = ref('')

editorApp.editorState.onObjectChanged = (action, object) => {
  switch (action) {
    case 'selected': 
      currentItem.value = object.id
    break
    case 'created': 
      list.value.push({ id: object.id, name: object.id, object })
      currentItem.value = object.id
    break
  }
}

const onItemClick = (item: any) => {
  editorApp.editorState.sendCommand(new SelectPolygonCommand(item.object))
}

watch(() => currentItem.value, () => console.log(currentItem.value))

</script>

<template>
  <div class="object-list">
    <h3>Shapes</h3>
    <ItemList v-model="currentItem"  :items="list" @click="item => onItemClick(item)" />  
  </div>
</template>

<style lang="sass">
.object-list
  width: 300px
</style>