<script setup lang="ts">
import { DropDownList, FormControl } from 'vue3-universal-components'
import { useImagesCombinerStore} from '../../../store'
import { ref } from 'vue'

const store = useImagesCombinerStore()
const selectedId = ref('1')
</script>

<template>
<FormControl caption="Combine Mode" class="image-list-panel">
  <div class="combine-mode-settings">
    <DropDownList v-model="selectedId" :items="[{ id: '1', name: 'Tile Grid' }]"/>
  </div>
</FormControl>
</template>

<style lang="sass">
.image-list-panel
  .combine-mode-settings
    margin: 4px 8px
</style>