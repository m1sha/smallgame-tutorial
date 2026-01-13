<script setup lang="ts">
import { FormControl, ItemList } from 'vue3-universal-components'
import { useSpriteEditorStore } from '../../../store'
import { computed } from 'vue'

const store = useSpriteEditorStore()

const itemId = computed({
  get: () => store.state.currentObject?.id ?? '',
  set: id => { store.setCurrentObject(id) }
})

</script>

<template>
  <div class="object-list-panel">
    <FormControl caption="Objects">
      <ItemList v-model="itemId" :items="store.state.objects"></ItemList>
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
