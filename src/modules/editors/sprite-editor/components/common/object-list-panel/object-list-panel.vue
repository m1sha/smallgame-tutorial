<script setup lang="ts">
import { FormControl, FormControlContent, ItemList, UploadFile, UploadFileTrigger } from 'vue3-universal-components'
import { useSpriteEditorStore } from '../../../store'
import { computed, ref } from 'vue'
import { DisplayObject } from '../../../code/display-objects'

const store = useSpriteEditorStore()
const trigger = ref<UploadFileTrigger>()

const itemId = computed({
  get: () => store.state.selectedObjects.map(p => p.id),
  set: () => { /** onObjectClick */ }
})

const onObjectClick = (item: DisplayObject, selected: boolean) => {
  store.selectObject([item.id])
  console.log(selected)
}

const uploadFiles = files => {
  store.importImages(files)
}

</script>

<template>
  <div class="object-list-panel">
    <FormControl caption="Objects" :buttons="[{ name: 'add', icon: 'fa fa-plus', title: 'Add Image(s)'}]" @header-button-click="trigger.open()">
      <FormControlContent>
        <div class="list-wrapper">
          <ItemList v-model="itemId" multiselect deselect-on-next-click :items="store.state.objects" @click="onObjectClick"></ItemList>
        </div>
        <UploadFile multiple @change="uploadFiles" ref="trigger" />
      </FormControlContent>
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

    .vue3-uui__form-control-content
      min-width: 300px
      height: 300px
      display: flex
      flex-direction: column

    .list-wrapper
      flex: 1
      overflow-y: auto

</style>
