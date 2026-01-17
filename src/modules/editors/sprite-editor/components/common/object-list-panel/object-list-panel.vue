<script setup lang="ts">
import { FormControl, ItemList, UploadFile, UploadFileTrigger } from 'vue3-universal-components'
import { useSpriteEditorStore } from '../../../store'
import { computed, ref } from 'vue'

const store = useSpriteEditorStore()
const trigger = ref<UploadFileTrigger>()

const itemId = computed({
  get: () => store.state.selectedObjects.map(p => p.id),
  set: ids => { store.selectObject(ids) }
})

const uploadFiles = files => {
  store.importImages(files)
}

</script>

<template>
  <div class="object-list-panel">
    <FormControl caption="Objects" :buttons="[{ name: 'add', icon: 'fa fa-plus', title: 'Add Image(s)'}]" @header-button-click="trigger.open()">
      <ItemList v-model="itemId" multiselect :items="store.state.objects"></ItemList>
      <UploadFile multiple @change="uploadFiles" ref="trigger" />
    </FormControl>
  </div>
</template>

<style lang="sass">
.object-list-panel
    position: absolute
    top: 4px
    left: 8px
    background-color: rgba(55, 55, 55, 0.4941176471)
    border: 1px solid var(--panel-border)
    display: flex
    flex-direction: column
    gap: 16px

    min-width: 300px
    min-height: 300px

</style>
